import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateLedgerDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateLedgerDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
