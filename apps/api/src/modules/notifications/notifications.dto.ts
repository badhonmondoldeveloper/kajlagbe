import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateNotificationsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateNotificationsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
