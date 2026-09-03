import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationApiDto } from './applications.dto';
import { SupabaseAuthGuard } from '../../common/guards/supabase-auth.guard';

@Controller()
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  /**
   * Provider: Apply to a job
   */
  @Post('jobs/:id/apply')
  @UseGuards(SupabaseAuthGuard)
  async applyToJob(
    @Request() req: any,
    @Param('id') jobId: string,
    @Body() dto: CreateApplicationApiDto
  ): Promise<any> {
    const userId = req.user.sub || req.user.id;
    return this.applicationsService.applyToJob(userId, jobId, dto);
  }

  /**
   * Customer: View all applications for a job
   */
  @Get('jobs/:id/applications')
  @UseGuards(SupabaseAuthGuard)
  async getJobApplications(
    @Request() req: any,
    @Param('id') jobId: string
  ): Promise<any> {
    const userId = req.user.sub || req.user.id;
    return this.applicationsService.getJobApplications(userId, jobId);
  }

  /**
   * Provider: View my submitted applications
   */
  @Get('applications/provider/mine')
  @UseGuards(SupabaseAuthGuard)
  async getProviderApplications(@Request() req: any): Promise<any> {
    const userId = req.user.sub || req.user.id;
    return this.applicationsService.getProviderApplications(userId);
  }

  /**
   * Provider: View application details
   */
  @Get('applications/provider/:id')
  @UseGuards(SupabaseAuthGuard)
  async getProviderApplicationDetails(
    @Request() req: any,
    @Param('id') id: string
  ): Promise<any> {
    const userId = req.user.sub || req.user.id;
    return this.applicationsService.getProviderApplicationDetails(userId, id);
  }

  /**
   * Customer: Shortlist an application
   */
  @Post('applications/:id/shortlist')
  @UseGuards(SupabaseAuthGuard)
  async shortlistApplication(
    @Request() req: any,
    @Param('id') id: string
  ): Promise<any> {
    const userId = req.user.sub || req.user.id;
    return this.applicationsService.shortlistApplication(userId, id);
  }

  /**
   * Customer: Reject an application
   */
  @Post('applications/:id/reject')
  @UseGuards(SupabaseAuthGuard)
  async rejectApplication(
    @Request() req: any,
    @Param('id') id: string
  ): Promise<any> {
    const userId = req.user.sub || req.user.id;
    return this.applicationsService.rejectApplication(userId, id);
  }

  /**
   * Provider: Withdraw application
   */
  @Post('applications/:id/withdraw')
  @UseGuards(SupabaseAuthGuard)
  async withdrawApplication(
    @Request() req: any,
    @Param('id') id: string
  ): Promise<any> {
    const userId = req.user.sub || req.user.id;
    return this.applicationsService.withdrawApplication(userId, id);
  }

  /**
   * Provider: Save a job
   */
  @Post('jobs/:id/save')
  @UseGuards(SupabaseAuthGuard)
  async saveJob(
    @Request() req: any,
    @Param('id') jobId: string
  ): Promise<any> {
    const userId = req.user.sub || req.user.id;
    return this.applicationsService.saveJob(userId, jobId);
  }

  /**
   * Provider: Unsave a job
   */
  @Delete('jobs/:id/save')
  @UseGuards(SupabaseAuthGuard)
  async unsaveJob(
    @Request() req: any,
    @Param('id') jobId: string
  ): Promise<any> {
    const userId = req.user.sub || req.user.id;
    return this.applicationsService.unsaveJob(userId, jobId);
  }

  /**
   * Provider: Get saved jobs
   */
  @Get('jobs/provider/saved')
  @UseGuards(SupabaseAuthGuard)
  async getSavedJobs(@Request() req: any): Promise<any> {
    const userId = req.user.sub || req.user.id;
    return this.applicationsService.getSavedJobs(userId);
  }
}
