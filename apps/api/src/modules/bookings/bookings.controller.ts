import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { BookingsService } from "./bookings.service";
import { CreateBookingsDto, UpdateBookingsDto } from "./bookings.dto";

@ApiTags("Bookings")
@Controller("bookings")
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  @ApiOperation({ summary: "Get all Bookings" })
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Bookings by id" })
  findOne(@Param("id") id: string) {
    return this.bookingsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Bookings" })
  create(@Body() dto: CreateBookingsDto) {
    return this.bookingsService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Bookings" })
  update(@Param("id") id: string, @Body() dto: UpdateBookingsDto) {
    return this.bookingsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Bookings" })
  remove(@Param("id") id: string) {
    return this.bookingsService.remove(id);
  }
}
