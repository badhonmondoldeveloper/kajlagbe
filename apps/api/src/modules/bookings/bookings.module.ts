import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { BookingStatusTransitionService } from './bookings-transition.service';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService, BookingStatusTransitionService],
  exports: [BookingsService, BookingStatusTransitionService],
})
export class BookingsModule {}
