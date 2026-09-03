import { Injectable, Logger } from '@nestjs/common';
import { IStorageService, UploadResult } from './storage.interface';

/**
 * Storage service placeholder implementation
 * Can be swapped with AWS S3, Cloudflare R2, MinIO, or local disk in future modules
 */
@Injectable()
export class StorageService implements IStorageService {
  private readonly logger = new Logger(StorageService.name);

  async uploadFile(
    fileBuffer: Buffer,
    filename: string,
    mimeType: string,
    folder: string = 'uploads',
  ): Promise<UploadResult> {
    const key = `${folder}/${Date.now()}-${filename}`;
    this.logger.log(`Placeholder file upload: ${key} (${fileBuffer.length} bytes)`);

    return {
      url: `/static/${key}`,
      key,
      bucket: 'kajlagbe-local',
      mimeType,
      size: fileBuffer.length,
    };
  }

  async deleteFile(key: string): Promise<boolean> {
    this.logger.log(`Placeholder file deletion: ${key}`);
    return true;
  }

  async getSignedUrl(key: string, _expiresInSeconds = 3600): Promise<string> {
    return `/static/${key}`;
  }
}

