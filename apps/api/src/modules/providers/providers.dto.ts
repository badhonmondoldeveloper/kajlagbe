import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateProvidersDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateProvidersDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
