import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { QuotationsService } from "./quotations.service";
import { CreateQuotationsDto, UpdateQuotationsDto } from "./quotations.dto";

@ApiTags("Quotations")
@Controller("quotations")
export class QuotationsController {
  constructor(private readonly quotationsService: QuotationsService) {}

  @Get()
  @ApiOperation({ summary: "Get all Quotations" })
  findAll() {
    return this.quotationsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Quotations by id" })
  findOne(@Param("id") id: string) {
    return this.quotationsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Quotations" })
  create(@Body() dto: CreateQuotationsDto) {
    return this.quotationsService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Quotations" })
  update(@Param("id") id: string, @Body() dto: UpdateQuotationsDto) {
    return this.quotationsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Quotations" })
  remove(@Param("id") id: string) {
    return this.quotationsService.remove(id);
  }
}
