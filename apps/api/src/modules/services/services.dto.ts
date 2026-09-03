import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateServicesDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateServicesDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
