import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { AdminService } from "./admin.service";
import {
  UpdateUserStatusDto,
  VerifyProviderDto,
  UpdateJobStatusDto,
  ProcessPayoutDto,
  ToggleFeatureFlagDto,
} from "./admin.dto";
import { SupabaseAuthGuard } from "../../common/guards/supabase-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";

@ApiTags("Admin Operations")
@ApiBearerAuth()
@UseGuards(SupabaseAuthGuard, RolesGuard)
@Roles("ADMIN", "SUPER_ADMIN")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("dashboard")
  @ApiOperation({ summary: "Get real operational dashboard statistics" })
  getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Get("users")
  @ApiOperation({ summary: "Search and filter user directory" })
  getUsers(
    @Query("search") search?: string,
    @Query("role") role?: string,
    @Query("status") status?: string,
  ) {
    return this.adminService.getUsers(search, role, status);
  }

  @Patch("users/:id/status")
  @ApiOperation({ summary: "Update user account status with audit log" })
  updateUserStatus(
    @Param("id") id: string,
    @Body() dto: UpdateUserStatusDto,
    @Request() req: any,
  ) {
    return this.adminService.updateUserStatus(id, dto, req.user?.id);
  }

  @Get("providers")
  @ApiOperation({ summary: "Get provider profiles & verification queue" })
  getProviders(
    @Query("search") search?: string,
    @Query("verificationStatus") verificationStatus?: string,
  ) {
    return this.adminService.getProviders(search, verificationStatus);
  }

  @Patch("providers/:id/verify")
  @ApiOperation({ summary: "Approve, reject or suspend provider verification" })
  verifyProvider(
    @Param("id") id: string,
    @Body() dto: VerifyProviderDto,
    @Request() req: any,
  ): Promise<{ success: boolean; provider: any }> {
    return this.adminService.verifyProvider(id, dto, req.user?.id);
  }

  @Get("jobs")
  @ApiOperation({ summary: "Search and filter job board listings" })
  getJobs(
    @Query("search") search?: string,
    @Query("status") status?: string,
  ) {
    return this.adminService.getJobs(search, status);
  }

  @Patch("jobs/:id/status")
  @ApiOperation({ summary: "Moderate job listing status with audit log" })
  updateJobStatus(
    @Param("id") id: string,
    @Body() dto: UpdateJobStatusDto,
    @Request() req: any,
  ): Promise<{ success: boolean; job: any }> {
    return this.adminService.updateJobStatus(id, dto, req.user?.id);
  }

  @Get("bookings")
  @ApiOperation({ summary: "Search and filter marketplace bookings" })
  getBookings(
    @Query("search") search?: string,
    @Query("status") status?: string,
  ) {
    return this.adminService.getBookings(search, status);
  }

  @Get("payouts")
  @ApiOperation({ summary: "Get payout requests review queue" })
  getPayoutRequests(@Query("status") status?: string) {
    return this.adminService.getPayoutRequests(status);
  }

  @Post("payouts/:id/process")
  @ApiOperation({ summary: "Approve or reject payout request" })
  processPayout(
    @Param("id") id: string,
    @Body() dto: ProcessPayoutDto,
    @Request() req: any,
  ): Promise<{ success: boolean; payout: any }> {
    return this.adminService.processPayout(id, dto, req.user?.id);
  }

  @Get("feature-flags")
  @ApiOperation({ summary: "Get system feature flags" })
  getFeatureFlags(): Promise<any[]> {
    return this.adminService.getFeatureFlags();
  }

  @Patch("feature-flags/:id")
  @ApiOperation({ summary: "Toggle system feature flag state" })
  toggleFeatureFlag(
    @Param("id") id: string,
    @Body() dto: ToggleFeatureFlagDto,
    @Request() req: any,
  ): Promise<{ success: boolean; featureFlag: any }> {
    return this.adminService.toggleFeatureFlag(id, dto, req.user?.id);
  }

  @Get("audit-logs")
  @ApiOperation({ summary: "Browser immutable administrative audit logs" })
  getAuditLogs(
    @Query("action") action?: string,
    @Query("entityType") entityType?: string,
  ): Promise<any[]> {
    return this.adminService.getAuditLogs(action, entityType);
  }
}
