import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly logger = new Logger(SupabaseService.name);
  private client: SupabaseClient | null = null;

  constructor(private readonly configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseSecretKey = this.configService.get<string>('SUPABASE_SECRET_KEY') || this.configService.get<string>('SUPABASE_PUBLISHABLE_KEY');

    if (supabaseUrl && supabaseSecretKey) {
      try {
        this.client = createClient(supabaseUrl, supabaseSecretKey, {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          },
        });
        this.logger.log('Supabase client initialized successfully');
      } catch (err: any) {
        this.logger.warn(`Failed to initialize Supabase client: ${err?.message || err}`);
      }
    } else {
      this.logger.log('Supabase credentials not set, client deferred');
    }
  }

  getClient(): SupabaseClient | null {
    return this.client;
  }
}

