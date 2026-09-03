import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePayoutsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdatePayoutsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
