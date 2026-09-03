import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { ApplicationsService } from "./applications.service";
import { CreateApplicationsDto, UpdateApplicationsDto } from "./applications.dto";

@ApiTags("Applications")
@Controller("applications")
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get()
  @ApiOperation({ summary: "Get all Applications" })
  findAll() {
    return this.applicationsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Applications by id" })
  findOne(@Param("id") id: string) {
    return this.applicationsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Applications" })
  create(@Body() dto: CreateApplicationsDto) {
    return this.applicationsService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Applications" })
  update(@Param("id") id: string, @Body() dto: UpdateApplicationsDto) {
    return this.applicationsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Applications" })
  remove(@Param("id") id: string) {
    return this.applicationsService.remove(id);
  }
}
