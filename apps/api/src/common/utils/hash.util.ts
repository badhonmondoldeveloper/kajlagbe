import { randomBytes, scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

/**
 * Standard password hashing abstraction using native crypto scrypt
 */
export class PasswordHasher {
  private static readonly KEY_LENGTH = 64;

  static async hash(password: string): Promise<string> {
    const salt = randomBytes(16).toString('hex');
    const derivedKey = (await scryptAsync(
      password,
      salt,
      this.KEY_LENGTH,
    )) as Buffer;
    return `${salt}:${derivedKey.toString('hex')}`;
  }

  static async compare(password: string, storedHash: string): Promise<boolean> {
    const [salt, key] = storedHash.split(':');
    if (!salt || !key) return false;

    const keyBuffer = Buffer.from(key, 'hex');
    const derivedKey = (await scryptAsync(
      password,
      salt,
      this.KEY_LENGTH,
    )) as Buffer;

    return timingSafeEqual(keyBuffer, derivedKey);
  }
}

