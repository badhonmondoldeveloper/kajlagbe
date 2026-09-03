import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCreditsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateCreditsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
