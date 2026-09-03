import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCategoriesDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateCategoriesDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
