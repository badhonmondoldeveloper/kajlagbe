export enum NotificationType {
  ACCOUNT = 'ACCOUNT',
  SECURITY = 'SECURITY',
  BOOKING = 'BOOKING',
  JOB = 'JOB',
  MESSAGE = 'MESSAGE',
  PAYMENT = 'PAYMENT',
  SYSTEM = 'SYSTEM',
}

export enum ActivityType {
  PROFILE_UPDATED = 'PROFILE_UPDATED',
  SERVICE_ADDED = 'SERVICE_ADDED',
  AVAILABILITY_CHANGED = 'AVAILABILITY_CHANGED',
  ACCOUNT_STATUS_CHANGED = 'ACCOUNT_STATUS_CHANGED',
  BOOKING_CREATED = 'BOOKING_CREATED',
  JOB_CREATED = 'JOB_CREATED',
  PAYMENT_COMPLETED = 'PAYMENT_COMPLETED',
  SECURITY_EVENT = 'SECURITY_EVENT',
}

export interface NotificationItem {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string | null;
  isRead: boolean;
  readAt?: Date | string | null;
  metadata?: Record<string, unknown> | null;
  createdAt: Date | string;
}

export interface ActivityItem {
  id: string;
  userId: string;
  type: ActivityType;
  description: string;
  metadata?: Record<string, unknown> | null;
  ipAddress?: string | null;
  createdAt: Date | string;
}

export interface ProviderServiceItem {
  id: string;
  providerProfileId: string;
  name: string;
  categorySlug: string;
  description?: string | null;
  pricingType: string;
  startingPrice: number | string;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ProviderPortfolioItem {
  id: string;
  providerProfileId: string;
  title: string;
  description?: string | null;
  categorySlug: string;
  images: string[];
  projectDate?: Date | string | null;
  isPublic: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ProviderAvailabilityData {
  id?: string;
  providerProfileId?: string;
  status: 'available' | 'busy' | 'away';
  isAutoAccept: boolean;
  workingHoursNote?: string | null;
  customNotice?: string | null;
  updatedAt?: Date | string;
}

export interface BusinessServiceItem {
  id: string;
  businessProfileId: string;
  name: string;
  categorySlug: string;
  description?: string | null;
  pricingModel: string;
  startingPrice?: number | string | null;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface BusinessLocationItem {
  id: string;
  businessProfileId: string;
  title: string;
  divisionId?: string | null;
  districtId?: string | null;
  address: string;
  isPrimary: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface BusinessTeamMemberItem {
  id: string;
  businessProfileId: string;
  name: string;
  role: 'OWNER' | 'MANAGER' | 'TECHNICIAN' | 'STAFF' | string;
  phone?: string | null;
  email?: string | null;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING_INVITE' | string;
  joinedAt: Date | string;
  updatedAt: Date | string;
}

export interface SavedProviderItem {
  id: string;
  userId: string;
  providerSlug: string;
  notes?: string | null;
  createdAt: Date | string;
}

export interface ProfileCompletionStatus {
  percentage: number;
  completedFields: string[];
  missingFields: {
    field: string;
    label: string;
    actionUrl: string;
  }[];
  isComplete: boolean;
}

export interface CustomerDashboardStats {
  activeRequestsCount: number;
  upcomingBookingsCount: number;
  completedServicesCount: number;
  savedProvidersCount: number;
  profileCompletion: ProfileCompletionStatus;
}

export interface ProviderDashboardStats {
  activeOpportunitiesCount: number;
  activeBookingsCount: number;
  completedJobsCount: number;
  averageRating: number;
  totalReviewsCount: number;
  profileCompletion: ProfileCompletionStatus;
  availabilityStatus: string;
}

export interface BusinessDashboardStats {
  activeTeamMembersCount: number;
  activeServicesCount: number;
  activeLocationsCount: number;
  customerRequestsCount: number;
  profileCompletion: ProfileCompletionStatus;
}

