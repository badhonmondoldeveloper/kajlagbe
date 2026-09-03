import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { FeatureFlagsService } from "./feature-flags.service";
import { CreateFeatureFlagsDto, UpdateFeatureFlagsDto } from "./feature-flags.dto";

@ApiTags("Feature Flags")
@Controller("feature-flags")
export class FeatureFlagsController {
  constructor(private readonly featureflagsService: FeatureFlagsService) {}

  @Get()
  @ApiOperation({ summary: "Get all Feature Flags" })
  findAll() {
    return this.featureflagsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Feature Flags by id" })
  findOne(@Param("id") id: string) {
    return this.featureflagsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Feature Flags" })
  create(@Body() dto: CreateFeatureFlagsDto) {
    return this.featureflagsService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Feature Flags" })
  update(@Param("id") id: string, @Body() dto: UpdateFeatureFlagsDto) {
    return this.featureflagsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Feature Flags" })
  remove(@Param("id") id: string) {
    return this.featureflagsService.remove(id);
  }
}
