import { Global, Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QUEUE_SERVICE_TOKEN } from './queue.interface';

@Global()
@Module({
  providers: [
    {
      provide: QUEUE_SERVICE_TOKEN,
      useClass: QueueService,
    },
    QueueService,
  ],
  exports: [QUEUE_SERVICE_TOKEN, QueueService],
})
export class QueueModule {}

