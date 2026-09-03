import {
  IsEmail,
  IsString,
  IsOptional,
  IsEnum,
  IsArray,
  IsNumber,
  IsBoolean,
  MinLength,
  MaxLength,
} from 'class-validator';
import { RoleType } from '@kajlagbe/types';

export class SyncAuthDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsEmail({}, { message: 'সঠিক ইমেইল এড্রেস প্রদান করুন' })
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  @MinLength(2, { message: 'নাম কমপক্ষে ২ অক্ষরের হতে হবে' })
  firstName: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsEnum(RoleType, { message: 'অননুমোদিত অ্যাকাউন্ট রোল' })
  role: RoleType;

  @IsOptional()
  metadata?: Record<string, any>;
}

export class CustomerOnboardingDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsArray()
  preferredLocations?: string[];

  @IsOptional()
  @IsArray()
  serviceInterests?: string[];

  @IsOptional()
  @IsBoolean()
  allowNotifications?: boolean;
}

export class ProviderOnboardingDto {
  @IsString()
  primaryCategory: string;

  @IsOptional()
  @IsArray()
  secondaryCategories?: string[];

  @IsNumber()
  experienceYears: number;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  serviceLocation?: string;

  @IsOptional()
  @IsString()
  divisionId?: string;

  @IsOptional()
  @IsString()
  districtId?: string;

  @IsOptional()
  @IsArray()
  skills?: string[];

  @IsOptional()
  servicesOffered?: Record<string, any>;

  @IsOptional()
  @IsString()
  availabilityStatus?: string;
}

export class BusinessOnboardingDto {
  @IsString()
  @MinLength(2)
  businessName: string;

  @IsOptional()
  @IsString()
  tradeLicenseNumber?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  categories: string[];

  @IsString()
  teamSize: string;

  @IsOptional()
  @IsString()
  contactPhone?: string;

  @IsOptional()
  @IsString()
  contactEmail?: string;

  @IsOptional()
  @IsString()
  businessAddress?: string;

  @IsOptional()
  @IsString()
  divisionId?: string;

  @IsOptional()
  @IsString()
  districtId?: string;
}

export class SecurityAuditDto {
  @IsString()
  action: string;

  @IsOptional()
  @IsString()
  entityType?: string;

  @IsOptional()
  @IsString()
  entityId?: string;

  @IsOptional()
  metadata?: Record<string, any>;
}
