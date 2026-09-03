import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AdminService } from "./admin.service";
import { CreateAdminDto, UpdateAdminDto } from "./admin.dto";

@ApiTags("Admin")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @ApiOperation({ summary: "Get all Admin" })
  findAll() {
    return this.adminService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Admin by id" })
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Admin" })
  create(@Body() dto: CreateAdminDto) {
    return this.adminService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Admin" })
  update(@Param("id") id: string, @Body() dto: UpdateAdminDto) {
    return this.adminService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Admin" })
  remove(@Param("id") id: string) {
    return this.adminService.remove(id);
  }
}
