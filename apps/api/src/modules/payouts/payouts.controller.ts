import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { PayoutsService } from "./payouts.service";
import { CreatePayoutsDto, UpdatePayoutsDto } from "./payouts.dto";

@ApiTags("Payouts")
@Controller("payouts")
export class PayoutsController {
  constructor(private readonly payoutsService: PayoutsService) {}

  @Get()
  @ApiOperation({ summary: "Get all Payouts" })
  findAll() {
    return this.payoutsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Payouts by id" })
  findOne(@Param("id") id: string) {
    return this.payoutsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Payouts" })
  create(@Body() dto: CreatePayoutsDto) {
    return this.payoutsService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Payouts" })
  update(@Param("id") id: string, @Body() dto: UpdatePayoutsDto) {
    return this.payoutsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Payouts" })
  remove(@Param("id") id: string) {
    return this.payoutsService.remove(id);
  }
}
