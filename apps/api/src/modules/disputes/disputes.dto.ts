import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateDisputesDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateDisputesDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
