import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { CreateCreditsDto, UpdateCreditsDto } from "./credits.dto";

@Injectable()
export class CreditsService {
  private readonly logger = new Logger(CreditsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    this.logger.log("Listing Credits records");
    return [];
  }

  async findOne(id: string) {
    this.logger.log(`Finding Credits record by id: ${id}`);
    return { id, name: "Credits Placeholder" };
  }

  async create(dto: CreateCreditsDto) {
    this.logger.log(`Creating Credits record: ${JSON.stringify(dto)}`);
    return { id: "new-id", ...dto };
  }

  async update(id: string, dto: UpdateCreditsDto) {
    this.logger.log(`Updating Credits record ${id}: ${JSON.stringify(dto)}`);
    return { id, ...dto };
  }

  async remove(id: string) {
    this.logger.log(`Removing Credits record ${id}`);
    return { success: true, id };
  }
}
