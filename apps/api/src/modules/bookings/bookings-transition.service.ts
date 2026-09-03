import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { BookingStatus, WorkOrderStatus } from '@kajlagbe/types';

@Injectable()
export class BookingStatusTransitionService {
  private readonly logger = new Logger(BookingStatusTransitionService.name);

  // Allowed state transitions for BookingStatus
  private readonly allowedBookingTransitions: Record<BookingStatus, BookingStatus[]> = {
    [BookingStatus.PENDING_CONFIRMATION]: [
      BookingStatus.CONFIRMED,
      BookingStatus.SCHEDULED,
      BookingStatus.CANCELLED,
    ],
    [BookingStatus.CONFIRMED]: [
      BookingStatus.SCHEDULED,
      BookingStatus.RESCHEDULE_REQUESTED,
      BookingStatus.IN_PROGRESS,
      BookingStatus.CANCELLED,
    ],
    [BookingStatus.SCHEDULED]: [
      BookingStatus.RESCHEDULE_REQUESTED,
      BookingStatus.IN_PROGRESS,
      BookingStatus.CANCELLED,
    ],
    [BookingStatus.RESCHEDULE_REQUESTED]: [
      BookingStatus.CONFIRMED,
      BookingStatus.SCHEDULED,
      BookingStatus.CANCELLED,
    ],
    [BookingStatus.IN_PROGRESS]: [
      BookingStatus.COMPLETED,
      BookingStatus.CANCELLED,
      BookingStatus.DISPUTED_FUTURE,
    ],
    [BookingStatus.COMPLETED]: [
      BookingStatus.ARCHIVED,
      BookingStatus.DISPUTED_FUTURE,
    ],
    [BookingStatus.CANCELLED]: [
      BookingStatus.ARCHIVED,
    ],
    [BookingStatus.DISPUTED_FUTURE]: [
      BookingStatus.COMPLETED,
      BookingStatus.CANCELLED,
      BookingStatus.ARCHIVED,
    ],
    [BookingStatus.ARCHIVED]: [],
  };

  // Allowed state transitions for WorkOrderStatus
  private readonly allowedWorkOrderTransitions: Record<WorkOrderStatus, WorkOrderStatus[]> = {
    [WorkOrderStatus.CREATED]: [
      WorkOrderStatus.ASSIGNED,
      WorkOrderStatus.SCHEDULED,
      WorkOrderStatus.CANCELLED,
    ],
    [WorkOrderStatus.ASSIGNED]: [
      WorkOrderStatus.SCHEDULED,
      WorkOrderStatus.EN_ROUTE_FUTURE,
      WorkOrderStatus.ARRIVED,
      WorkOrderStatus.STARTED,
      WorkOrderStatus.CANCELLED,
    ],
    [WorkOrderStatus.SCHEDULED]: [
      WorkOrderStatus.EN_ROUTE_FUTURE,
      WorkOrderStatus.ARRIVED,
      WorkOrderStatus.STARTED,
      WorkOrderStatus.CANCELLED,
    ],
    [WorkOrderStatus.EN_ROUTE_FUTURE]: [
      WorkOrderStatus.ARRIVED,
      WorkOrderStatus.STARTED,
      WorkOrderStatus.CANCELLED,
    ],
    [WorkOrderStatus.ARRIVED]: [
      WorkOrderStatus.STARTED,
      WorkOrderStatus.PAUSED,
      WorkOrderStatus.CANCELLED,
    ],
    [WorkOrderStatus.STARTED]: [
      WorkOrderStatus.PAUSED,
      WorkOrderStatus.COMPLETED_BY_PROVIDER,
      WorkOrderStatus.CANCELLED,
    ],
    [WorkOrderStatus.PAUSED]: [
      WorkOrderStatus.STARTED,
      WorkOrderStatus.COMPLETED_BY_PROVIDER,
      WorkOrderStatus.CANCELLED,
    ],
    [WorkOrderStatus.COMPLETED_BY_PROVIDER]: [
      WorkOrderStatus.CONFIRMED_BY_CUSTOMER,
      WorkOrderStatus.CLOSED,
      WorkOrderStatus.STARTED, // if customer requests fix
    ],
    [WorkOrderStatus.CONFIRMED_BY_CUSTOMER]: [
      WorkOrderStatus.CLOSED,
    ],
    [WorkOrderStatus.CLOSED]: [],
    [WorkOrderStatus.CANCELLED]: [],
  };

  validateBookingTransition(current: BookingStatus, next: BookingStatus): void {
    if (current === next) return;

    const allowed = this.allowedBookingTransitions[current] || [];
    if (!allowed.includes(next)) {
      this.logger.warn(`Invalid Booking transition attempted: ${current} -> ${next}`);
      throw new BadRequestException(
        `বুকিংয়ের স্ট্যাটাস '${current}' থেকে '${next}'-এ পরিবর্তন করা সম্ভব নয়।`
      );
    }
  }

  validateWorkOrderTransition(current: WorkOrderStatus, next: WorkOrderStatus): void {
    if (current === next) return;

    const allowed = this.allowedWorkOrderTransitions[current] || [];
    if (!allowed.includes(next)) {
      this.logger.warn(`Invalid WorkOrder transition attempted: ${current} -> ${next}`);
      throw new BadRequestException(
        `ওয়ার্ক অর্ডারের স্ট্যাটাস '${current}' থেকে '${next}'-এ পরিবর্তন করা সম্ভব নয়।`
      );
    }
  }
}
