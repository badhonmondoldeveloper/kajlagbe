export const JobStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  PAUSED: 'PAUSED',
  EXPIRED: 'EXPIRED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  PROVIDER_SELECTED: 'PROVIDER_SELECTED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  ARCHIVED: 'ARCHIVED',
} as const;
export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus];

export const JobUrgency = {
  FLEXIBLE: 'FLEXIBLE',
  TODAY: 'TODAY',
  URGENT: 'URGENT',
  EMERGENCY_REQUEST: 'EMERGENCY_REQUEST',
} as const;
export type JobUrgency = (typeof JobUrgency)[keyof typeof JobUrgency];

export const BudgetType = {
  FIXED_BUDGET: 'FIXED_BUDGET',
  BUDGET_RANGE: 'BUDGET_RANGE',
  NEGOTIABLE: 'NEGOTIABLE',
  REQUEST_QUOTES: 'REQUEST_QUOTES',
} as const;
export type BudgetType = (typeof BudgetType)[keyof typeof BudgetType];

export const ApplicationStatus = {
  DRAFT: 'DRAFT',
  SUBMITTED: 'SUBMITTED',
  VIEWED: 'VIEWED',
  SHORTLISTED: 'SHORTLISTED',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  WITHDRAWN: 'WITHDRAWN',
} as const;
export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus];

export const PricingType = {
  FIXED: 'FIXED',
  HOURLY: 'HOURLY',
  NEGOTIABLE: 'NEGOTIABLE',
} as const;
export type PricingType = (typeof PricingType)[keyof typeof PricingType];

export interface CreateJobDto {
  title: string;
  description: string;
  categorySlug: string;
  serviceSlug?: string;
  requirements?: string[];
  urgency?: JobUrgency;
  budgetType?: BudgetType;
  budgetMin?: number;
  budgetMax?: number;
  divisionId?: string;
  districtId?: string;
  generalArea: string;
  privateAddress?: string;
  preferredDate?: string;
  preferredTime?: string;
  isDraft?: boolean;
}

export interface UpdateJobDto {
  title?: string;
  description?: string;
  categorySlug?: string;
  serviceSlug?: string;
  requirements?: string[];
  urgency?: JobUrgency;
  budgetType?: BudgetType;
  budgetMin?: number;
  budgetMax?: number;
  divisionId?: string;
  districtId?: string;
  generalArea?: string;
  privateAddress?: string;
  preferredDate?: string;
  preferredTime?: string;
}

export interface CreateApplicationDto {
  coverLetter: string;
  proposedPrice: number;
  pricingType?: PricingType;
  estimatedDays?: number;
  availabilityNote?: string;
}

export interface SelectProviderDto {
  applicationId: string;
  notes?: string;
}

export interface CancelJobDto {
  reason?: string;
}

export interface JobSummary {
  id: string;
  title: string;
  description: string;
  categorySlug: string;
  serviceSlug?: string;
  urgency: JobUrgency;
  budgetType: BudgetType;
  budgetMin?: number;
  budgetMax?: number;
  status: JobStatus;
  generalArea: string;
  preferredDate?: string;
  preferredTime?: string;
  totalApplications: number;
  createdAt: string | Date;
  publishedAt?: string | Date;
}

export interface PublicJobDetail extends JobSummary {
  requirements: string[];
  customerName: string;
  customerVerified: boolean;
  hasApplied?: boolean;
  isSaved?: boolean;
}

export interface CustomerJobDetail extends JobSummary {
  privateAddress?: string;
  requirements: string[];
  selectedApplicationId?: string;
  selectedProviderId?: string;
  cancellationReason?: string;
  applicationsCount: number;
  statusHistories: {
    id: string;
    fromStatus: JobStatus;
    toStatus: JobStatus;
    reason?: string;
    createdAt: string | Date;
  }[];
}

export interface JobApplicationSummary {
  id: string;
  jobId: string;
  providerId: string;
  providerName: string;
  providerRating: number;
  providerReviewsCount: number;
  providerExperienceYears: number;
  providerPrimaryCategory: string;
  isProviderVerified: boolean;
  coverLetter: string;
  proposedPrice: number;
  pricingType: PricingType;
  estimatedDays: number;
  availabilityNote?: string;
  status: ApplicationStatus;
  isShortlisted: boolean;
  createdAt: string | Date;
}

export interface ProviderJobSearchFilter {
  query?: string;
  category?: string;
  division?: string;
  district?: string;
  urgency?: JobUrgency | 'all';
  budgetMin?: number;
  budgetMax?: number;
  page?: number;
  limit?: number;
}
