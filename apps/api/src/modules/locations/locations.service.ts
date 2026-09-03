import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { CreateLocationsDto, UpdateLocationsDto } from "./locations.dto";

@Injectable()
export class LocationsService {
  private readonly logger = new Logger(LocationsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    this.logger.log("Listing Locations records");
    return [];
  }

  async findOne(id: string) {
    this.logger.log(`Finding Locations record by id: ${id}`);
    return { id, name: "Locations Placeholder" };
  }

  async create(dto: CreateLocationsDto) {
    this.logger.log(`Creating Locations record: ${JSON.stringify(dto)}`);
    return { id: "new-id", ...dto };
  }

  async update(id: string, dto: UpdateLocationsDto) {
    this.logger.log(`Updating Locations record ${id}: ${JSON.stringify(dto)}`);
    return { id, ...dto };
  }

  async remove(id: string) {
    this.logger.log(`Removing Locations record ${id}`);
    return { success: true, id };
  }
}
