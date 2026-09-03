import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { CommissionEngineService } from './commission-engine.service';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';

@Module({
  controllers: [PaymentsController, WalletController],
  providers: [PaymentsService, CommissionEngineService, WalletService],
  exports: [PaymentsService, CommissionEngineService, WalletService],
})
export class PaymentsModule {}
