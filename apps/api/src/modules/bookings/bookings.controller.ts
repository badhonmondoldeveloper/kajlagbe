import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { SupabaseAuthGuard } from '../../common/guards/supabase-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import {
  ConfirmBookingDto,
  RequestRescheduleApiDto,
  RespondRescheduleApiDto,
  CancelBookingApiDto,
  BookingQueryDto,
} from './bookings.dto';

@ApiTags('bookings')
@ApiBearerAuth()
@UseGuards(SupabaseAuthGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get('customer')
  @ApiOperation({ summary: 'Get current customer bookings' })
  async getCustomerBookings(
    @CurrentUser('id') userId: string,
    @Query() query: BookingQueryDto,
  ) {
    return this.bookingsService.getCustomerBookings(userId, query);
  }

  @Get('provider')
  @ApiOperation({ summary: 'Get current provider bookings' })
  async getProviderBookings(
    @CurrentUser('id') userId: string,
    @Query() query: BookingQueryDto,
  ) {
    return this.bookingsService.getProviderBookings(userId, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get booking details by ID (Privacy-aware)' })
  async getBookingDetails(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.bookingsService.getBookingDetails(userId, id);
  }

  @Post(':id/confirm')
  @ApiOperation({ summary: 'Provider confirms booking availability' })
  async confirmBooking(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: ConfirmBookingDto,
  ) {
    return this.bookingsService.confirmBookingByProvider(userId, id, dto);
  }

  @Post(':id/reschedule/request')
  @ApiOperation({ summary: 'Request booking reschedule' })
  async requestReschedule(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: RequestRescheduleApiDto,
  ) {
    return this.bookingsService.requestReschedule(userId, id, dto);
  }

  @Post(':id/reschedule/respond')
  @ApiOperation({ summary: 'Respond to reschedule request' })
  async respondReschedule(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: RespondRescheduleApiDto,
  ) {
    return this.bookingsService.respondReschedule(userId, id, dto);
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancel booking with structured reason' })
  async cancelBooking(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: CancelBookingApiDto,
  ) {
    return this.bookingsService.cancelBooking(userId, id, dto);
  }
}
