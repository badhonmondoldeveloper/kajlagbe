export enum UserStatus {
  ACTIVE = 'ACTIVE',
  PENDING_EMAIL_VERIFICATION = 'PENDING_EMAIL_VERIFICATION',
  PENDING_REVIEW = 'PENDING_REVIEW',
  SUSPENDED = 'SUSPENDED',
  RESTRICTED = 'RESTRICTED',
  DEACTIVATED = 'DEACTIVATED',
  INACTIVE = 'INACTIVE',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
}

export enum OnboardingStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  SKIPPED_OPTIONAL = 'SKIPPED_OPTIONAL',
  PENDING_REVIEW = 'PENDING_REVIEW',
}

export enum VerificationStatus {
  NOT_STARTED = 'NOT_STARTED',
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum ProfileStatus {
  DRAFT = 'DRAFT',
  PENDING_REVIEW = 'PENDING_REVIEW',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  REJECTED = 'REJECTED',
}

export interface UserBase {
  id: string;
  email: string;
  phone?: string | null;
  status: UserStatus;
  onboardingStatus: OnboardingStatus;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface UserProfileBase {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
  bio?: string | null;
  address?: string | null;
  divisionId?: string | null;
  districtId?: string | null;
  upazilaId?: string | null;
  verificationStatus: VerificationStatus;
}

export interface CustomerProfileBase {
  id: string;
  userId: string;
  preferredLocations: string[];
  serviceInterests: string[];
  allowNotifications: boolean;
}

export interface ProviderProfileBase {
  id: string;
  userId: string;
  primaryCategory: string;
  secondaryCategories: string[];
  experienceYears: number;
  bio?: string | null;
  serviceLocation?: string | null;
  divisionId?: string | null;
  districtId?: string | null;
  skills: string[];
  servicesOffered?: Record<string, unknown> | null;
  availabilityStatus: string;
  status: ProfileStatus;
}

export interface BusinessProfileBase {
  id: string;
  userId: string;
  businessName: string;
  tradeLicenseNumber?: string | null;
  description?: string | null;
  categories: string[];
  teamSize: string;
  contactPhone?: string | null;
  contactEmail?: string | null;
  businessAddress?: string | null;
  divisionId?: string | null;
  districtId?: string | null;
  status: ProfileStatus;
}

export interface AuthSessionUser {
  id: string;
  email: string;
  phone?: string | null;
  fullName: string;
  role: string;
  status: UserStatus;
  onboardingStatus: OnboardingStatus;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  profile?: UserProfileBase | null;
  customerProfile?: CustomerProfileBase | null;
  providerProfile?: ProviderProfileBase | null;
  businessProfile?: BusinessProfileBase | null;
}
