import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCmsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateCmsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
