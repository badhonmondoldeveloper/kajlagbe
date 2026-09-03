import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateFeatureFlagsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateFeatureFlagsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
