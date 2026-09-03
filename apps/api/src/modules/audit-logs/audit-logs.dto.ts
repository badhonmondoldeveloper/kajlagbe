import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateAuditLogsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateAuditLogsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
