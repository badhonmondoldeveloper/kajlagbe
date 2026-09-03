import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { CouponsService } from "./coupons.service";
import { CreateCouponsDto, UpdateCouponsDto } from "./coupons.dto";

@ApiTags("Coupons")
@Controller("coupons")
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Get()
  @ApiOperation({ summary: "Get all Coupons" })
  findAll() {
    return this.couponsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Coupons by id" })
  findOne(@Param("id") id: string) {
    return this.couponsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Coupons" })
  create(@Body() dto: CreateCouponsDto) {
    return this.couponsService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Coupons" })
  update(@Param("id") id: string, @Body() dto: UpdateCouponsDto) {
    return this.couponsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Coupons" })
  remove(@Param("id") id: string) {
    return this.couponsService.remove(id);
  }
}
