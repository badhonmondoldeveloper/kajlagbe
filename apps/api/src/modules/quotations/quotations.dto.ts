import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateQuotationsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateQuotationsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
