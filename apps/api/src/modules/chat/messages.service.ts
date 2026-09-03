import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { MessageType, MessageStatus, NotificationType } from '@kajlagbe/types';

@Injectable()
export class MessagesService {
  private readonly logger = new Logger(MessagesService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Send a message within an authorized conversation
   */
  async sendMessage(
    senderId: string,
    conversationId: string,
    content: string,
    type: MessageType = MessageType.TEXT,
    attachments?: { fileUrl: string; fileType: string; fileName: string; fileSize: number }[],
  ): Promise<any> {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { participants: true },
    });

    if (!conversation) {
      throw new NotFoundException('চ্যাট মেসেজবক্স পাওয়া যায়নি।');
    }

    const isParticipant = conversation.participants.some((p) => p.userId === senderId);
    if (!isParticipant) {
      throw new ForbiddenException('অনুমতি নেই।');
    }

    return this.prisma.$transaction(async (tx) => {
      // Create Message
      const message = await tx.message.create({
        data: {
          conversationId,
          senderId,
          type,
          content,
          status: MessageStatus.SENT,
          attachments: attachments && attachments.length > 0 ? {
            create: attachments.map((att) => ({
              fileUrl: att.fileUrl,
              fileType: att.fileType,
              fileName: att.fileName,
              fileSize: att.fileSize,
            })),
          } : undefined,
        },
        include: {
          sender: { select: { id: true, email: true, profile: true } },
          attachments: true,
        },
      });

      // Update Conversation lastMessageAt
      await tx.conversation.update({
        where: { id: conversationId },
        data: { lastMessageAt: new Date() },
      });

      // Increment unread counts for recipient participants
      const recipients = conversation.participants.filter((p) => p.userId !== senderId);
      for (const recipient of recipients) {
        await tx.conversationParticipant.update({
          where: { id: recipient.id },
          data: { unreadCount: { increment: 1 } },
        });

        // Trigger Notification
        await tx.notification.create({
          data: {
            userId: recipient.userId,
            type: NotificationType.MESSAGE,
            title: 'নতুন চ্যাট বার্তার নোটিফিকেশন',
            message: content.length > 60 ? `${content.substring(0, 60)}...` : content,
            link: `/messages/${conversationId}`,
          },
        });
      }

      return message;
    });
  }

  /**
   * Get messages for a conversation (Paginated)
   */
  async getMessages(
    userId: string,
    conversationId: string,
    page = 1,
    limit = 50,
  ): Promise<any> {
    const participant = await this.prisma.conversationParticipant.findUnique({
      where: { conversationId_userId: { conversationId, userId } },
    });

    if (!participant) {
      throw new ForbiddenException('অনুমতি নেই।');
    }

    const skip = (page - 1) * limit;

    const [total, items] = await Promise.all([
      this.prisma.message.count({ where: { conversationId } }),
      this.prisma.message.findMany({
        where: { conversationId },
        skip,
        take: limit,
        orderBy: { createdAt: 'asc' },
        include: {
          sender: { select: { id: true, email: true, profile: true } },
          attachments: true,
        },
      }),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Mark messages as read for a participant (Concurrency Safe Participant Tracking)
   */
  async markAsRead(userId: string, conversationId: string, messageId?: string): Promise<any> {
    const participant = await this.prisma.conversationParticipant.findUnique({
      where: { conversationId_userId: { conversationId, userId } },
    });

    if (!participant) return;

    await this.prisma.conversationParticipant.update({
      where: { id: participant.id },
      data: {
        unreadCount: 0,
        lastReadMessageId: messageId || null,
        lastReadAt: new Date(),
      },
    });

    return { success: true };
  }
}
