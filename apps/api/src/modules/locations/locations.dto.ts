import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateLocationsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateLocationsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
