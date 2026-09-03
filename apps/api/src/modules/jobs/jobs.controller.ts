import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { JobsService } from "./jobs.service";
import { CreateJobsDto, UpdateJobsDto } from "./jobs.dto";

@ApiTags("Jobs")
@Controller("jobs")
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  @ApiOperation({ summary: "Get all Jobs" })
  findAll() {
    return this.jobsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Jobs by id" })
  findOne(@Param("id") id: string) {
    return this.jobsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Jobs" })
  create(@Body() dto: CreateJobsDto) {
    return this.jobsService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Jobs" })
  update(@Param("id") id: string, @Body() dto: UpdateJobsDto) {
    return this.jobsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Jobs" })
  remove(@Param("id") id: string) {
    return this.jobsService.remove(id);
  }
}
