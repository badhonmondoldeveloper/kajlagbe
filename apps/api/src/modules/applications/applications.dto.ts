import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateApplicationsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateApplicationsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
