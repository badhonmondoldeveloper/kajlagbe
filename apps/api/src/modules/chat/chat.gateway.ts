import { Injectable, Logger } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Injectable()
export class ChatGateway {
  private readonly logger = new Logger(ChatGateway.name);

  constructor(private readonly messagesService: MessagesService) {}

  async broadcastNewMessage(conversationId: string, message: any) {
    this.logger.log(`Realtime message event broadcasted for conversation: ${conversationId}`);
    return { status: 'broadcasted', conversationId, messageId: message.id };
  }
}
