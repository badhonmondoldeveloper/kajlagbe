import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { CreateReferralsDto, UpdateReferralsDto } from "./referrals.dto";

@Injectable()
export class ReferralsService {
  private readonly logger = new Logger(ReferralsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    this.logger.log("Listing Referrals records");
    return [];
  }

  async findOne(id: string) {
    this.logger.log(`Finding Referrals record by id: ${id}`);
    return { id, name: "Referrals Placeholder" };
  }

  async create(dto: CreateReferralsDto) {
    this.logger.log(`Creating Referrals record: ${JSON.stringify(dto)}`);
    return { id: "new-id", ...dto };
  }

  async update(id: string, dto: UpdateReferralsDto) {
    this.logger.log(`Updating Referrals record ${id}: ${JSON.stringify(dto)}`);
    return { id, ...dto };
  }

  async remove(id: string) {
    this.logger.log(`Removing Referrals record ${id}`);
    return { success: true, id };
  }
}
