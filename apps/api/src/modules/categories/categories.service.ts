import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { CreateCategoriesDto, UpdateCategoriesDto } from "./categories.dto";

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    this.logger.log("Listing Categories records");
    return [];
  }

  async findOne(id: string) {
    this.logger.log(`Finding Categories record by id: ${id}`);
    return { id, name: "Categories Placeholder" };
  }

  async create(dto: CreateCategoriesDto) {
    this.logger.log(`Creating Categories record: ${JSON.stringify(dto)}`);
    return { id: "new-id", ...dto };
  }

  async update(id: string, dto: UpdateCategoriesDto) {
    this.logger.log(`Updating Categories record ${id}: ${JSON.stringify(dto)}`);
    return { id, ...dto };
  }

  async remove(id: string) {
    this.logger.log(`Removing Categories record ${id}`);
    return { success: true, id };
  }
}
