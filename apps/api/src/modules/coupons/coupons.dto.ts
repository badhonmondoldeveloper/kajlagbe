import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCouponsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateCouponsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
