import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserStatus, VerificationStatus, JobStatus } from "@kajlagbe/database";

export class CreateAdminDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateAdminDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateUserStatusDto {
  @ApiProperty({ enum: UserStatus })
  @IsEnum(UserStatus)
  status: UserStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reason?: string;
}

export class VerifyProviderDto {
  @ApiProperty({ enum: VerificationStatus })
  @IsEnum(VerificationStatus)
  status: VerificationStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  rejectionReason?: string;
}

export class UpdateJobStatusDto {
  @ApiProperty({ enum: JobStatus })
  @IsEnum(JobStatus)
  status: JobStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reason?: string;
}

export class ProcessPayoutDto {
  @ApiProperty({ enum: ["APPROVE", "REJECT"] })
  @IsString()
  action: "APPROVE" | "REJECT";

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  failureReason?: string;
}

export class ToggleFeatureFlagDto {
  @ApiProperty()
  @IsBoolean()
  isEnabled: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  rolloutPercentage?: number;
}
