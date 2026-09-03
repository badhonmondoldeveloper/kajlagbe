import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { CreateReviewsDto, UpdateReviewsDto } from "./reviews.dto";

@Injectable()
export class ReviewsService {
  private readonly logger = new Logger(ReviewsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    this.logger.log("Listing Reviews records");
    return [];
  }

  async findOne(id: string) {
    this.logger.log(`Finding Reviews record by id: ${id}`);
    return { id, name: "Reviews Placeholder" };
  }

  async create(dto: CreateReviewsDto) {
    this.logger.log(`Creating Reviews record: ${JSON.stringify(dto)}`);
    return { id: "new-id", ...dto };
  }

  async update(id: string, dto: UpdateReviewsDto) {
    this.logger.log(`Updating Reviews record ${id}: ${JSON.stringify(dto)}`);
    return { id, ...dto };
  }

  async remove(id: string) {
    this.logger.log(`Removing Reviews record ${id}`);
    return { success: true, id };
  }
}
