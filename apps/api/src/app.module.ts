import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import configuration from './config/configuration';
import { validateConfig } from './config/env.validation';
import { DatabaseModule } from './database/database.module';
import {
  RedisModule,
  StorageModule,
  QueueModule,
  RealtimeModule,
} from './abstractions';

import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { RolesGuard } from './common/guards/roles.guard';
import { PermissionsGuard } from './common/guards/permissions.guard';
import { SupabaseModule } from './common/supabase';

// Domain Modules
import { HealthModule } from './modules/health';
import { AuthModule } from './modules/auth';
import { UsersModule } from './modules/users';
import { RolesModule } from './modules/roles';
import { PermissionsModule } from './modules/permissions';
import { LocationsModule } from './modules/locations';
import { ProvidersModule } from './modules/providers';
import { VerificationModule } from './modules/verification';
import { CategoriesModule } from './modules/categories';
import { ServicesModule } from './modules/services';
import { JobsModule } from './modules/jobs';
import { ApplicationsModule } from './modules/applications';
import { QuotationsModule } from './modules/quotations';
import { BookingsModule } from './modules/bookings';
import { ReviewsModule } from './modules/reviews';
import { MessagesModule } from './modules/messages';
import { NotificationsModule } from './modules/notifications';
import { PaymentsModule } from './modules/payments';
import { LedgerModule } from './modules/ledger';
import { PayoutsModule } from './modules/payouts';
import { SubscriptionsModule } from './modules/subscriptions';
import { CreditsModule } from './modules/credits';
import { ReferralsModule } from './modules/referrals';
import { CouponsModule } from './modules/coupons';
import { DisputesModule } from './modules/disputes';
import { SupportModule } from './modules/support';
import { AnalyticsModule } from './modules/analytics';
import { CmsModule } from './modules/cms';
import { AdminModule } from './modules/admin';
import { SettingsModule } from './modules/settings';
import { FeatureFlagsModule } from './modules/feature-flags';
import { AuditLogsModule } from './modules/audit-logs';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: validateConfig,
    }),

    // Rate Limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),

    // Core Database & Abstractions
    DatabaseModule,
    SupabaseModule,
    RedisModule,
    StorageModule,
    QueueModule,
    RealtimeModule,

    // Health Check
    HealthModule,

    // All Domain Modules
    AuthModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    LocationsModule,
    ProvidersModule,
    VerificationModule,
    CategoriesModule,
    ServicesModule,
    JobsModule,
    ApplicationsModule,
    QuotationsModule,
    BookingsModule,
    ReviewsModule,
    MessagesModule,
    NotificationsModule,
    PaymentsModule,
    LedgerModule,
    PayoutsModule,
    SubscriptionsModule,
    CreditsModule,
    ReferralsModule,
    CouponsModule,
    DisputesModule,
    SupportModule,
    AnalyticsModule,
    CmsModule,
    AdminModule,
    SettingsModule,
    FeatureFlagsModule,
    AuditLogsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}

