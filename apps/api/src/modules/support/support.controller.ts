import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { SupportService } from "./support.service";
import { CreateSupportDto, UpdateSupportDto } from "./support.dto";

@ApiTags("Support")
@Controller("support")
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Get()
  @ApiOperation({ summary: "Get all Support" })
  findAll() {
    return this.supportService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Support by id" })
  findOne(@Param("id") id: string) {
    return this.supportService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Support" })
  create(@Body() dto: CreateSupportDto) {
    return this.supportService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Support" })
  update(@Param("id") id: string, @Body() dto: UpdateSupportDto) {
    return this.supportService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Support" })
  remove(@Param("id") id: string) {
    return this.supportService.remove(id);
  }
}
