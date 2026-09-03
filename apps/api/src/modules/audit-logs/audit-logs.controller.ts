import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AuditLogsService } from "./audit-logs.service";
import { CreateAuditLogsDto, UpdateAuditLogsDto } from "./audit-logs.dto";

@ApiTags("Audit Logs")
@Controller("audit-logs")
export class AuditLogsController {
  constructor(private readonly auditlogsService: AuditLogsService) {}

  @Get()
  @ApiOperation({ summary: "Get all Audit Logs" })
  findAll() {
    return this.auditlogsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Audit Logs by id" })
  findOne(@Param("id") id: string) {
    return this.auditlogsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Audit Logs" })
  create(@Body() dto: CreateAuditLogsDto) {
    return this.auditlogsService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Audit Logs" })
  update(@Param("id") id: string, @Body() dto: UpdateAuditLogsDto) {
    return this.auditlogsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Audit Logs" })
  remove(@Param("id") id: string) {
    return this.auditlogsService.remove(id);
  }
}
