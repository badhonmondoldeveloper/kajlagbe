/**
 * Admin Module Shared Interfaces & DTOs
 */

export interface AdminDashboardStats {
  totalUsers: number;
  newUsersToday: number;
  activeProviders: number;
  pendingProviders: number;
  suspendedUsers: number;
  totalJobs: number;
  publishedJobs: number;
  inProgressJobs: number;
  completedJobs: number;
  activeBookings: number;
  totalPaymentVolume: number;
  platformRevenue: number;
  pendingPayoutsCount: number;
  pendingPayoutsAmount: number;
}

export interface UserAdminSummary {
  id: string;
  email: string;
  phone?: string | null;
  status: string;
  onboardingStatus: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  roles: string[];
  createdAt: string;
  profile?: {
    firstName: string;
    lastName: string;
    avatarUrl?: string | null;
  } | null;
}

export interface ProviderVerificationItem {
  id: string;
  userId: string;
  userEmail: string;
  fullName: string;
  phone?: string | null;
  bio?: string | null;
  experienceYears?: number;
  serviceCategories: string[];
  verificationStatus: string;
  submittedAt: string;
  documents?: Array<{
    type: string;
    url: string;
  }>;
}

export interface PayoutRequestAdminItem {
  id: string;
  walletAccountId: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  paymentMethod: string;
  payoutMethod?: string;
  accountDetails: string;
  accountNumberMasked?: string;
  referenceCode?: string;
  status: string;
  createdAt: string;
}

export interface AuditLogAdminItem {
  id: string;
  userId?: string | null;
  userName?: string | null;
  userEmail?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  metadata?: Record<string, any> | null;
  createdAt: string;
}

export type AuditLogItem = AuditLogAdminItem;

export interface FeatureFlagAdminItem {
  id: string;
  key: string;
  name: string;
  description?: string | null;
  isEnabled: boolean;
  updatedAt: string;
}

export type FeatureFlagItem = FeatureFlagAdminItem;

export interface ManualPaymentChannel {
  id: string;
  type: 'BKASH' | 'NAGAD' | 'ROCKET' | 'CRYPTO';
  name: string;
  accountNumber: string;
  accountType?: string;
  networkName?: string;
  instructions: string;
  feePercentage: number;
  isActive: boolean;
  qrCodeUrl?: string;
  updatedAt: string;
}

export interface ManualPaymentSubmission {
  id: string;
  orderReference: string;
  userId: string;
  userEmail: string;
  amountBdt: number;
  amountUsd: number;
  channelId: string;
  channelName: string;
  senderAccount: string;
  transactionId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  notes?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}
