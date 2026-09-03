import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateBookingsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateBookingsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
