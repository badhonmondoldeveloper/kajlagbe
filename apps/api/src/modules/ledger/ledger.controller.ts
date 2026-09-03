import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { LedgerService } from "./ledger.service";
import { CreateLedgerDto, UpdateLedgerDto } from "./ledger.dto";

@ApiTags("Ledger")
@Controller("ledger")
export class LedgerController {
  constructor(private readonly ledgerService: LedgerService) {}

  @Get()
  @ApiOperation({ summary: "Get all Ledger" })
  findAll() {
    return this.ledgerService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Ledger by id" })
  findOne(@Param("id") id: string) {
    return this.ledgerService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Ledger" })
  create(@Body() dto: CreateLedgerDto) {
    return this.ledgerService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Ledger" })
  update(@Param("id") id: string, @Body() dto: UpdateLedgerDto) {
    return this.ledgerService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Ledger" })
  remove(@Param("id") id: string) {
    return this.ledgerService.remove(id);
  }
}
