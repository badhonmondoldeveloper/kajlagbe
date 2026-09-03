import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { CmsService } from "./cms.service";
import { CreateCmsDto, UpdateCmsDto } from "./cms.dto";

@ApiTags("CMS")
@Controller("cms")
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Get()
  @ApiOperation({ summary: "Get all CMS" })
  findAll() {
    return this.cmsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get CMS by id" })
  findOne(@Param("id") id: string) {
    return this.cmsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create CMS" })
  create(@Body() dto: CreateCmsDto) {
    return this.cmsService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update CMS" })
  update(@Param("id") id: string, @Body() dto: UpdateCmsDto) {
    return this.cmsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete CMS" })
  remove(@Param("id") id: string) {
    return this.cmsService.remove(id);
  }
}
