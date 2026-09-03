import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { RolesService } from "./roles.service";
import { CreateRolesDto, UpdateRolesDto } from "./roles.dto";

@ApiTags("Roles")
@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiOperation({ summary: "Get all Roles" })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Roles by id" })
  findOne(@Param("id") id: string) {
    return this.rolesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Roles" })
  create(@Body() dto: CreateRolesDto) {
    return this.rolesService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Roles" })
  update(@Param("id") id: string, @Body() dto: UpdateRolesDto) {
    return this.rolesService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Roles" })
  remove(@Param("id") id: string) {
    return this.rolesService.remove(id);
  }
}
