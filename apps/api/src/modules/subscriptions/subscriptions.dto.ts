import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateSubscriptionsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateSubscriptionsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
