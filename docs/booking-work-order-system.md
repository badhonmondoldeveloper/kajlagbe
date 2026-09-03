# KajLagbe Module 07 — Advanced Booking, Work Order & Service Management System

## Overview
Module 07 establishes the core service execution engine for the KajLagbe (কাজ লাগবে) marketplace. It seamlessly converts accepted job applications into structured **Bookings** and **Work Orders**, managing scheduling, rescheduling, cancellations, privacy-controlled address sharing, real-time service progress updates, and customer completion confirmation.

---

## Architecture & Data Flow

```
Customer Posts Job
      │
Providers Apply
      │
Customer Selects Provider
      │
[Atomic Transaction]
 ├── Job status ──> PROVIDER_SELECTED
 ├── Application ──> ACCEPTED
 └── Create Booking ──> PENDING_CONFIRMATION (BK-2026-XXXX)
      │
Provider Confirms Availability
 ├── Booking status ──> CONFIRMED
 ├── Address Privacy ──> LOCATION_REVEALED
 └── Create Work Order ──> ASSIGNED (WO-2026-XXXX)
      │
Service Execution
 ├── Provider Starts Work ──> IN_PROGRESS / STARTED
 ├── Progress Updates ──> ServiceProgressUpdate (Arrived, Working, etc.)
 └── Provider Complete ──> COMPLETED_BY_PROVIDER
      │
Customer Confirmation
 ├── Work Order ──> CLOSED
 └── Booking ──> COMPLETED
```

---

## Core Models

### 1. Booking
- **Primary Reference**: `BK-2026-XXXX`
- **Statuses**: `PENDING_CONFIRMATION`, `CONFIRMED`, `SCHEDULED`, `RESCHEDULE_REQUESTED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`, `DISPUTED_FUTURE`, `ARCHIVED`
- **Location Access State**: `LOCATION_HIDDEN` (before provider confirmation), `LOCATION_REVEALED` (after confirmation).

### 2. WorkOrder
- **Primary Reference**: `WO-2026-XXXX`
- **Statuses**: `CREATED`, `ASSIGNED`, `SCHEDULED`, `EN_ROUTE_FUTURE`, `ARRIVED`, `STARTED`, `PAUSED`, `COMPLETED_BY_PROVIDER`, `CONFIRMED_BY_CUSTOMER`, `CLOSED`, `CANCELLED`

### 3. BookingRescheduleRequest
- Handles structured schedule modification requests between customer and provider with proposed dates, times, reasons, and status (`PENDING`, `ACCEPTED`, `REJECTED`).

### 4. BookingCancellation
- Records structured cancellations with predefined categories (`CUSTOMER_CHANGED_MIND`, `PROVIDER_UNAVAILABLE`, `SCHEDULE_CONFLICT`, `SERVICE_NO_LONGER_NEEDED`, `PRICE_DISAGREEMENT`, `OTHER`) and optional notes.

### 5. ServiceProgressUpdate
- Persisted progress logs posted by providers during service execution with status titles, notes, and timestamps.

---

## Security & Data Privacy
1. **Server-Side Authorization**: All status transitions and state changes are validated server-side by `BookingStatusTransitionService`.
2. **Controlled Address Protection**: Customer private addresses (`privateAddress`) are strictly excluded from API responses when `locationAccessState === LOCATION_HIDDEN`. Address details unlock only after provider confirms availability.
3. **Ownership Validation**: Customers can only view/manage their own bookings; Providers can only view/manage bookings assigned to them.

---

## API Endpoints

### Bookings
- `GET /bookings/customer` — Paginated customer bookings list
- `GET /bookings/provider` — Paginated provider bookings list
- `GET /bookings/:id` — Booking details (privacy-aware)
- `POST /bookings/:id/confirm` — Provider confirms availability & unlocks location
- `POST /bookings/:id/reschedule/request` — Request schedule change
- `POST /bookings/:id/reschedule/respond` — Accept or reject reschedule proposal
- `POST /bookings/:id/cancel` — Cancel booking with reason

### Work Orders
- `GET /work-orders/:id` — Work order details & progress timeline
- `POST /work-orders/:id/start` — Provider starts work
- `POST /work-orders/:id/progress` — Post progress update
- `POST /work-orders/:id/complete` — Provider marks service completed
- `POST /work-orders/:id/confirm-completion` — Customer confirms completion & closes order

---

## Frontend Portals
- **Customer Portal**: `/customer/bookings`, `/customer/bookings/[id]`
- **Provider Portal**: `/provider/bookings`, `/provider/bookings/[id]`, `/provider/schedule`
- **Dashboards**: Integrated metric counters and active booking radar cards on `/customer/dashboard` and `/provider/dashboard`.

