import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { WorkOrdersService } from './work-orders.service';
import { SupabaseAuthGuard } from '../../common/guards/supabase-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ProgressUpdateApiDto } from '../bookings/bookings.dto';

@ApiTags('work-orders')
@ApiBearerAuth()
@UseGuards(SupabaseAuthGuard)
@Controller('work-orders')
export class WorkOrdersController {
  constructor(private readonly workOrdersService: WorkOrdersService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get work order details by ID' })
  async getWorkOrderDetails(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.workOrdersService.getWorkOrderDetails(userId, id);
  }

  @Post(':id/start')
  @ApiOperation({ summary: 'Provider starts work on work order' })
  async startWork(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.workOrdersService.startWork(userId, id);
  }

  @Post(':id/progress')
  @ApiOperation({ summary: 'Add service progress update' })
  async addProgressUpdate(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: ProgressUpdateApiDto,
  ) {
    return this.workOrdersService.addProgressUpdate(userId, id, dto);
  }

  @Post(':id/complete')
  @ApiOperation({ summary: 'Provider marks work as completed' })
  async markWorkCompleted(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.workOrdersService.markWorkCompleted(userId, id);
  }

  @Post(':id/confirm-completion')
  @ApiOperation({ summary: 'Customer confirms completion & closes work order' })
  async confirmCompletion(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.workOrdersService.confirmCompletionByCustomer(userId, id);
  }
}

