import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { ReferralsService } from "./referrals.service";
import { CreateReferralsDto, UpdateReferralsDto } from "./referrals.dto";

@ApiTags("Referrals")
@Controller("referrals")
export class ReferralsController {
  constructor(private readonly referralsService: ReferralsService) {}

  @Get()
  @ApiOperation({ summary: "Get all Referrals" })
  findAll() {
    return this.referralsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Referrals by id" })
  findOne(@Param("id") id: string) {
    return this.referralsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Referrals" })
  create(@Body() dto: CreateReferralsDto) {
    return this.referralsService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Referrals" })
  update(@Param("id") id: string, @Body() dto: UpdateReferralsDto) {
    return this.referralsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Referrals" })
  remove(@Param("id") id: string) {
    return this.referralsService.remove(id);
  }
}
