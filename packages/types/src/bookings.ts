export enum BookingStatus {
  PENDING_CONFIRMATION = 'PENDING_CONFIRMATION',
  CONFIRMED = 'CONFIRMED',
  SCHEDULED = 'SCHEDULED',
  RESCHEDULE_REQUESTED = 'RESCHEDULE_REQUESTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  DISPUTED_FUTURE = 'DISPUTED_FUTURE',
  ARCHIVED = 'ARCHIVED',
}

export enum WorkOrderStatus {
  CREATED = 'CREATED',
  ASSIGNED = 'ASSIGNED',
  SCHEDULED = 'SCHEDULED',
  EN_ROUTE_FUTURE = 'EN_ROUTE_FUTURE',
  ARRIVED = 'ARRIVED',
  STARTED = 'STARTED',
  PAUSED = 'PAUSED',
  COMPLETED_BY_PROVIDER = 'COMPLETED_BY_PROVIDER',
  CONFIRMED_BY_CUSTOMER = 'CONFIRMED_BY_CUSTOMER',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED',
}

export enum RescheduleStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export enum CancellationReason {
  CUSTOMER_CHANGED_MIND = 'CUSTOMER_CHANGED_MIND',
  PROVIDER_UNAVAILABLE = 'PROVIDER_UNAVAILABLE',
  SCHEDULE_CONFLICT = 'SCHEDULE_CONFLICT',
  SERVICE_NO_LONGER_NEEDED = 'SERVICE_NO_LONGER_NEEDED',
  PRICE_DISAGREEMENT = 'PRICE_DISAGREEMENT',
  DUPLICATE_REQUEST = 'DUPLICATE_REQUEST',
  OTHER = 'OTHER',
}

export enum LocationAccessState {
  LOCATION_HIDDEN = 'LOCATION_HIDDEN',
  LOCATION_AVAILABLE = 'LOCATION_AVAILABLE',
  LOCATION_REVEALED = 'LOCATION_REVEALED',
}

export interface BookingResponseDto {
  id: string;
  bookingReference: string;
  jobId: string;
  applicationId: string;
  customerId: string;
  providerId: string;
  status: BookingStatus;
  agreedPrice: number;
  generalArea: string;
  privateAddress?: string | null;
  locationAccessState: LocationAccessState;
  scheduledDate?: string | null;
  scheduledTime?: string | null;
  durationNotes?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  confirmedAt?: string | Date | null;
  startedAt?: string | Date | null;
  completedAt?: string | Date | null;
  cancelledAt?: string | Date | null;
  job?: any;
  customer?: any;
  provider?: any;
  workOrder?: any;
  rescheduleRequests?: any[];
  cancellation?: any;
  statusHistories?: any[];
  progressUpdates?: any[];
}

export interface WorkOrderResponseDto {
  id: string;
  workOrderReference: string;
  bookingId: string;
  customerId: string;
  providerId: string;
  status: WorkOrderStatus;
  scopeSummary: string;
  agreedPrice: number;
  startedAt?: string | Date | null;
  providerCompletedAt?: string | Date | null;
  customerConfirmedAt?: string | Date | null;
  closedAt?: string | Date | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  statusHistories?: any[];
  progressUpdates?: any[];
}

export interface RequestRescheduleDto {
  proposedDate: string;
  proposedTime: string;
  reason: string;
}

export interface RespondRescheduleDto {
  requestId: string;
  accept: boolean;
  notes?: string;
}

export interface CancelBookingDto {
  reasonCategory: CancellationReason;
  note?: string;
}

export interface ProgressUpdateDto {
  status: WorkOrderStatus;
  title: string;
  note?: string;
  images?: string[];
}
