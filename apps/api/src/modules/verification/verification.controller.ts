import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { VerificationService } from "./verification.service";
import { CreateVerificationDto, UpdateVerificationDto } from "./verification.dto";

@ApiTags("Verification")
@Controller("verification")
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Get()
  @ApiOperation({ summary: "Get all Verification" })
  findAll() {
    return this.verificationService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Verification by id" })
  findOne(@Param("id") id: string) {
    return this.verificationService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Verification" })
  create(@Body() dto: CreateVerificationDto) {
    return this.verificationService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Verification" })
  update(@Param("id") id: string, @Body() dto: UpdateVerificationDto) {
    return this.verificationService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Verification" })
  remove(@Param("id") id: string) {
    return this.verificationService.remove(id);
  }
}
