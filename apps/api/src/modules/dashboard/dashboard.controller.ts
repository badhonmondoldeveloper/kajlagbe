import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import {
  CreateProviderServiceDto,
  UpdateProviderAvailabilityDto,
  CreatePortfolioDto,
  SaveProviderDto,
  CreateBusinessServiceDto,
  CreateBusinessLocationDto,
  CreateBusinessTeamMemberDto,
} from './dashboard.dto';
import { SupabaseAuthGuard } from '../../common/guards/supabase-auth.guard';
import { CurrentUser } from '../../common/decorators';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Dashboard')
@Controller('dashboard')
@UseGuards(SupabaseAuthGuard)
@ApiBearerAuth()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  // -------------------------------------------------------------
  // Stats
  // -------------------------------------------------------------

  @Get('stats/customer')
  @ApiOperation({ summary: 'Get Customer Dashboard Stats and Completion' })
  async getCustomerStats(@CurrentUser() user: any): Promise<Record<string, any>> {
    return this.dashboardService.getCustomerStats(user.id);
  }

  @Get('stats/provider')
  @ApiOperation({ summary: 'Get Provider Dashboard Stats and Completion' })
  async getProviderStats(@CurrentUser() user: any): Promise<Record<string, any>> {
    return this.dashboardService.getProviderStats(user.id);
  }

  @Get('stats/business')
  @ApiOperation({ summary: 'Get Business Dashboard Stats and Completion' })
  async getBusinessStats(@CurrentUser() user: any): Promise<Record<string, any>> {
    return this.dashboardService.getBusinessStats(user.id);
  }

  // -------------------------------------------------------------
  // Notifications & Activity
  // -------------------------------------------------------------

  @Get('notifications')
  @ApiOperation({ summary: 'Get User Notifications' })
  async getNotifications(@CurrentUser() user: any): Promise<Record<string, any>[]> {
    return this.dashboardService.getNotifications(user.id);
  }

  @Patch('notifications/:id/read')
  @ApiOperation({ summary: 'Mark Notification as Read' })
  async markNotificationAsRead(
    @CurrentUser() user: any,
    @Param('id') id: string,
  ): Promise<Record<string, any>> {
    return this.dashboardService.markNotificationAsRead(user.id, id);
  }

  @Post('notifications/mark-all-read')
  @ApiOperation({ summary: 'Mark All Notifications as Read' })
  async markAllNotificationsAsRead(@CurrentUser() user: any): Promise<{ success: boolean }> {
    return this.dashboardService.markAllNotificationsAsRead(user.id);
  }

  @Get('activity')
  @ApiOperation({ summary: 'Get User Activity Feed' })
  async getActivities(@CurrentUser() user: any): Promise<Record<string, any>[]> {
    return this.dashboardService.getActivities(user.id);
  }

  // -------------------------------------------------------------
  // Customer: Saved Providers
  // -------------------------------------------------------------

  @Get('saved-providers')
  @ApiOperation({ summary: 'Get Saved Providers' })
  async getSavedProviders(@CurrentUser() user: any): Promise<Record<string, any>[]> {
    return this.dashboardService.getSavedProviders(user.id);
  }

  @Post('saved-providers')
  @ApiOperation({ summary: 'Save a Provider' })
  async saveProvider(
    @CurrentUser() user: any,
    @Body() dto: SaveProviderDto,
  ): Promise<Record<string, any>> {
    return this.dashboardService.saveProvider(user.id, dto);
  }

  @Delete('saved-providers/:slug')
  @ApiOperation({ summary: 'Remove Saved Provider' })
  async removeSavedProvider(
    @CurrentUser() user: any,
    @Param('slug') slug: string,
  ): Promise<{ success: boolean }> {
    return this.dashboardService.removeSavedProvider(user.id, slug);
  }

  // -------------------------------------------------------------
  // Provider Services & Availability
  // -------------------------------------------------------------

  @Get('provider/services')
  @ApiOperation({ summary: 'Get Provider Services' })
  async getProviderServices(@CurrentUser() user: any): Promise<Record<string, any>[]> {
    return this.dashboardService.getProviderServices(user.id);
  }

  @Post('provider/services')
  @ApiOperation({ summary: 'Create Provider Service' })
  async createProviderService(
    @CurrentUser() user: any,
    @Body() dto: CreateProviderServiceDto,
  ): Promise<Record<string, any>> {
    return this.dashboardService.createProviderService(user.id, dto);
  }

  @Delete('provider/services/:id')
  @ApiOperation({ summary: 'Delete Provider Service' })
  async deleteProviderService(
    @CurrentUser() user: any,
    @Param('id') id: string,
  ): Promise<{ success: boolean }> {
    return this.dashboardService.deleteProviderService(user.id, id);
  }

  @Get('provider/availability')
  @ApiOperation({ summary: 'Get Provider Availability' })
  async getProviderAvailability(@CurrentUser() user: any): Promise<Record<string, any>> {
    return this.dashboardService.getProviderAvailability(user.id);
  }

  @Put('provider/availability')
  @ApiOperation({ summary: 'Update Provider Availability' })
  async updateProviderAvailability(
    @CurrentUser() user: any,
    @Body() dto: UpdateProviderAvailabilityDto,
  ): Promise<Record<string, any>> {
    return this.dashboardService.updateProviderAvailability(user.id, dto);
  }

  @Get('provider/portfolio')
  @ApiOperation({ summary: 'Get Provider Portfolios' })
  async getProviderPortfolios(@CurrentUser() user: any): Promise<Record<string, any>[]> {
    return this.dashboardService.getProviderPortfolios(user.id);
  }

  @Post('provider/portfolio')
  @ApiOperation({ summary: 'Create Provider Portfolio Item' })
  async createProviderPortfolio(
    @CurrentUser() user: any,
    @Body() dto: CreatePortfolioDto,
  ): Promise<Record<string, any>> {
    return this.dashboardService.createProviderPortfolio(user.id, dto);
  }

  @Delete('provider/portfolio/:id')
  @ApiOperation({ summary: 'Delete Provider Portfolio Item' })
  async deleteProviderPortfolio(
    @CurrentUser() user: any,
    @Param('id') id: string,
  ): Promise<{ success: boolean }> {
    return this.dashboardService.deleteProviderPortfolio(user.id, id);
  }

  // -------------------------------------------------------------
  // Business Services, Locations & Team
  // -------------------------------------------------------------

  @Get('business/services')
  @ApiOperation({ summary: 'Get Business Services' })
  async getBusinessServices(@CurrentUser() user: any): Promise<Record<string, any>[]> {
    return this.dashboardService.getBusinessServices(user.id);
  }

  @Post('business/services')
  @ApiOperation({ summary: 'Create Business Service' })
  async createBusinessService(
    @CurrentUser() user: any,
    @Body() dto: CreateBusinessServiceDto,
  ): Promise<Record<string, any>> {
    return this.dashboardService.createBusinessService(user.id, dto);
  }

  @Delete('business/services/:id')
  @ApiOperation({ summary: 'Delete Business Service' })
  async deleteBusinessService(
    @CurrentUser() user: any,
    @Param('id') id: string,
  ): Promise<{ success: boolean }> {
    return this.dashboardService.deleteBusinessService(user.id, id);
  }

  @Get('business/locations')
  @ApiOperation({ summary: 'Get Business Locations' })
  async getBusinessLocations(@CurrentUser() user: any): Promise<Record<string, any>[]> {
    return this.dashboardService.getBusinessLocations(user.id);
  }

  @Post('business/locations')
  @ApiOperation({ summary: 'Create Business Location' })
  async createBusinessLocation(
    @CurrentUser() user: any,
    @Body() dto: CreateBusinessLocationDto,
  ): Promise<Record<string, any>> {
    return this.dashboardService.createBusinessLocation(user.id, dto);
  }

  @Delete('business/locations/:id')
  @ApiOperation({ summary: 'Delete Business Location' })
  async deleteBusinessLocation(
    @CurrentUser() user: any,
    @Param('id') id: string,
  ): Promise<{ success: boolean }> {
    return this.dashboardService.deleteBusinessLocation(user.id, id);
  }

  @Get('business/team')
  @ApiOperation({ summary: 'Get Business Team Members' })
  async getBusinessTeam(@CurrentUser() user: any): Promise<Record<string, any>[]> {
    return this.dashboardService.getBusinessTeam(user.id);
  }

  @Post('business/team')
  @ApiOperation({ summary: 'Add Business Team Member' })
  async createBusinessTeamMember(
    @CurrentUser() user: any,
    @Body() dto: CreateBusinessTeamMemberDto,
  ): Promise<Record<string, any>> {
    return this.dashboardService.createBusinessTeamMember(user.id, dto);
  }

  @Delete('business/team/:id')
  @ApiOperation({ summary: 'Delete Business Team Member' })
  async deleteBusinessTeamMember(
    @CurrentUser() user: any,
    @Param('id') id: string,
  ): Promise<{ success: boolean }> {
    return this.dashboardService.deleteBusinessTeamMember(user.id, id);
  }
}

