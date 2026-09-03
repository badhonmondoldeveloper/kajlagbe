import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateReviewsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateReviewsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
