import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { CreateProvidersDto, UpdateProvidersDto } from "./providers.dto";

@Injectable()
export class ProvidersService {
  private readonly logger = new Logger(ProvidersService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    this.logger.log("Listing Providers records");
    return [];
  }

  async findOne(id: string) {
    this.logger.log(`Finding Providers record by id: ${id}`);
    return { id, name: "Providers Placeholder" };
  }

  async create(dto: CreateProvidersDto) {
    this.logger.log(`Creating Providers record: ${JSON.stringify(dto)}`);
    return { id: "new-id", ...dto };
  }

  async update(id: string, dto: UpdateProvidersDto) {
    this.logger.log(`Updating Providers record ${id}: ${JSON.stringify(dto)}`);
    return { id, ...dto };
  }

  async remove(id: string) {
    this.logger.log(`Removing Providers record ${id}`);
    return { success: true, id };
  }
}
