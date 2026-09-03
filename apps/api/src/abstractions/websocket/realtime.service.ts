import { Injectable, Logger } from '@nestjs/common';

/**
 * Gateway / Event dispatcher abstraction placeholder for real-time messaging
 * Designed to be implemented with Socket.IO or native WebSockets in Module 08
 */
@Injectable()
export class RealtimeEventService {
  private readonly logger = new Logger(RealtimeEventService.name);

  emitToUser(userId: string, event: string, payload: any): void {
    this.logger.log(`[Realtime Event] To User ${userId} -> ${event}: ${JSON.stringify(payload)}`);
  }

  emitToRoom(roomId: string, event: string, payload: any): void {
    this.logger.log(`[Realtime Event] To Room ${roomId} -> ${event}: ${JSON.stringify(payload)}`);
  }

  broadcast(event: string, payload: any): void {
    this.logger.log(`[Realtime Broadcast] -> ${event}: ${JSON.stringify(payload)}`);
  }
}

