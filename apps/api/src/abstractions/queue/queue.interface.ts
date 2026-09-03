export interface QueueJob<T = any> {
  id: string;
  name: string;
  data: T;
  timestamp: number;
}

export interface IQueueService {
  addJob<T = any>(queueName: string, jobName: string, data: T): Promise<QueueJob<T>>;
}

export const QUEUE_SERVICE_TOKEN = 'IQueueService';

