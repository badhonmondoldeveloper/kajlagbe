import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { LedgerEntryType, PaymentMethod, PayoutStatus } from '@kajlagbe/types';

@Injectable()
export class WalletService {
  private readonly logger = new Logger(WalletService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get or Create Wallet Account for user
   */
  async getOrCreateWalletAccount(userId: string): Promise<any> {
    const existing = await this.prisma.walletAccount.findUnique({
      where: { userId },
      include: {
        ledgerEntries: {
          take: 20,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (existing) return existing;

    return this.prisma.walletAccount.create({
      data: {
        userId,
        availableBalance: 0,
        pendingBalance: 0,
        totalEarned: 0,
      },
      include: {
        ledgerEntries: true,
      },
    });
  }

  /**
   * Credit Earnings to Provider Wallet (Append-only Ledger)
   */
  async creditEarnings(
    providerId: string,
    netAmount: number,
    referenceId: string,
    description: string,
  ): Promise<any> {
    return this.prisma.$transaction(async (tx) => {
      let wallet = await tx.walletAccount.findUnique({
        where: { userId: providerId },
      });

      if (!wallet) {
        wallet = await tx.walletAccount.create({
          data: { userId: providerId },
        });
      }

      // Append Ledger Entry
      await tx.walletLedgerEntry.create({
        data: {
          walletAccountId: wallet.id,
          amount: netAmount,
          type: LedgerEntryType.CREDIT,
          referenceId,
          description,
        },
      });

      // Update Wallet Account balances
      const updatedWallet = await tx.walletAccount.update({
        where: { id: wallet.id },
        data: {
          availableBalance: { increment: netAmount },
          totalEarned: { increment: netAmount },
        },
      });

      return updatedWallet;
    });
  }

  /**
   * Provider requests payout withdrawal
   */
  async requestPayout(
    providerId: string,
    amount: number,
    paymentMethod: PaymentMethod,
    accountDetails: string,
  ): Promise<any> {
    if (amount <= 0) {
      throw new BadRequestException('উত্তোলনের পরিমাণ শূন্যের চেয়ে বেশি হতে হবে।');
    }

    return this.prisma.$transaction(async (tx) => {
      const wallet = await tx.walletAccount.findUnique({
        where: { userId: providerId },
      });

      if (!wallet || Number(wallet.availableBalance) < amount) {
        throw new BadRequestException('আপনার ওয়ালেটে পর্যাপ্ত ব্যালেন্স নেই।');
      }

      // Create Payout Request
      const payout = await tx.payoutRequest.create({
        data: {
          providerId,
          amount,
          paymentMethod,
          accountDetails,
          status: PayoutStatus.PENDING,
        },
      });

      // Deduct available balance and append ledger debit entry
      await tx.walletLedgerEntry.create({
        data: {
          walletAccountId: wallet.id,
          amount,
          type: LedgerEntryType.PAYOUT,
          referenceId: payout.id,
          description: `উত্তোলন আবেদন #${payout.id} (${paymentMethod})`,
        },
      });

      await tx.walletAccount.update({
        where: { id: wallet.id },
        data: {
          availableBalance: { decrement: amount },
          pendingBalance: { increment: amount },
        },
      });

      return payout;
    });
  }

  /**
   * Get provider payout history
   */
  async getPayoutHistory(providerId: string): Promise<any> {
    return this.prisma.payoutRequest.findMany({
      where: { providerId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
