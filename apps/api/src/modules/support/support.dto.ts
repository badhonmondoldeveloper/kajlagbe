import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateSupportDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateSupportDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
