import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Ip,
  Headers,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SyncAuthDto,
  CustomerOnboardingDto,
  ProviderOnboardingDto,
  BusinessOnboardingDto,
  SecurityAuditDto,
} from './auth.dto';
import { SupabaseAuthGuard } from '../../common/guards/supabase-auth.guard';
import { CurrentUser, Public } from '../../common/decorators';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sync')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sync authenticated Supabase user to PostgreSQL' })
  async syncUser(
    @Body() dto: SyncAuthDto,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ): Promise<Record<string, any>> {
    return this.authService.syncUser(dto, ip, userAgent);
  }

  @UseGuards(SupabaseAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile, roles and onboarding status' })
  async getMe(@CurrentUser() user: any): Promise<Record<string, any>> {
    return this.authService.getMe(user.id);
  }

  @UseGuards(SupabaseAuthGuard)
  @Post('onboarding/customer')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit Customer Onboarding' })
  async onboardCustomer(
    @CurrentUser() user: any,
    @Body() dto: CustomerOnboardingDto,
  ): Promise<Record<string, any>> {
    return this.authService.onboardCustomer(user.id, dto);
  }

  @UseGuards(SupabaseAuthGuard)
  @Post('onboarding/provider')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit Provider Onboarding' })
  async onboardProvider(
    @CurrentUser() user: any,
    @Body() dto: ProviderOnboardingDto,
  ): Promise<Record<string, any>> {
    return this.authService.onboardProvider(user.id, dto);
  }

  @UseGuards(SupabaseAuthGuard)
  @Post('onboarding/business')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit Business Onboarding' })
  async onboardBusiness(
    @CurrentUser() user: any,
    @Body() dto: BusinessOnboardingDto,
  ): Promise<Record<string, any>> {
    return this.authService.onboardBusiness(user.id, dto);
  }

  @Public()
  @Post('audit')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Record security audit log' })
  async recordAudit(
    @Body() dto: SecurityAuditDto,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ): Promise<{ success: boolean }> {
    await this.authService.logAudit({
      action: dto.action,
      entityType: dto.entityType || 'Security',
      entityId: dto.entityId,
      metadata: dto.metadata,
      ipAddress: ip,
      userAgent,
    });
    return { success: true };
  }
}
