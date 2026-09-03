import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ConversationsService } from './conversations.service';
import { MessagesService } from './messages.service';
import { SupabaseAuthGuard } from '../../common/guards/supabase-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('chat')
@ApiBearerAuth()
@UseGuards(SupabaseAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(
    private readonly conversationsService: ConversationsService,
    private readonly messagesService: MessagesService,
  ) {}

  @Get('conversations')
  @ApiOperation({ summary: 'Get user inbox conversations' })
  async getConversations(@CurrentUser('id') userId: string) {
    return this.conversationsService.getUserConversations(userId);
  }

  @Post('conversations')
  @ApiOperation({ summary: 'Get or create conversation with user' })
  async getOrCreateConversation(
    @CurrentUser('id') userId: string,
    @Body()
    body: {
      recipientId: string;
      contextType?: any;
      jobId?: string;
      bookingId?: string;
      workOrderId?: string;
    },
  ) {
    return this.conversationsService.getOrCreateConversation(
      userId,
      body.recipientId,
      body.contextType,
      body.jobId,
      body.bookingId,
      body.workOrderId,
    );
  }

  @Get('conversations/:id')
  @ApiOperation({ summary: 'Get conversation details by ID' })
  async getConversationDetails(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.conversationsService.getConversationDetails(userId, id);
  }

  @Get('conversations/:id/messages')
  @ApiOperation({ summary: 'Get messages for a conversation' })
  async getMessages(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.messagesService.getMessages(userId, id, page, limit);
  }

  @Post('conversations/:id/messages')
  @ApiOperation({ summary: 'Send message in a conversation' })
  async sendMessage(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() body: { content: string; type?: any; attachments?: any[] },
  ) {
    return this.messagesService.sendMessage(
      userId,
      id,
      body.content,
      body.type,
      body.attachments,
    );
  }

  @Post('conversations/:id/read')
  @ApiOperation({ summary: 'Mark conversation messages as read' })
  async markAsRead(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.messagesService.markAsRead(userId, id);
  }
}
