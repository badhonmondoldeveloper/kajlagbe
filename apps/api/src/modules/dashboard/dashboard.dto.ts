import { IsString, IsOptional, IsEnum, IsBoolean, IsNumber, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  divisionId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  districtId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address?: string;
}

export class CreateProviderServiceDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  categorySlug: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ default: 'fixed' })
  @IsOptional()
  @IsString()
  pricingType?: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  startingPrice?: number;
}

export class UpdateProviderAvailabilityDto {
  @ApiProperty({ enum: ['available', 'busy', 'away'] })
  @IsString()
  status: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isAutoAccept?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  workingHoursNote?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  customNotice?: string;
}

export class CreatePortfolioDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  categorySlug: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  images?: string[];
}

export class SaveProviderDto {
  @ApiProperty()
  @IsString()
  providerSlug: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateBusinessServiceDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  categorySlug: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ default: 'quote' })
  @IsOptional()
  @IsString()
  pricingModel?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  startingPrice?: number;
}

export class CreateBusinessLocationDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  divisionId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  districtId?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}

export class CreateBusinessTeamMemberDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ default: 'TECHNICIAN' })
  @IsString()
  role: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  email?: string;
}

