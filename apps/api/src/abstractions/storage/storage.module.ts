import { Global, Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { STORAGE_SERVICE_TOKEN } from './storage.interface';

@Global()
@Module({
  providers: [
    {
      provide: STORAGE_SERVICE_TOKEN,
      useClass: StorageService,
    },
    StorageService,
  ],
  exports: [STORAGE_SERVICE_TOKEN, StorageService],
})
export class StorageModule {}

