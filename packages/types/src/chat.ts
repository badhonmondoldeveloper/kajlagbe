export enum ConversationContextType {
  DIRECT = 'DIRECT',
  JOB_APPLICATION = 'JOB_APPLICATION',
  BOOKING = 'BOOKING',
  WORK_ORDER = 'WORK_ORDER',
  SUPPORT = 'SUPPORT',
}

export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  FILE = 'FILE',
  SYSTEM = 'SYSTEM',
}

export enum MessageStatus {
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
}

export interface ConversationParticipantDto {
  id: string;
  conversationId: string;
  userId: string;
  role: string;
  unreadCount: number;
  lastReadMessageId?: string | null;
  lastReadAt: string | Date;
  user?: any;
}

export interface ConversationResponseDto {
  id: string;
  conversationReference: string;
  contextType: ConversationContextType;
  jobId?: string | null;
  jobApplicationId?: string | null;
  bookingId?: string | null;
  workOrderId?: string | null;
  supportTicketId?: string | null;
  lastMessageAt: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;
  participants?: ConversationParticipantDto[];
  messages?: any[];
  unreadCount?: number;
}

export interface CreateConversationDto {
  recipientId: string;
  contextType?: ConversationContextType;
  jobId?: string;
  jobApplicationId?: string;
  bookingId?: string;
  workOrderId?: string;
  supportTicketId?: string;
  initialMessage?: string;
}

export interface SendMessageDto {
  conversationId: string;
  content: string;
  type?: MessageType;
  attachments?: {
    fileUrl: string;
    fileType: string;
    fileName: string;
    fileSize: number;
  }[];
}
