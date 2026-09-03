import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { SubscriptionsService } from "./subscriptions.service";
import { CreateSubscriptionsDto, UpdateSubscriptionsDto } from "./subscriptions.dto";

@ApiTags("Subscriptions")
@Controller("subscriptions")
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get()
  @ApiOperation({ summary: "Get all Subscriptions" })
  findAll() {
    return this.subscriptionsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Subscriptions by id" })
  findOne(@Param("id") id: string) {
    return this.subscriptionsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Subscriptions" })
  create(@Body() dto: CreateSubscriptionsDto) {
    return this.subscriptionsService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Subscriptions" })
  update(@Param("id") id: string, @Body() dto: UpdateSubscriptionsDto) {
    return this.subscriptionsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Subscriptions" })
  remove(@Param("id") id: string) {
    return this.subscriptionsService.remove(id);
  }
}
