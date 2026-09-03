import { Injectable, Logger } from '@nestjs/common';
import { IQueueService, QueueJob } from './queue.interface';

/**
 * In-memory background job queue fallback implementation
 * In future modules, this integrates with BullMQ / Redis queues
 */
@Injectable()
export class QueueService implements IQueueService {
  private readonly logger = new Logger(QueueService.name);

  async addJob<T = any>(
    queueName: string,
    jobName: string,
    data: T,
  ): Promise<QueueJob<T>> {
    const job: QueueJob<T> = {
      id: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
      name: jobName,
      data,
      timestamp: Date.now(),
    };
    this.logger.log(`Job queued on [${queueName}] -> ${jobName} (ID: ${job.id})`);
    return job;
  }
}

