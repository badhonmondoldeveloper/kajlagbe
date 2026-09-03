import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { JobStatusTransitionService } from './jobs-transition.service';
import { DatabaseModule } from '../../database/database.module';
import { BookingsModule } from '../bookings/bookings.module';

@Module({
  imports: [DatabaseModule, BookingsModule],
  controllers: [JobsController],
  providers: [JobsService, JobStatusTransitionService],
  exports: [JobsService, JobStatusTransitionService],
})
export class JobsModule {}
