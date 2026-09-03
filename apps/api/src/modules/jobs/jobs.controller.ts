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
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import {
  CreateJobApiDto,
  UpdateJobApiDto,
  SelectProviderApiDto,
  CancelJobApiDto,
  PublicJobQueryDto,
} from './jobs.dto';
import { SupabaseAuthGuard } from '../../common/guards/supabase-auth.guard';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  /**
   * Public: List published jobs (Paginated & Filtered)
   */
  @Get('public')
  async getPublicJobs(@Query() query: PublicJobQueryDto): Promise<any> {
    return this.jobsService.getPublicJobs(query);
  }

  /**
   * Public/Optional Auth: Get single public job details
   */
  @Get('public/:id')
  async getPublicJobById(@Param('id') id: string, @Request() req: any): Promise<any> {
    const userId = req.user?.sub || req.user?.id;
    return this.jobsService.getPublicJobById(id, userId);
  }

  /**
   * Customer: Get all my created jobs
   */
  @Get('customer/mine')
  @UseGuards(SupabaseAuthGuard)
  async getCustomerJobs(@Request() req: any): Promise<any> {
    const userId = req.user.sub || req.user.id;
    return this.jobsService.getCustomerJobs(userId);
  }

  /**
   * Customer: Get details of my job (with applications & private fields)
   */
  @Get('customer/:id')
  @UseGuards(SupabaseAuthGuard)
  async getCustomerJobDetails(@Request() req: any, @Param('id') id: string): Promise<any> {
    const userId = req.user.sub || req.user.id;
    return this.jobsService.getCustomerJobDetails(userId, id);
  }

  /**
   * Customer: Create a new job (Draft or Published)
   */
  @Post()
  @UseGuards(SupabaseAuthGuard)
  async createJob(@Request() req: any, @Body() dto: CreateJobApiDto): Promise<any> {
    const userId = req.user.sub || req.user.id;
    return this.jobsService.createJob(userId, dto);
  }

  /**
   * Customer: Update job
   */
  @Patch(':id')
  @UseGuards(SupabaseAuthGuard)
  async updateJob(
    @Request() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateJobApiDto
  ): Promise<any> {
    const userId = req.user.sub || req.user.id;
    return this.jobsService.updateJob(userId, id, dto);
  }

  /**
   * Customer: Publish a draft job
   */
  @Post(':id/publish')
  @UseGuards(SupabaseAuthGuard)
  async publishJob(@Request() req: any, @Param('id') id: string): Promise<any> {
    const userId = req.user.sub || req.user.id;
    return this.jobsService.publishJob(userId, id);
  }

  /**
   * Customer: Pause a published job
   */
  @Post(':id/pause')
  @UseGuards(SupabaseAuthGuard)
  async pauseJob(@Request() req: any, @Param('id') id: string): Promise<any> {
    const userId = req.user.sub || req.user.id;
    return this.jobsService.pauseJob(userId, id);
  }

  /**
   * Customer: Cancel a job
   */
  @Post(':id/cancel')
  @UseGuards(SupabaseAuthGuard)
  async cancelJob(
    @Request() req: any,
    @Param('id') id: string,
    @Body() dto: CancelJobApiDto
  ): Promise<any> {
    const userId = req.user.sub || req.user.id;
    return this.jobsService.cancelJob(userId, id, dto);
  }

  /**
   * Customer: Select Provider (Atomic locking transaction)
   */
  @Post(':id/select-provider')
  @UseGuards(SupabaseAuthGuard)
  async selectProvider(
    @Request() req: any,
    @Param('id') id: string,
    @Body() dto: SelectProviderApiDto
  ): Promise<any> {
    const userId = req.user.sub || req.user.id;
    return this.jobsService.selectProvider(userId, id, dto);
  }
}
