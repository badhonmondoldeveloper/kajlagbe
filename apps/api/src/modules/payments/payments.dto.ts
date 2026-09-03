import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePaymentsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdatePaymentsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
