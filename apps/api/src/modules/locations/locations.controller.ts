import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { LocationsService } from "./locations.service";
import { CreateLocationsDto, UpdateLocationsDto } from "./locations.dto";

@ApiTags("Locations")
@Controller("locations")
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  @ApiOperation({ summary: "Get all Locations" })
  findAll() {
    return this.locationsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Locations by id" })
  findOne(@Param("id") id: string) {
    return this.locationsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Locations" })
  create(@Body() dto: CreateLocationsDto) {
    return this.locationsService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Locations" })
  update(@Param("id") id: string, @Body() dto: UpdateLocationsDto) {
    return this.locationsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Locations" })
  remove(@Param("id") id: string) {
    return this.locationsService.remove(id);
  }
}
