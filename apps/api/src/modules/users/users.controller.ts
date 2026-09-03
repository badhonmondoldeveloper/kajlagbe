import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { CreateUsersDto, UpdateUsersDto } from "./users.dto";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: "Get all Users" })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Users by id" })
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Users" })
  create(@Body() dto: CreateUsersDto) {
    return this.usersService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Users" })
  update(@Param("id") id: string, @Body() dto: UpdateUsersDto) {
    return this.usersService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Users" })
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
