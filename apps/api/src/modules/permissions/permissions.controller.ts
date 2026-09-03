import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { PermissionsService } from "./permissions.service";
import { CreatePermissionsDto, UpdatePermissionsDto } from "./permissions.dto";

@ApiTags("Permissions")
@Controller("permissions")
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @ApiOperation({ summary: "Get all Permissions" })
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Permissions by id" })
  findOne(@Param("id") id: string) {
    return this.permissionsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Permissions" })
  create(@Body() dto: CreatePermissionsDto) {
    return this.permissionsService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Permissions" })
  update(@Param("id") id: string, @Body() dto: UpdatePermissionsDto) {
    return this.permissionsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Permissions" })
  remove(@Param("id") id: string) {
    return this.permissionsService.remove(id);
  }
}
