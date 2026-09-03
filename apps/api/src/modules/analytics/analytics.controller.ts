import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AnalyticsService } from "./analytics.service";
import { CreateAnalyticsDto, UpdateAnalyticsDto } from "./analytics.dto";

@ApiTags("Analytics")
@Controller("analytics")
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  @ApiOperation({ summary: "Get all Analytics" })
  findAll() {
    return this.analyticsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Analytics by id" })
  findOne(@Param("id") id: string) {
    return this.analyticsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Analytics" })
  create(@Body() dto: CreateAnalyticsDto) {
    return this.analyticsService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Analytics" })
  update(@Param("id") id: string, @Body() dto: UpdateAnalyticsDto) {
    return this.analyticsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Analytics" })
  remove(@Param("id") id: string) {
    return this.analyticsService.remove(id);
  }
}
