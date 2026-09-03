import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePermissionsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdatePermissionsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
