export interface UploadResult {
  url: string;
  key: string;
  bucket: string;
  mimeType: string;
  size: number;
}

export interface IStorageService {
  uploadFile(
    fileBuffer: Buffer,
    filename: string,
    mimeType: string,
    folder?: string,
  ): Promise<UploadResult>;
  deleteFile(key: string): Promise<boolean>;
  getSignedUrl(key: string, expiresInSeconds?: number): Promise<string>;
}

export const STORAGE_SERVICE_TOKEN = 'IStorageService';

