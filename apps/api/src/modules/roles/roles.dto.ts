import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateRolesDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateRolesDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
