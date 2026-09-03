import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { CreatePaymentsDto, UpdatePaymentsDto } from "./payments.dto";

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    this.logger.log("Listing Payments records");
    return [];
  }

  async findOne(id: string) {
    this.logger.log(`Finding Payments record by id: ${id}`);
    return { id, name: "Payments Placeholder" };
  }

  async create(dto: CreatePaymentsDto) {
    this.logger.log(`Creating Payments record: ${JSON.stringify(dto)}`);
    return { id: "new-id", ...dto };
  }

  async update(id: string, dto: UpdatePaymentsDto) {
    this.logger.log(`Updating Payments record ${id}: ${JSON.stringify(dto)}`);
    return { id, ...dto };
  }

  async remove(id: string) {
    this.logger.log(`Removing Payments record ${id}`);
    return { success: true, id };
  }
}
