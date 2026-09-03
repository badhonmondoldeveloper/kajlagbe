import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { NotificationsService } from "./notifications.service";
import { CreateNotificationsDto, UpdateNotificationsDto } from "./notifications.dto";

@ApiTags("Notifications")
@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: "Get all Notifications" })
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Notifications by id" })
  findOne(@Param("id") id: string) {
    return this.notificationsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Notifications" })
  create(@Body() dto: CreateNotificationsDto) {
    return this.notificationsService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Notifications" })
  update(@Param("id") id: string, @Body() dto: UpdateNotificationsDto) {
    return this.notificationsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Notifications" })
  remove(@Param("id") id: string) {
    return this.notificationsService.remove(id);
  }
}
