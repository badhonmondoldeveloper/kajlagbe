import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateAuthDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateAuthDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
