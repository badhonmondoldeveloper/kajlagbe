import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { CreateNotificationsDto, UpdateNotificationsDto } from "./notifications.dto";

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    this.logger.log("Listing Notifications records");
    return [];
  }

  async findOne(id: string) {
    this.logger.log(`Finding Notifications record by id: ${id}`);
    return { id, name: "Notifications Placeholder" };
  }

  async create(dto: CreateNotificationsDto) {
    this.logger.log(`Creating Notifications record: ${JSON.stringify(dto)}`);
    return { id: "new-id", ...dto };
  }

  async update(id: string, dto: UpdateNotificationsDto) {
    this.logger.log(`Updating Notifications record ${id}: ${JSON.stringify(dto)}`);
    return { id, ...dto };
  }

  async remove(id: string) {
    this.logger.log(`Removing Notifications record ${id}`);
    return { success: true, id };
  }
}
