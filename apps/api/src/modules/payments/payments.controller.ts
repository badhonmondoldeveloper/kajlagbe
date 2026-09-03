import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { SupabaseAuthGuard } from '../../common/guards/supabase-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { PaymentMethod } from '@kajlagbe/types';

@ApiTags('payments')
@ApiBearerAuth()
@UseGuards(SupabaseAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-order')
  @ApiOperation({ summary: 'Create payment order' })
  async createPaymentOrder(
    @CurrentUser('id') userId: string,
    @Body()
    body: {
      bookingId?: string;
      workOrderId?: string;
      grossAmount?: number;
      paymentMethod?: PaymentMethod;
    },
  ) {
    return this.paymentsService.createPaymentOrder(
      userId,
      body.bookingId,
      body.workOrderId,
      body.grossAmount,
      body.paymentMethod,
    );
  }

  @Post('verify')
  @ApiOperation({ summary: 'Server-side payment verification (Idempotent)' })
  async verifyPayment(
    @CurrentUser('id') userId: string,
    @Body()
    body: {
      paymentOrderId: string;
      transactionId: string;
      gatewayProvider?: string;
    },
  ) {
    return this.paymentsService.verifyPayment(
      userId,
      body.paymentOrderId,
      body.transactionId,
      body.gatewayProvider,
    );
  }

  @Get('customer/history')
  @ApiOperation({ summary: 'Get customer payment history' })
  async getCustomerPayments(@CurrentUser('id') userId: string) {
    return this.paymentsService.getCustomerPayments(userId);
  }

  @Get('provider/history')
  @ApiOperation({ summary: 'Get provider payment earnings history' })
  async getProviderPayments(@CurrentUser('id') userId: string) {
    return this.paymentsService.getProviderPayments(userId);
  }
}
