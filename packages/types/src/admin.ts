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
  amount: number;
  currency: string;
  payoutMethod: string;
  accountNumberMasked: string;
  accountName: string;
  status: string;
  referenceCode: string;
  requestedAt: string;
  processedAt?: string | null;
  failureReason?: string | null;
}

export interface AuditLogItem {
  id: string;
  userId?: string | null;
  userName?: string | null;
  userRole?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  metadata?: Record<string, any> | null;
  createdAt: string;
}

export interface FeatureFlagItem {
  id: string;
  key: string;
  name: string;
  description?: string | null;
  isEnabled: boolean;
  rolloutPercentage: number;
  updatedAt: string;
}
