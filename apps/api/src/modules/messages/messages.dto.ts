import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateMessagesDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateMessagesDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
