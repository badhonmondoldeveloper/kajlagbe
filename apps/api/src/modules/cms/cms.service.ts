import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { CreateCmsDto, UpdateCmsDto } from "./cms.dto";

@Injectable()
export class CmsService {
  private readonly logger = new Logger(CmsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    this.logger.log("Listing Cms records");
    return [];
  }

  async findOne(id: string) {
    this.logger.log(`Finding Cms record by id: ${id}`);
    return { id, name: "Cms Placeholder" };
  }

  async create(dto: CreateCmsDto) {
    this.logger.log(`Creating Cms record: ${JSON.stringify(dto)}`);
    return { id: "new-id", ...dto };
  }

  async update(id: string, dto: UpdateCmsDto) {
    this.logger.log(`Updating Cms record ${id}: ${JSON.stringify(dto)}`);
    return { id, ...dto };
  }

  async remove(id: string) {
    this.logger.log(`Removing Cms record ${id}`);
    return { success: true, id };
  }
}
