import { Global, Module } from '@nestjs/common';
import { RealtimeEventService } from './realtime.service';

@Global()
@Module({
  providers: [RealtimeEventService],
  exports: [RealtimeEventService],
})
export class RealtimeModule {}

