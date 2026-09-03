import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateVerificationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateVerificationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
