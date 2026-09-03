import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { ReviewsService } from "./reviews.service";
import { CreateReviewsDto, UpdateReviewsDto } from "./reviews.dto";

@ApiTags("Reviews")
@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  @ApiOperation({ summary: "Get all Reviews" })
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Reviews by id" })
  findOne(@Param("id") id: string) {
    return this.reviewsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Reviews" })
  create(@Body() dto: CreateReviewsDto) {
    return this.reviewsService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Reviews" })
  update(@Param("id") id: string, @Body() dto: UpdateReviewsDto) {
    return this.reviewsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Reviews" })
  remove(@Param("id") id: string) {
    return this.reviewsService.remove(id);
  }
}
