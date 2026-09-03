import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { WalletService } from './wallet.service';
import { SupabaseAuthGuard } from '../../common/guards/supabase-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { PaymentMethod } from '@kajlagbe/types';

@ApiTags('wallet')
@ApiBearerAuth()
@UseGuards(SupabaseAuthGuard)
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('account')
  @ApiOperation({ summary: 'Get user wallet summary & ledger entries' })
  async getWalletAccount(@CurrentUser('id') userId: string) {
    return this.walletService.getOrCreateWalletAccount(userId);
  }

  @Post('payout-request')
  @ApiOperation({ summary: 'Provider request payout withdrawal' })
  async requestPayout(
    @CurrentUser('id') userId: string,
    @Body()
    body: {
      amount: number;
      paymentMethod: PaymentMethod;
      accountDetails: string;
    },
  ) {
    return this.walletService.requestPayout(
      userId,
      body.amount,
      body.paymentMethod,
      body.accountDetails,
    );
  }

  @Get('payouts/history')
  @ApiOperation({ summary: 'Get provider payout requests history' })
  async getPayoutHistory(@CurrentUser('id') userId: string) {
    return this.walletService.getPayoutHistory(userId);
  }
}
