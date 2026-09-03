import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { MessagesService } from "./messages.service";
import { CreateMessagesDto, UpdateMessagesDto } from "./messages.dto";

@ApiTags("Messages")
@Controller("messages")
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  @ApiOperation({ summary: "Get all Messages" })
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Messages by id" })
  findOne(@Param("id") id: string) {
    return this.messagesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create Messages" })
  create(@Body() dto: CreateMessagesDto) {
    return this.messagesService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update Messages" })
  update(@Param("id") id: string, @Body() dto: UpdateMessagesDto) {
    return this.messagesService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Messages" })
  remove(@Param("id") id: string) {
    return this.messagesService.remove(id);
  }
}
