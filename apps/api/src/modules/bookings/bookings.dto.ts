import { IsOptional, IsString, IsEnum, IsBoolean, IsArray, IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { CancellationReason, BookingStatus, WorkOrderStatus } from '@kajlagbe/types';

export class CreateBookingDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  jobId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  applicationId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}

export class ConfirmBookingDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  scheduledDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  scheduledTime?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}

export class RequestRescheduleApiDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  proposedDate: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  proposedTime: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reason: string;
}

export class RespondRescheduleApiDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  requestId: string;

  @ApiProperty()
  @IsBoolean()
  accept: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}

export class CancelBookingApiDto {
  @ApiProperty({ enum: CancellationReason })
  @IsEnum(CancellationReason)
  reasonCategory: CancellationReason;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;
}

export class ProgressUpdateApiDto {
  @ApiProperty({ enum: WorkOrderStatus })
  @IsEnum(WorkOrderStatus)
  status: WorkOrderStatus;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  images?: string[];
}

export class BookingQueryDto {
  @ApiPropertyOptional({ enum: BookingStatus })
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  limit?: number;
}
