import { Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { MessagesService } from './messages.service';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';

@Module({
  controllers: [ChatController],
  providers: [ConversationsService, MessagesService, ChatGateway],
  exports: [ConversationsService, MessagesService],
})
export class ChatModule {}

