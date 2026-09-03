import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUsersDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateUsersDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
