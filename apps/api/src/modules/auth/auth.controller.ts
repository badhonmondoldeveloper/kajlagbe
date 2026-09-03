import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CreateAuthDto, UpdateAuthDto } from "./auth.dto";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @ApiOperation({ summary: "Get all Authentication" })
  findAll() {
    return this.authService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Authentication by id" })
  findOne(@Param("id") id: string) {
    return this.authService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Authentication" })
  create(@Body() dto: CreateAuthDto) {
    return this.authService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Authentication" })
  update(@Param("id") id: string, @Body() dto: UpdateAuthDto) {
    return this.authService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Authentication" })
  remove(@Param("id") id: string) {
    return this.authService.remove(id);
  }
}
