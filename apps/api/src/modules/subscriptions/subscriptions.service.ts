import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { CreateSubscriptionsDto, UpdateSubscriptionsDto } from "./subscriptions.dto";

@Injectable()
export class SubscriptionsService {
  private readonly logger = new Logger(SubscriptionsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    this.logger.log("Listing Subscriptions records");
    return [];
  }

  async findOne(id: string) {
    this.logger.log(`Finding Subscriptions record by id: ${id}`);
    return { id, name: "Subscriptions Placeholder" };
  }

  async create(dto: CreateSubscriptionsDto) {
    this.logger.log(`Creating Subscriptions record: ${JSON.stringify(dto)}`);
    return { id: "new-id", ...dto };
  }

  async update(id: string, dto: UpdateSubscriptionsDto) {
    this.logger.log(`Updating Subscriptions record ${id}: ${JSON.stringify(dto)}`);
    return { id, ...dto };
  }

  async remove(id: string) {
    this.logger.log(`Removing Subscriptions record ${id}`);
    return { success: true, id };
  }
}
