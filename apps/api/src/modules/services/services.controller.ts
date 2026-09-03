import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { ServicesService } from "./services.service";
import { CreateServicesDto, UpdateServicesDto } from "./services.dto";

@ApiTags("Services")
@Controller("services")
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  @ApiOperation({ summary: "Get all Services" })
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Services by id" })
  findOne(@Param("id") id: string) {
    return this.servicesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Services" })
  create(@Body() dto: CreateServicesDto) {
    return this.servicesService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Services" })
  update(@Param("id") id: string, @Body() dto: UpdateServicesDto) {
    return this.servicesService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Services" })
  remove(@Param("id") id: string) {
    return this.servicesService.remove(id);
  }
}
