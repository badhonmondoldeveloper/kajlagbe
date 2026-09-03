import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { REDIS_SERVICE_TOKEN } from './redis.interface';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_SERVICE_TOKEN,
      useClass: RedisService,
    },
    RedisService,
  ],
  exports: [REDIS_SERVICE_TOKEN, RedisService],
})
export class RedisModule {}

