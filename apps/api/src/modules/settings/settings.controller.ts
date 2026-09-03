import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { SettingsService } from "./settings.service";
import { CreateSettingsDto, UpdateSettingsDto } from "./settings.dto";

@ApiTags("Settings")
@Controller("settings")
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @ApiOperation({ summary: "Get all Settings" })
  findAll() {
    return this.settingsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Settings by id" })
  findOne(@Param("id") id: string) {
    return this.settingsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Settings" })
  create(@Body() dto: CreateSettingsDto) {
    return this.settingsService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Settings" })
  update(@Param("id") id: string, @Body() dto: UpdateSettingsDto) {
    return this.settingsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Settings" })
  remove(@Param("id") id: string) {
    return this.settingsService.remove(id);
  }
}
