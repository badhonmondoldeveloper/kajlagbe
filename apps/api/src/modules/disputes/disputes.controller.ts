import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { DisputesService } from "./disputes.service";
import { CreateDisputesDto, UpdateDisputesDto } from "./disputes.dto";

@ApiTags("Disputes")
@Controller("disputes")
export class DisputesController {
  constructor(private readonly disputesService: DisputesService) {}

  @Get()
  @ApiOperation({ summary: "Get all Disputes" })
  findAll() {
    return this.disputesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Disputes by id" })
  findOne(@Param("id") id: string) {
    return this.disputesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Disputes" })
  create(@Body() dto: CreateDisputesDto) {
    return this.disputesService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Disputes" })
  update(@Param("id") id: string, @Body() dto: UpdateDisputesDto) {
    return this.disputesService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Disputes" })
  remove(@Param("id") id: string) {
    return this.disputesService.remove(id);
  }
}
