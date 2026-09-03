import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateReferralsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateReferralsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
