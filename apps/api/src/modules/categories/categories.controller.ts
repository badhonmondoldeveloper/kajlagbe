import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { CategoriesService } from "./categories.service";
import { CreateCategoriesDto, UpdateCategoriesDto } from "./categories.dto";

@ApiTags("Categories")
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: "Get all Categories" })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Categories by id" })
  findOne(@Param("id") id: string) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Categories" })
  create(@Body() dto: CreateCategoriesDto) {
    return this.categoriesService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Categories" })
  update(@Param("id") id: string, @Body() dto: UpdateCategoriesDto) {
    return this.categoriesService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Categories" })
  remove(@Param("id") id: string) {
    return this.categoriesService.remove(id);
  }
}
