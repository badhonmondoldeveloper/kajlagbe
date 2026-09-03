import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsEnum,
  Min,
  Max,
  MinLength,
  MaxLength,
} from 'class-validator';
import { PricingType } from '@kajlagbe/types';

export class CreateApplicationApiDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10, { message: 'আবেদনের বার্তা কমপক্ষে ১০ অক্ষরের হতে হবে' })
  @MaxLength(1000, { message: 'আবেদনের বার্তা সর্বোচ্চ ১০০০ অক্ষরের হতে পারে' })
  coverLetter: string;

  @IsNumber()
  @Min(50, { message: 'প্রস্তাবিত ফি সর্বনিম্ন ৫০ টাকা হতে হবে' })
  proposedPrice: number;

  @IsEnum(['FIXED', 'HOURLY', 'NEGOTIABLE'])
  @IsOptional()
  pricingType?: PricingType;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(365)
  estimatedDays?: number;

  @IsString()
  @IsOptional()
  availabilityNote?: string;
}
