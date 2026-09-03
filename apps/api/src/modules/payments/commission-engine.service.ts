import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

export interface CommissionCalculationResult {
  grossAmount: number;
  commissionAmount: number;
  netProviderAmount: number;
  percentage: number;
  fixedFee: number;
}

@Injectable()
export class CommissionEngineService {
  private readonly logger = new Logger(CommissionEngineService.name);

  // Default global platform commission rate: 10%
  private readonly DEFAULT_PERCENTAGE = 10.0;
  private readonly DEFAULT_FIXED_FEE = 0.0;

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Calculate platform commission & net provider earnings
   */
  async calculateCommission(
    grossAmount: number,
    categorySlug?: string,
  ): Promise<CommissionCalculationResult> {
    let percentage = this.DEFAULT_PERCENTAGE;
    let fixedFee = this.DEFAULT_FIXED_FEE;

    if (categorySlug) {
      const config = await this.prisma.platformCommissionConfig.findUnique({
        where: { categorySlug },
      });

      if (config && config.isActive) {
        percentage = Number(config.percentage);
        fixedFee = Number(config.fixedFee);
      }
    }

    const calculatedCommission = (grossAmount * percentage) / 100 + fixedFee;
    const commissionAmount = Math.min(grossAmount, Math.max(0, calculatedCommission));
    const netProviderAmount = Math.max(0, grossAmount - commissionAmount);

    return {
      grossAmount,
      commissionAmount: Number(commissionAmount.toFixed(2)),
      netProviderAmount: Number(netProviderAmount.toFixed(2)),
      percentage,
      fixedFee,
    };
  }
}

