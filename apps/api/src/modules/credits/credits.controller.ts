import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { CreditsService } from "./credits.service";
import { CreateCreditsDto, UpdateCreditsDto } from "./credits.dto";

@ApiTags("Credits")
@Controller("credits")
export class CreditsController {
  constructor(private readonly creditsService: CreditsService) {}

  @Get()
  @ApiOperation({ summary: "Get all Credits" })
  findAll() {
    return this.creditsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Credits by id" })
  findOne(@Param("id") id: string) {
    return this.creditsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Credits" })
  create(@Body() dto: CreateCreditsDto) {
    return this.creditsService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Credits" })
  update(@Param("id") id: string, @Body() dto: UpdateCreditsDto) {
    return this.creditsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Credits" })
  remove(@Param("id") id: string) {
    return this.creditsService.remove(id);
  }
}
