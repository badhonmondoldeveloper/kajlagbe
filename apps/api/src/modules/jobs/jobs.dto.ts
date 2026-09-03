import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateJobsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateJobsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
