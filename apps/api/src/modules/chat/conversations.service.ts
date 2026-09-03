import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ConversationContextType } from '@kajlagbe/types';
import * as crypto from 'crypto';

@Injectable()
export class ConversationsService {
  private readonly logger = new Logger(ConversationsService.name);

  constructor(private readonly prisma: PrismaService) {}

  private generateReference(): string {
    const year = new Date().getFullYear();
    const randomHex = crypto.randomBytes(4).toString('hex').toUpperCase();
    return `CONV-${year}-${randomHex}`;
  }

  /**
   * Get or Create Conversation between participants based on explicit marketplace relations
   */
  async getOrCreateConversation(
    userId: string,
    recipientId: string,
    contextType: ConversationContextType = ConversationContextType.DIRECT,
    jobId?: string,
    jobApplicationId?: string,
    bookingId?: string,
    workOrderId?: string,
    supportTicketId?: string,
  ): Promise<any> {
    if (userId === recipientId) {
      throw new BadRequestException('নিজের সাথে মেসেজ আদান-প্রদান করা সম্ভব নয়।');
    }

    // Check existing conversation using explicit relation constraints
    const existing = await this.prisma.conversation.findFirst({
      where: {
        contextType,
        jobId: jobId || null,
        jobApplicationId: jobApplicationId || null,
        bookingId: bookingId || null,
        workOrderId: workOrderId || null,
        supportTicketId: supportTicketId || null,
        participants: {
          every: {
            userId: { in: [userId, recipientId] },
          },
        },
      },
      include: {
        participants: {
          include: {
            user: { select: { id: true, email: true, phone: true, profile: true } },
          },
        },
        messages: {
          take: 20,
          orderBy: { createdAt: 'desc' },
          include: { attachments: true },
        },
      },
    });

    if (existing) {
      return existing;
    }

    // Create new conversation
    const conversationReference = this.generateReference();

    const conversation = await this.prisma.conversation.create({
      data: {
        conversationReference,
        contextType,
        jobId,
        jobApplicationId,
        bookingId,
        workOrderId,
        supportTicketId,
        participants: {
          create: [
            { userId, role: 'INITIATOR' },
            { userId: recipientId, role: 'MEMBER' },
          ],
        },
      },
      include: {
        participants: {
          include: {
            user: { select: { id: true, email: true, phone: true, profile: true } },
          },
        },
        messages: {
          take: 20,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    return conversation;
  }

  /**
   * Get user's inbox conversations
   */
  async getUserConversations(userId: string): Promise<any> {
    const conversations = await this.prisma.conversation.findMany({
      where: {
        participants: {
          some: { userId },
        },
      },
      orderBy: { lastMessageAt: 'desc' },
      include: {
        participants: {
          include: {
            user: { select: { id: true, email: true, phone: true, profile: true } },
          },
        },
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    return conversations.map((conv) => {
      const selfParticipant = conv.participants.find((p) => p.userId === userId);
      return {
        ...conv,
        unreadCount: selfParticipant?.unreadCount || 0,
      };
    });
  }

  /**
   * Get conversation details by ID with membership check
   */
  async getConversationDetails(userId: string, conversationId: string): Promise<any> {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        participants: {
          include: {
            user: { select: { id: true, email: true, phone: true, profile: true } },
          },
        },
      },
    });

    if (!conversation) {
      throw new NotFoundException('চ্যাট মেসেজ বক্সে এক্সেস পাওয়া যায়নি।');
    }

    const isParticipant = conversation.participants.some((p) => p.userId === userId);
    if (!isParticipant) {
      throw new ForbiddenException('এই মেসেজবক্সটি দেখার অনুমতি আপনার নেই।');
    }

    return conversation;
  }
}
