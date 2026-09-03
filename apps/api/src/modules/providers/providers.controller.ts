import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { ProvidersService } from "./providers.service";
import { CreateProvidersDto, UpdateProvidersDto } from "./providers.dto";

@ApiTags("Providers")
@Controller("providers")
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Get()
  @ApiOperation({ summary: "Get all Providers" })
  findAll() {
    return this.providersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Providers by id" })
  findOne(@Param("id") id: string) {
    return this.providersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Providers" })
  create(@Body() dto: CreateProvidersDto) {
    return this.providersService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Providers" })
  update(@Param("id") id: string, @Body() dto: UpdateProvidersDto) {
    return this.providersService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Providers" })
  remove(@Param("id") id: string) {
    return this.providersService.remove(id);
  }
}
