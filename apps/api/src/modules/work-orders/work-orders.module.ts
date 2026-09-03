import { Module } from '@nestjs/common';
import { WorkOrdersService } from './work-orders.service';
import { WorkOrdersController } from './work-orders.controller';
import { BookingsModule } from '../bookings/bookings.module';

@Module({
  imports: [BookingsModule],
  controllers: [WorkOrdersController],
  providers: [WorkOrdersService],
  exports: [WorkOrdersService],
})
export class WorkOrdersModule {}
