import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { PaymentsService } from "./payments.service";
import { CreatePaymentsDto, UpdatePaymentsDto } from "./payments.dto";

@ApiTags("Payments")
@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  @ApiOperation({ summary: "Get all Payments" })
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Payments by id" })
  findOne(@Param("id") id: string) {
    return this.paymentsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Payments" })
  create(@Body() dto: CreatePaymentsDto) {
    return this.paymentsService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Payments" })
  update(@Param("id") id: string, @Body() dto: UpdatePaymentsDto) {
    return this.paymentsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Payments" })
  remove(@Param("id") id: string) {
    return this.paymentsService.remove(id);
  }
}
