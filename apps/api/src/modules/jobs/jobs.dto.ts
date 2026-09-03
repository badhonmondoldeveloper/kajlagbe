import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
  IsArray,
  IsBoolean,
  Min,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { JobStatus, JobUrgency, BudgetType, PricingType } from '@kajlagbe/types';

export class CreateJobApiDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'কাজের শিরোনাম কমপক্ষে ৫ অক্ষরের হতে হবে' })
  @MaxLength(120, { message: 'কাজের শিরোনাম সর্বোচ্চ ১২০ অক্ষরের হতে পারে' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(20, { message: 'কাজের বিবরণ কমপক্ষে ২০ অক্ষরের হতে হবে' })
  description: string;

  @IsString()
  @IsNotEmpty()
  categorySlug: string;

  @IsString()
  @IsOptional()
  serviceSlug?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  requirements?: string[];

  @IsEnum(['FLEXIBLE', 'TODAY', 'URGENT', 'EMERGENCY_REQUEST'])
  @IsOptional()
  urgency?: JobUrgency;

  @IsEnum(['FIXED_BUDGET', 'BUDGET_RANGE', 'NEGOTIABLE', 'REQUEST_QUOTES'])
  @IsOptional()
  budgetType?: BudgetType;

  @IsNumber()
  @IsOptional()
  @Min(0)
  budgetMin?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  budgetMax?: number;

  @IsString()
  @IsOptional()
  divisionId?: string;

  @IsString()
  @IsOptional()
  districtId?: string;

  @IsString()
  @IsNotEmpty({ message: 'সাধারণ এলাকা (General Area) প্রদান করুন' })
  generalArea: string;

  @IsString()
  @IsOptional()
  privateAddress?: string;

  @IsString()
  @IsOptional()
  preferredDate?: string;

  @IsString()
  @IsOptional()
  preferredTime?: string;

  @IsBoolean()
  @IsOptional()
  isDraft?: boolean;
}

export class UpdateJobApiDto {
  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(120)
  title?: string;

  @IsString()
  @IsOptional()
  @MinLength(20)
  description?: string;

  @IsString()
  @IsOptional()
  categorySlug?: string;

  @IsString()
  @IsOptional()
  serviceSlug?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  requirements?: string[];

  @IsEnum(['FLEXIBLE', 'TODAY', 'URGENT', 'EMERGENCY_REQUEST'])
  @IsOptional()
  urgency?: JobUrgency;

  @IsEnum(['FIXED_BUDGET', 'BUDGET_RANGE', 'NEGOTIABLE', 'REQUEST_QUOTES'])
  @IsOptional()
  budgetType?: BudgetType;

  @IsNumber()
  @IsOptional()
  @Min(0)
  budgetMin?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  budgetMax?: number;

  @IsString()
  @IsOptional()
  generalArea?: string;

  @IsString()
  @IsOptional()
  privateAddress?: string;

  @IsString()
  @IsOptional()
  preferredDate?: string;

  @IsString()
  @IsOptional()
  preferredTime?: string;
}

export class SelectProviderApiDto {
  @IsString()
  @IsNotEmpty({ message: 'আবেদনপত্র আইডি নির্বাচন করুন' })
  applicationId: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class CancelJobApiDto {
  @IsString()
  @IsOptional()
  reason?: string;
}

export class PublicJobQueryDto {
  @IsString()
  @IsOptional()
  query?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  division?: string;

  @IsString()
  @IsOptional()
  district?: string;

  @IsString()
  @IsOptional()
  urgency?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  budgetMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  budgetMax?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number = 10;
}
