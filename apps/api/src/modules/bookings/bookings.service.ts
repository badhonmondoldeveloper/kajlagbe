import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { BookingStatusTransitionService } from './bookings-transition.service';
import {
  ConfirmBookingDto,
  RequestRescheduleApiDto,
  RespondRescheduleApiDto,
  CancelBookingApiDto,
  BookingQueryDto,
} from './bookings.dto';
import {
  BookingStatus,
  WorkOrderStatus,
  RescheduleStatus,
  LocationAccessState,
  NotificationType,
  ActivityType,
} from '@kajlagbe/types';

@Injectable()
export class BookingsService {
  private readonly logger = new Logger(BookingsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly transitionService: BookingStatusTransitionService,
  ) {}

  /**
   * Helper to generate human-readable reference IDs
   */
  private generateReference(prefix: 'BK' | 'WO'): string {
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${year}-${random}`;
  }

  /**
   * Atomic Booking Creation triggered when customer selects a provider for a job.
   */
  async createBookingFromJobSelection(
    customerId: string,
    jobId: string,
    applicationId: string,
    providerId: string,
    agreedPrice: number,
    generalArea: string,
    privateAddress?: string,
    preferredDate?: string,
    preferredTime?: string,
  ): Promise<any> {
    // Check if booking already exists for this job
    const existing = await this.prisma.booking.findUnique({
      where: { jobId },
    });

    if (existing) {
      return existing;
    }

    const bookingReference = this.generateReference('BK');

    const booking = await this.prisma.booking.create({
      data: {
        bookingReference,
        jobId,
        applicationId,
        customerId,
        providerId,
        agreedPrice,
        generalArea,
        privateAddress,
        locationAccessState: LocationAccessState.LOCATION_HIDDEN,
        status: BookingStatus.PENDING_CONFIRMATION,
        scheduledDate: preferredDate || null,
        scheduledTime: preferredTime || null,
        statusHistories: {
          create: {
            fromStatus: BookingStatus.PENDING_CONFIRMATION,
            toStatus: BookingStatus.PENDING_CONFIRMATION,
            changedById: customerId,
            reason: 'প্রোভাইডার নির্বাচনের পর সার্ভিস বুকিং তৈরি করা হয়েছে।',
          },
        },
      },
    });

    // Notify provider to confirm booking availability
    await this.prisma.notification.create({
      data: {
        userId: providerId,
        type: NotificationType.BOOKING,
        title: 'নতুন সার্ভিস বুকিং পেন্ডিং রয়েছে',
        message: `বুকিং রেফারেন্স #${bookingReference}-এর জন্য আপনার সময়সূচী ও প্রাপ্যতা নিশ্চিত করুন।`,
        link: `/provider/bookings/${booking.id}`,
      },
    });

    return booking;
  }

  /**
   * Provider confirms booking availability -> transitions to CONFIRMED, reveals location, creates WorkOrder.
   */
  async confirmBookingByProvider(
    providerId: string,
    bookingId: string,
    dto: ConfirmBookingDto,
  ): Promise<any> {
    return this.prisma.$transaction(async (tx) => {
      const booking = await tx.booking.findUnique({
        where: { id: bookingId },
        include: { job: true, workOrder: true },
      });

      if (!booking) {
        throw new NotFoundException('বুকিং তথ্য পাওয়া যায়নি।');
      }

      if (booking.providerId !== providerId) {
        throw new ForbiddenException('এই বুকিংটি নিশ্চিত করার অনুমতি আপনার নেই।');
      }

      this.transitionService.validateBookingTransition(
        booking.status as unknown as BookingStatus,
        BookingStatus.CONFIRMED,
      );

      const scheduledDate = dto.scheduledDate || booking.scheduledDate;
      const scheduledTime = dto.scheduledTime || booking.scheduledTime;

      // Update Booking
      const updatedBooking = await tx.booking.update({
        where: { id: bookingId },
        data: {
          status: BookingStatus.CONFIRMED,
          locationAccessState: LocationAccessState.LOCATION_REVEALED,
          scheduledDate,
          scheduledTime,
          durationNotes: dto.notes || booking.durationNotes,
          confirmedAt: new Date(),
          statusHistories: {
            create: {
              fromStatus: booking.status,
              toStatus: BookingStatus.CONFIRMED,
              changedById: providerId,
              reason: dto.notes || 'প্রোভাইডার বুকিং নিশ্চিত করেছেন।',
            },
          },
        },
      });

      // Auto-create WorkOrder if not already created
      if (!booking.workOrder) {
        const workOrderReference = this.generateReference('WO');
        await tx.workOrder.create({
          data: {
            workOrderReference,
            bookingId: booking.id,
            customerId: booking.customerId,
            providerId: booking.providerId,
            status: WorkOrderStatus.ASSIGNED,
            scopeSummary: booking.job.title,
            agreedPrice: booking.agreedPrice,
            statusHistories: {
              create: {
                fromStatus: WorkOrderStatus.CREATED,
                toStatus: WorkOrderStatus.ASSIGNED,
                changedById: providerId,
                reason: 'বুকিং নিশ্চিতকরণের পর ওয়ার্ক অর্ডার তৈরি করা হয়েছে।',
              },
            },
          },
        });
      }

      // Notify Customer
      await tx.notification.create({
        data: {
          userId: booking.customerId,
          type: NotificationType.BOOKING,
          title: 'সার্ভিস বুকিং নিশ্চিত করা হয়েছে!',
          message: `প্রোভাইডার #${booking.bookingReference} বুকিং নিশ্চিত করেছেন। টেকনিশিয়ান নির্দিষ্ট সময়ে সার্ভিস প্রদান করবেন।`,
          link: `/customer/bookings/${booking.id}`,
        },
      });

      // Record Activity
      await tx.userActivity.create({
        data: {
          userId: providerId,
          type: ActivityType.BOOKING_CREATED,
          description: `বুকিং #${booking.bookingReference} সফলভাবে নিশ্চিত করা হয়েছে।`,
          metadata: { bookingId: booking.id },
        },
      });

      return updatedBooking;
    });
  }

  /**
   * Get Customer Bookings (Paginated & Filtered)
   */
  async getCustomerBookings(customerId: string, query: BookingQueryDto): Promise<any> {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(query.limit) || 10));
    const skip = (page - 1) * limit;

    const where: any = { customerId };

    if (query.status) {
      where.status = query.status;
    }

    if (query.search && query.search.trim()) {
      const q = query.search.trim();
      where.OR = [
        { bookingReference: { contains: q, mode: 'insensitive' } },
        { job: { title: { contains: q, mode: 'insensitive' } } },
        { generalArea: { contains: q, mode: 'insensitive' } },
      ];
    }

    const [total, items] = await Promise.all([
      this.prisma.booking.count({ where }),
      this.prisma.booking.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          job: { select: { id: true, title: true, categorySlug: true } },
          provider: {
            select: {
              id: true,
              email: true,
              phone: true,
              profile: { select: { firstName: true, lastName: true, avatarUrl: true } },
              providerProfile: { select: { primaryCategory: true, experienceYears: true } },
            },
          },
          workOrder: { select: { id: true, workOrderReference: true, status: true } },
        },
      }),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get Provider Bookings (Paginated & Filtered)
   */
  async getProviderBookings(providerId: string, query: BookingQueryDto): Promise<any> {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(query.limit) || 10));
    const skip = (page - 1) * limit;

    const where: any = { providerId };

    if (query.status) {
      where.status = query.status;
    }

    if (query.search && query.search.trim()) {
      const q = query.search.trim();
      where.OR = [
        { bookingReference: { contains: q, mode: 'insensitive' } },
        { job: { title: { contains: q, mode: 'insensitive' } } },
        { generalArea: { contains: q, mode: 'insensitive' } },
      ];
    }

    const [total, items] = await Promise.all([
      this.prisma.booking.count({ where }),
      this.prisma.booking.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          job: { select: { id: true, title: true, categorySlug: true } },
          customer: {
            select: {
              id: true,
              profile: { select: { firstName: true, lastName: true, avatarUrl: true } },
            },
          },
          workOrder: { select: { id: true, workOrderReference: true, status: true } },
        },
      }),
    ]);

    // Apply location privacy filter: Hide private address if LOCATION_HIDDEN
    const safeItems = items.map((item) => {
      if (item.locationAccessState === LocationAccessState.LOCATION_HIDDEN) {
        return { ...item, privateAddress: null };
      }
      return item;
    });

    return {
      items: safeItems,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get Booking Details with Privacy Enforcement
   */
  async getBookingDetails(userId: string, bookingId: string): Promise<any> {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        job: true,
        application: true,
        customer: {
          select: {
            id: true,
            email: true,
            phone: true,
            profile: true,
          },
        },
        provider: {
          select: {
            id: true,
            email: true,
            phone: true,
            profile: true,
            providerProfile: true,
          },
        },
        workOrder: {
          include: {
            progressUpdates: { orderBy: { createdAt: 'desc' } },
            statusHistories: { orderBy: { createdAt: 'desc' } },
          },
        },
        rescheduleRequests: { orderBy: { createdAt: 'desc' } },
        cancellation: true,
        statusHistories: { orderBy: { createdAt: 'desc' } },
        progressUpdates: { orderBy: { createdAt: 'desc' } },
      },
    });

    if (!booking) {
      throw new NotFoundException('বুকিং তথ্য পাওয়া যায়নি।');
    }

    if (booking.customerId !== userId && booking.providerId !== userId) {
      throw new ForbiddenException('এই বুকিংটি দেখার অনুমতি আপনার নেই।');
    }

    // Controlled location privacy
    const isProvider = booking.providerId === userId;
    const isLocationHidden = booking.locationAccessState === LocationAccessState.LOCATION_HIDDEN;

    if (isProvider && isLocationHidden) {
      return {
        ...booking,
        privateAddress: null,
      };
    }

    return booking;
  }

  /**
   * Request Schedule Change (Customer or Provider)
   */
  async requestReschedule(
    userId: string,
    bookingId: string,
    dto: RequestRescheduleApiDto,
  ): Promise<any> {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new NotFoundException('বুকিং তথ্য পাওয়া যায়নি।');
    }

    if (booking.customerId !== userId && booking.providerId !== userId) {
      throw new ForbiddenException('অনুমতি নেই।');
    }

    if (booking.status === BookingStatus.COMPLETED || booking.status === BookingStatus.CANCELLED) {
      throw new BadRequestException('সমাপ্ত বা বাতিল বুকিংয়ের সময়সূচী পরিবর্তন করা সম্ভব নয়।');
    }

    this.transitionService.validateBookingTransition(
      booking.status as unknown as BookingStatus,
      BookingStatus.RESCHEDULE_REQUESTED,
    );

    const rescheduleReq = await this.prisma.$transaction(async (tx) => {
      const req = await tx.bookingRescheduleRequest.create({
        data: {
          bookingId,
          requestedById: userId,
          currentDate: booking.scheduledDate,
          currentTime: booking.scheduledTime,
          proposedDate: dto.proposedDate,
          proposedTime: dto.proposedTime,
          reason: dto.reason,
          status: RescheduleStatus.PENDING,
        },
      });

      await tx.booking.update({
        where: { id: bookingId },
        data: {
          status: BookingStatus.RESCHEDULE_REQUESTED,
          statusHistories: {
            create: {
              fromStatus: booking.status,
              toStatus: BookingStatus.RESCHEDULE_REQUESTED,
              changedById: userId,
              reason: `সময়সূচী পরিবর্তনের অনুরোধ করা হয়েছে: ${dto.proposedDate} (${dto.proposedTime})`,
            },
          },
        },
      });

      const recipientId = userId === booking.customerId ? booking.providerId : booking.customerId;
      await tx.notification.create({
        data: {
          userId: recipientId,
          type: NotificationType.BOOKING,
          title: 'সময়সূচী পরিবর্তনের অনুরোধ',
          message: `বুকিং #${booking.bookingReference}-এর জন্য নতুন সময়সূচীর (${dto.proposedDate} - ${dto.proposedTime}) প্রস্তাব দেওয়া হয়েছে।`,
          link: `/bookings/${booking.id}`,
        },
      });

      return req;
    });

    return rescheduleReq;
  }

  /**
   * Respond to Reschedule Request
   */
  async respondReschedule(
    userId: string,
    bookingId: string,
    dto: RespondRescheduleApiDto,
  ): Promise<any> {
    return this.prisma.$transaction(async (tx) => {
      const rescheduleReq = await tx.bookingRescheduleRequest.findUnique({
        where: { id: dto.requestId },
        include: { booking: true },
      });

      if (!rescheduleReq || rescheduleReq.bookingId !== bookingId) {
        throw new NotFoundException('সময়সূচী পরিবর্তনের আবেদনটি পাওয়া যায়নি।');
      }

      if (rescheduleReq.requestedById === userId) {
        throw new BadRequestException('নিজের পাঠানো আবেদনের ওপর সিদ্ধান্ত প্রদান করা যাবে না।');
      }

      const booking = rescheduleReq.booking;
      if (booking.customerId !== userId && booking.providerId !== userId) {
        throw new ForbiddenException('অনুমতি নেই।');
      }

      if (dto.accept) {
        await tx.bookingRescheduleRequest.update({
          where: { id: dto.requestId },
          data: { status: RescheduleStatus.ACCEPTED },
        });

        const updatedBooking = await tx.booking.update({
          where: { id: bookingId },
          data: {
            status: BookingStatus.CONFIRMED,
            scheduledDate: rescheduleReq.proposedDate,
            scheduledTime: rescheduleReq.proposedTime,
            statusHistories: {
              create: {
                fromStatus: booking.status,
                toStatus: BookingStatus.CONFIRMED,
                changedById: userId,
                reason: `নতুন সময়সূচী (${rescheduleReq.proposedDate}) গৃহীত হয়েছে।`,
              },
            },
          },
        });

        await tx.notification.create({
          data: {
            userId: rescheduleReq.requestedById,
            type: NotificationType.BOOKING,
            title: 'সময়সূচী পরিবর্তন গৃহীত হয়েছে',
            message: `বুকিং #${booking.bookingReference}-এর নতুন সময়সূচী সফলভাবে আপডেট করা হয়েছে।`,
            link: `/bookings/${booking.id}`,
          },
        });

        return updatedBooking;
      } else {
        await tx.bookingRescheduleRequest.update({
          where: { id: dto.requestId },
          data: { status: RescheduleStatus.REJECTED },
        });

        const updatedBooking = await tx.booking.update({
          where: { id: bookingId },
          data: {
            status: BookingStatus.CONFIRMED,
            statusHistories: {
              create: {
                fromStatus: booking.status,
                toStatus: BookingStatus.CONFIRMED,
                changedById: userId,
                reason: 'সময়সূচী পরিবর্তনের প্রস্তাব প্রত্যাখ্যান করা হয়েছে। পূর্ববর্তী সময়সূচী বহাল রয়েছে।',
              },
            },
          },
        });

        await tx.notification.create({
          data: {
            userId: rescheduleReq.requestedById,
            type: NotificationType.BOOKING,
            title: 'সময়সূচী পরিবর্তন প্রত্যাখ্যাত',
            message: `বুকিং #${booking.bookingReference}-এর পূর্ববর্তী সময়সূচী বহাল রয়েছে।`,
            link: `/bookings/${booking.id}`,
          },
        });

        return updatedBooking;
      }
    });
  }

  /**
   * Cancel Booking (Server-validated)
   */
  async cancelBooking(
    userId: string,
    bookingId: string,
    dto: CancelBookingApiDto,
  ): Promise<any> {
    return this.prisma.$transaction(async (tx) => {
      const booking = await tx.booking.findUnique({
        where: { id: bookingId },
        include: { workOrder: true },
      });

      if (!booking) {
        throw new NotFoundException('বুকিং তথ্য পাওয়া যায়নি।');
      }

      if (booking.customerId !== userId && booking.providerId !== userId) {
        throw new ForbiddenException('অনুমতি নেই।');
      }

      if (booking.status === BookingStatus.COMPLETED || booking.status === BookingStatus.CANCELLED) {
        throw new BadRequestException('ইতিমধ্যে সম্পন্ন বা বাতিলকৃত বুকিং বাতিল করা যাবে না।');
      }

      this.transitionService.validateBookingTransition(
        booking.status as unknown as BookingStatus,
        BookingStatus.CANCELLED,
      );

      // Create BookingCancellation audit record
      await tx.bookingCancellation.create({
        data: {
          bookingId,
          cancelledById: userId,
          reasonCategory: dto.reasonCategory,
          note: dto.note || null,
          previousStatus: booking.status,
        },
      });

      // Update Booking status to CANCELLED
      const updatedBooking = await tx.booking.update({
        where: { id: bookingId },
        data: {
          status: BookingStatus.CANCELLED,
          cancelledAt: new Date(),
          statusHistories: {
            create: {
              fromStatus: booking.status,
              toStatus: BookingStatus.CANCELLED,
              changedById: userId,
              reason: `বুকিং বাতিল করা হয়েছে। কারণ: ${dto.reasonCategory}`,
            },
          },
        },
      });

      // Cancel WorkOrder if exists
      if (booking.workOrder) {
        await tx.workOrder.update({
          where: { id: booking.workOrder.id },
          data: {
            status: WorkOrderStatus.CANCELLED,
            statusHistories: {
              create: {
                fromStatus: booking.workOrder.status,
                toStatus: WorkOrderStatus.CANCELLED,
                changedById: userId,
                reason: 'বুকিং বাতিলের কারণে ওয়ার্ক অর্ডার বাতিল করা হয়েছে।',
              },
            },
          },
        });
      }

      // Notify recipient
      const recipientId = userId === booking.customerId ? booking.providerId : booking.customerId;
      await tx.notification.create({
        data: {
          userId: recipientId,
          type: NotificationType.BOOKING,
          title: 'বুকিং বাতিল করা হয়েছে',
          message: `বুকিং #${booking.bookingReference} বাতিল করা হয়েছে। কারণ: ${dto.reasonCategory}`,
          link: `/bookings/${booking.id}`,
        },
      });

      return updatedBooking;
    });
  }
}
