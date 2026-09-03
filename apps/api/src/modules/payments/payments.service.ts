import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CommissionEngineService } from './commission-engine.service';
import { WalletService } from './wallet.service';
import {
  PaymentStatus,
  PaymentMethod,
  NotificationType,
  ActivityType,
} from '@kajlagbe/types';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly commissionEngine: CommissionEngineService,
    private readonly walletService: WalletService,
  ) {}

  private generateOrderReference(): string {
    const year = new Date().getFullYear();
    const random = Math.floor(10000 + Math.random() * 90000);
    return `ORDER-${year}-${random}`;
  }

  /**
   * Create Payment Order for Booking / Work Order
   */
  async createPaymentOrder(
    customerId: string,
    bookingId?: string,
    workOrderId?: string,
    grossAmount?: number,
    paymentMethod: PaymentMethod = PaymentMethod.ONLINE_BKASH,
  ): Promise<any> {
    let booking: any = null;
    let workOrder: any = null;
    let providerId = '';
    let finalGrossAmount = grossAmount || 0;

    if (bookingId) {
      booking = await this.prisma.booking.findUnique({
        where: { id: bookingId },
        include: { job: true },
      });

      if (!booking) {
        throw new NotFoundException('বুকিং তথ্য পাওয়া যায়নি।');
      }

      if (booking.customerId !== customerId) {
        throw new ForbiddenException('অনুমতি নেই।');
      }

      providerId = booking.providerId;
      finalGrossAmount = Number(booking.agreedPrice);
    } else if (workOrderId) {
      workOrder = await this.prisma.workOrder.findUnique({
        where: { id: workOrderId },
      });

      if (!workOrder) {
        throw new NotFoundException('ওয়ার্ক অর্ডার পাওয়া যায়নি।');
      }

      if (workOrder.customerId !== customerId) {
        throw new ForbiddenException('অনুমতি নেই।');
      }

      providerId = workOrder.providerId;
      finalGrossAmount = Number(workOrder.agreedPrice);
    }

    if (!providerId || finalGrossAmount <= 0) {
      throw new BadRequestException('পেমেন্টের পরিমাণ ও প্রোভাইডার সঠিক নয়।');
    }

    // Calculate Platform Commission
    const categorySlug = booking?.job?.categorySlug;
    const { commissionAmount, netProviderAmount } =
      await this.commissionEngine.calculateCommission(finalGrossAmount, categorySlug);

    const orderReference = this.generateOrderReference();
    const idempotencyKey = `IDEM-${orderReference}-${Date.now()}`;

    // Create PaymentOrder & PaymentAttempt
    const order = await this.prisma.paymentOrder.create({
      data: {
        orderReference,
        bookingId: bookingId || null,
        workOrderId: workOrderId || null,
        customerId,
        providerId,
        grossAmount: finalGrossAmount,
        commissionAmount,
        netProviderAmount,
        paymentMethod,
        status: PaymentStatus.PENDING,
        attempts: {
          create: {
            gatewayProvider: paymentMethod,
            idempotencyKey,
            status: PaymentStatus.PENDING,
          },
        },
      },
      include: {
        attempts: true,
      },
    });

    return order;
  }

  /**
   * Server-Side Payment Verification & Webhook Processing (Idempotency Safe)
   */
  async verifyPayment(
    customerId: string,
    paymentOrderId: string,
    transactionId: string,
    gatewayProvider = 'BKASH',
  ): Promise<any> {
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.paymentOrder.findUnique({
        where: { id: paymentOrderId },
        include: { attempts: true },
      });

      if (!order) {
        throw new NotFoundException('পেমেন্ট অর্ডার পাওয়া যায়নি।');
      }

      // Idempotency Protection: If already succeeded, return immediately
      if (order.status === PaymentStatus.SUCCEEDED) {
        return order;
      }

      // Update Attempt
      const attempt = order.attempts[0];
      if (attempt) {
        await tx.paymentAttempt.update({
          where: { id: attempt.id },
          data: {
            transactionId,
            gatewayProvider,
            status: PaymentStatus.SUCCEEDED,
          },
        });
      }

      // Update Order Status to SUCCEEDED
      const updatedOrder = await tx.paymentOrder.update({
        where: { id: paymentOrderId },
        data: {
          status: PaymentStatus.SUCCEEDED,
        },
      });

      // Credit Net Earnings to Provider Wallet Ledger
      await this.walletService.creditEarnings(
        order.providerId,
        Number(order.netProviderAmount),
        order.id,
        `পেমেন্ট ক্রেডিট (অর্ডার #${order.orderReference})`,
      );

      // Notify Customer & Provider
      await tx.notification.create({
        data: {
          userId: customerId,
          type: NotificationType.PAYMENT,
          title: 'পেমেন্ট সফল হয়েছে!',
          message: `আপনার ৳${Number(order.grossAmount).toLocaleString('bn-BD')} পেমেন্ট অর্ডার #${order.orderReference} সফলভাবে সম্পন্ন হয়েছে।`,
          link: '/customer/payments',
        },
      });

      await tx.notification.create({
        data: {
          userId: order.providerId,
          type: NotificationType.PAYMENT,
          title: 'নতুন আয় ওয়ালেটে ক্রেডিট করা হয়েছে',
          message: `অর্ডার #${order.orderReference}-এর নিট অর্জিত ৳${Number(order.netProviderAmount).toLocaleString('bn-BD')} আপনার ওয়ালেটে জমা হয়েছে।`,
          link: '/provider/earnings',
        },
      });

      // Log User Activity
      await tx.userActivity.create({
        data: {
          userId: customerId,
          type: ActivityType.PAYMENT_COMPLETED,
          description: `পেমেন্ট অর্ডার #${order.orderReference} সফলভাবে পরিশোধিত।`,
          metadata: { orderId: order.id, transactionId },
        },
      });

      return updatedOrder;
    });
  }

  /**
   * Get Customer Payment History
   */
  async getCustomerPayments(customerId: string): Promise<any> {
    return this.prisma.paymentOrder.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' },
      include: {
        provider: { select: { id: true, profile: true } },
      },
    });
  }

  /**
   * Get Provider Payment Earnings History
   */
  async getProviderPayments(providerId: string): Promise<any> {
    return this.prisma.paymentOrder.findMany({
      where: { providerId },
      orderBy: { createdAt: 'desc' },
      include: {
        customer: { select: { id: true, profile: true } },
      },
    });
  }
}
