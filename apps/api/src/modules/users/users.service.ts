import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { CreateUsersDto, UpdateUsersDto } from "./users.dto";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    this.logger.log("Listing Users records");
    return [];
  }

  async findOne(id: string) {
    this.logger.log(`Finding Users record by id: ${id}`);
    return { id, name: "Users Placeholder" };
  }

  async create(dto: CreateUsersDto) {
    this.logger.log(`Creating Users record: ${JSON.stringify(dto)}`);
    return { id: "new-id", ...dto };
  }

  async update(id: string, dto: UpdateUsersDto) {
    this.logger.log(`Updating Users record ${id}: ${JSON.stringify(dto)}`);
    return { id, ...dto };
  }

  async remove(id: string) {
    this.logger.log(`Removing Users record ${id}`);
    return { success: true, id };
  }
}
