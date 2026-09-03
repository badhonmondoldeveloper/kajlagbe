import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { BookingStatusTransitionService } from '../bookings/bookings-transition.service';
import { ProgressUpdateApiDto } from '../bookings/bookings.dto';
import {
  WorkOrderStatus,
  BookingStatus,
  NotificationType,
  ActivityType,
} from '@kajlagbe/types';

@Injectable()
export class WorkOrdersService {
  private readonly logger = new Logger(WorkOrdersService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly transitionService: BookingStatusTransitionService,
  ) {}

  /**
   * Get WorkOrder details by ID
   */
  async getWorkOrderDetails(userId: string, workOrderId: string): Promise<any> {
    const workOrder = await this.prisma.workOrder.findUnique({
      where: { id: workOrderId },
      include: {
        booking: {
          include: {
            job: true,
            customer: { select: { id: true, profile: true } },
            provider: { select: { id: true, profile: true, providerProfile: true } },
          },
        },
        progressUpdates: { orderBy: { createdAt: 'desc' } },
        statusHistories: { orderBy: { createdAt: 'desc' } },
      },
    });

    if (!workOrder) {
      throw new NotFoundException('ওয়ার্ক অর্ডার তথ্য পাওয়া যায়নি।');
    }

    if (workOrder.customerId !== userId && workOrder.providerId !== userId) {
      throw new ForbiddenException('এই ওয়ার্ক অর্ডার দেখার অনুমতি আপনার নেই।');
    }

    return workOrder;
  }

  /**
   * Provider starts work -> WorkOrder: STARTED, Booking: IN_PROGRESS
   */
  async startWork(providerId: string, workOrderId: string): Promise<any> {
    return this.prisma.$transaction(async (tx) => {
      const workOrder = await tx.workOrder.findUnique({
        where: { id: workOrderId },
        include: { booking: true },
      });

      if (!workOrder) {
        throw new NotFoundException('ওয়ার্ক অর্ডার তথ্য পাওয়া যায়নি।');
      }

      if (workOrder.providerId !== providerId) {
        throw new ForbiddenException('কাজ শুরু করার অনুমতি আপনার নেই।');
      }

      this.transitionService.validateWorkOrderTransition(
        workOrder.status as unknown as WorkOrderStatus,
        WorkOrderStatus.STARTED,
      );

      // Update WorkOrder
      const updatedWorkOrder = await tx.workOrder.update({
        where: { id: workOrderId },
        data: {
          status: WorkOrderStatus.STARTED,
          startedAt: new Date(),
          statusHistories: {
            create: {
              fromStatus: workOrder.status,
              toStatus: WorkOrderStatus.STARTED,
              changedById: providerId,
              reason: 'টেকনিশিয়ান কাজ শুরু করেছেন।',
            },
          },
        },
      });

      // Update Booking
      await tx.booking.update({
        where: { id: workOrder.bookingId },
        data: {
          status: BookingStatus.IN_PROGRESS,
          startedAt: new Date(),
          statusHistories: {
            create: {
              fromStatus: workOrder.booking.status,
              toStatus: BookingStatus.IN_PROGRESS,
              changedById: providerId,
              reason: 'সার্ভিস প্রদান চলমান রয়েছে।',
            },
          },
        },
      });

      // Log progress update
      await tx.serviceProgressUpdate.create({
        data: {
          bookingId: workOrder.bookingId,
          workOrderId: workOrder.id,
          createdById: providerId,
          status: WorkOrderStatus.STARTED,
          title: 'কাজ শুরু হয়েছে',
          note: 'টেকনিশিয়ান নির্ধারিত স্থানে পৌঁছে কাজের কার্যক্রম শুরু করেছেন।',
        },
      });

      // Notify Customer
      await tx.notification.create({
        data: {
          userId: workOrder.customerId,
          type: NotificationType.BOOKING,
          title: 'কাজ শুরু করা হয়েছে!',
          message: `টেকনিশিয়ান আপনার #${workOrder.workOrderReference} নাম্বারের ওয়ার্ক অর্ডারের কাজ শুরু করেছেন।`,
          link: `/customer/bookings/${workOrder.bookingId}`,
        },
      });

      return updatedWorkOrder;
    });
  }

  /**
   * Add Service Progress Update (Provider)
   */
  async addProgressUpdate(
    providerId: string,
    workOrderId: string,
    dto: ProgressUpdateApiDto,
  ): Promise<any> {
    const workOrder = await this.prisma.workOrder.findUnique({
      where: { id: workOrderId },
    });

    if (!workOrder) {
      throw new NotFoundException('ওয়ার্ক অর্ডার পাওয়া যায়নি।');
    }

    if (workOrder.providerId !== providerId) {
      throw new ForbiddenException('অনুমতি নেই।');
    }

    const progress = await this.prisma.$transaction(async (tx) => {
      const update = await tx.serviceProgressUpdate.create({
        data: {
          bookingId: workOrder.bookingId,
          workOrderId: workOrder.id,
          createdById: providerId,
          status: dto.status,
          title: dto.title,
          note: dto.note || null,
          images: dto.images || [],
        },
      });

      // Optional status update if given
      if (dto.status !== workOrder.status) {
        this.transitionService.validateWorkOrderTransition(
          workOrder.status as unknown as WorkOrderStatus,
          dto.status,
        );

        await tx.workOrder.update({
          where: { id: workOrderId },
          data: {
            status: dto.status,
            statusHistories: {
              create: {
                fromStatus: workOrder.status,
                toStatus: dto.status,
                changedById: providerId,
                reason: dto.title,
              },
            },
          },
        });
      }

      await tx.notification.create({
        data: {
          userId: workOrder.customerId,
          type: NotificationType.BOOKING,
          title: `কাজের অগ্রগতি আপডেট: ${dto.title}`,
          message: dto.note || `ওয়ার্ক অর্ডার #${workOrder.workOrderReference}-এর অগ্রগতি আপডেট করা হয়েছে।`,
          link: `/customer/bookings/${workOrder.bookingId}`,
        },
      });

      return update;
    });

    return progress;
  }

  /**
   * Provider marks work as completed (COMPLETED_BY_PROVIDER)
   */
  async markWorkCompleted(providerId: string, workOrderId: string): Promise<any> {
    return this.prisma.$transaction(async (tx) => {
      const workOrder = await tx.workOrder.findUnique({
        where: { id: workOrderId },
        include: { booking: true },
      });

      if (!workOrder) {
        throw new NotFoundException('ওয়ার্ক অর্ডার পাওয়া যায়নি।');
      }

      if (workOrder.providerId !== providerId) {
        throw new ForbiddenException('অনুমতি নেই।');
      }

      this.transitionService.validateWorkOrderTransition(
        workOrder.status as unknown as WorkOrderStatus,
        WorkOrderStatus.COMPLETED_BY_PROVIDER,
      );

      const updatedWorkOrder = await tx.workOrder.update({
        where: { id: workOrderId },
        data: {
          status: WorkOrderStatus.COMPLETED_BY_PROVIDER,
          providerCompletedAt: new Date(),
          statusHistories: {
            create: {
              fromStatus: workOrder.status,
              toStatus: WorkOrderStatus.COMPLETED_BY_PROVIDER,
              changedById: providerId,
              reason: 'প্রোভাইডার কাজ সম্পন্ন ঘোষণা করেছেন। গ্রাহকের অনুমোদনের অপেক্ষায় রয়েছে।',
            },
          },
        },
      });

      // Create progress log
      await tx.serviceProgressUpdate.create({
        data: {
          bookingId: workOrder.bookingId,
          workOrderId: workOrder.id,
          createdById: providerId,
          status: WorkOrderStatus.COMPLETED_BY_PROVIDER,
          title: 'কাজ সম্পন্ন করা হয়েছে',
          note: 'টেকনিশিয়ান কাজ সফলভাবে শেষ করেছেন। অনুগ্রহ করে পরীক্ষা করে সম্পন্নকরণ কনফার্ম করুন।',
        },
      });

      // Notify Customer
      await tx.notification.create({
        data: {
          userId: workOrder.customerId,
          type: NotificationType.BOOKING,
          title: 'কাজ সম্পন্ন করার অনুরোধ!',
          message: `প্রোভাইডার #${workOrder.workOrderReference} কাজের ইতি টেনেছেন। সার্ভিস চেক করে সম্পন্নকরণ নিশ্চিত করুন।`,
          link: `/customer/bookings/${workOrder.bookingId}`,
        },
      });

      return updatedWorkOrder;
    });
  }

  /**
   * Customer confirms work completion -> CLOSED & COMPLETED
   */
  async confirmCompletionByCustomer(
    customerId: string,
    workOrderId: string,
  ): Promise<any> {
    return this.prisma.$transaction(async (tx) => {
      const workOrder = await tx.workOrder.findUnique({
        where: { id: workOrderId },
        include: { booking: true },
      });

      if (!workOrder) {
        throw new NotFoundException('ওয়ার্ক অর্ডার পাওয়া যায়নি।');
      }

      if (workOrder.customerId !== customerId) {
        throw new ForbiddenException('অনুমতি নেই।');
      }

      this.transitionService.validateWorkOrderTransition(
        workOrder.status as unknown as WorkOrderStatus,
        WorkOrderStatus.CLOSED,
      );

      // Update WorkOrder to CLOSED
      const updatedWorkOrder = await tx.workOrder.update({
        where: { id: workOrderId },
        data: {
          status: WorkOrderStatus.CLOSED,
          customerConfirmedAt: new Date(),
          closedAt: new Date(),
          statusHistories: {
            create: {
              fromStatus: workOrder.status,
              toStatus: WorkOrderStatus.CLOSED,
              changedById: customerId,
              reason: 'গ্রাহক কাজ সম্পন্নকরণ নিশ্চিত করেছেন এবং সার্ভিস অর্ডারের ইতি টানা হয়েছে।',
            },
          },
        },
      });

      // Update Booking to COMPLETED
      await tx.booking.update({
        where: { id: workOrder.bookingId },
        data: {
          status: BookingStatus.COMPLETED,
          completedAt: new Date(),
          statusHistories: {
            create: {
              fromStatus: workOrder.booking.status,
              toStatus: BookingStatus.COMPLETED,
              changedById: customerId,
              reason: 'সার্ভিস সফলভাবে সম্পন্ন ও গ্রাহক দ্বারা অনুমোদিত।',
            },
          },
        },
      });

      // Update Job status to COMPLETED
      await tx.job.update({
        where: { id: workOrder.booking.jobId },
        data: {
          status: 'COMPLETED' as any,
          completedAt: new Date(),
          statusHistories: {
            create: {
              fromStatus: 'IN_PROGRESS' as any,
              toStatus: 'COMPLETED' as any,
              changedById: customerId,
              reason: 'সার্ভিস বুকিং সফলভাবে সম্পন্ন হয়েছে।',
            },
          },
        },
      });

      // Notify Provider
      await tx.notification.create({
        data: {
          userId: workOrder.providerId,
          type: NotificationType.BOOKING,
          title: 'অভিনন্দন! সার্ভিস সম্পন্নকরণ অনুমোদিত হয়েছে',
          message: `গ্রাহক ওয়ার্ক অর্ডার #${workOrder.workOrderReference}-এর কাজ সম্পন্নকরণ নিশ্চিত করেছেন।`,
          link: `/provider/bookings/${workOrder.bookingId}`,
        },
      });

      // Record Activity
      await tx.userActivity.create({
        data: {
          userId: customerId,
          type: ActivityType.PAYMENT_COMPLETED,
          description: `ওয়ার্ক অর্ডার #${workOrder.workOrderReference} সফলভাবে সম্পন্ন ঘোষণা করা হয়েছে।`,
          metadata: { workOrderId: workOrder.id, bookingId: workOrder.bookingId },
        },
      });

      return updatedWorkOrder;
    });
  }
}
