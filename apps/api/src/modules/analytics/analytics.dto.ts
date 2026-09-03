import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateAnalyticsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateAnalyticsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
