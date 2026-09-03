# KajLagbe Database Architecture Specification

## Overview
This document specifies the real PostgreSQL database schema architecture for **KAJLAGBE (কাজ লাগবে)**. It covers table structures, UUID primary key conventions, foreign key relationships, controlled status enums, indexes, and auditability rules across all 47 domain tables.

---

## Core Schema Principles

1. **UUID Primary Keys**: All entity tables use standard `@default(uuid())` string primary keys.
2. **Foreign Key Integrity**: Explicit cascading deletions (`onDelete: Cascade`) for child profile resources and restricted deletion (`onDelete: SetNull` / `onDelete: Restrict`) for financial and audit entities.
3. **Status Control Enums**: All lifecycle states are governed by strong PostgreSQL enums (`UserStatus`, `ProfileStatus`, `VerificationStatus`, `JobStatus`, `BookingStatus`, `WorkOrderStatus`, `PaymentStatus`, `PayoutStatus`).
4. **Auditability**: Every administrative, financial, or account state mutation writes an entry to `audit_logs` or status history tables (`JobStatusHistory`, `BookingStatusHistory`, `WorkOrderStatusHistory`).

---

## Entity Relationship & Table Specifications

### 1. Identity & Profile Layer (`users`, `user_profiles`, `customer_profiles`, `provider_profiles`, `business_profiles`)

```
   ┌──────────────┐
   │     User     │
   └──────┬───────┘
          │ 1:1
   ┌──────┴───────────────┬───────────────────┬───────────────────┐
   │ UserProfile          │ CustomerProfile   │ ProviderProfile   │ BusinessProfile
   └──────────────────────┴───────────────────┴───────────────────┴───────────────────┘
```

- **`User`**:
  - `id`: UUID (Primary Key)
  - `email`: String (Unique)
  - `phone`: String? (Unique)
  - `status`: `UserStatus` enum (`ACTIVE`, `PENDING_EMAIL_VERIFICATION`, `SUSPENDED`, `RESTRICTED`, `DEACTIVATED`)
  - `onboardingStatus`: `OnboardingStatus` enum (`NOT_STARTED`, `IN_PROGRESS`, `COMPLETED`)
  - `isEmailVerified`: Boolean
  - `isPhoneVerified`: Boolean
  - Timestamps: `createdAt`, `updatedAt`

- **`UserProfile`**:
  - `id`: UUID
  - `userId`: Foreign Key -> `User.id` (1:1, Cascade)
  - `firstName`: String, `lastName`: String, `avatarUrl`: String?, `bio`: String?
  - `divisionId`, `districtId`, `upazilaId`: Foreign Keys -> Location entities
  - `verificationStatus`: `VerificationStatus` enum (`NOT_STARTED`, `PENDING`, `UNDER_REVIEW`, `APPROVED`, `REJECTED`)

- **`ProviderProfile`**:
  - `id`: UUID
  - `userId`: Foreign Key -> `User.id` (1:1, Cascade)
  - `primaryCategory`: String, `secondaryCategories`: String[]
  - `experienceYears`: Int, `bio`: String?, `serviceLocation`: String?
  - `status`: `ProfileStatus` enum (`DRAFT`, `PENDING_REVIEW`, `ACTIVE`, `SUSPENDED`, `REJECTED`)

---

### 2. Geographic Hierarchy Layer (`divisions`, `districts`, `upazilas`)
- **`Division`** (`code`, `name`, `bnName`) -> **`District`** (`divisionId`, `name`, `bnName`) -> **`Upazila`** (`districtId`, `name`, `bnName`).

---

### 3. Marketplace Job Layer (`jobs`, `job_applications`, `job_status_histories`)
- **`Job`**:
  - `id`: UUID
  - `jobReference`: String (Unique, e.g. `JOB-2026-XXXXX`)
  - `customerId`: Foreign Key -> `User.id`
  - `title`: String, `description`: String, `categorySlug`: String
  - `budgetType`: `BudgetType` enum (`FIXED_BUDGET`, `BUDGET_RANGE`, `NEGOTIABLE`, `REQUEST_QUOTES`)
  - `budgetMin`: Decimal?, `budgetMax`: Decimal?
  - `status`: `JobStatus` enum (`DRAFT`, `PUBLISHED`, `PAUSED`, `EXPIRED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`)
  - Indexes: `[customerId]`, `[categorySlug]`, `[status]`, `[createdAt]`

- **`JobApplication`**:
  - `id`: UUID
  - `jobId`: Foreign Key -> `Job.id` (Cascade)
  - `providerId`: Foreign Key -> `User.id`
  - `proposedPrice`: Decimal, `coverNote`: String, `estimatedDays`: Int
  - `status`: `ApplicationStatus` enum (`SUBMITTED`, `VIEWED`, `SHORTLISTED`, `ACCEPTED`, `REJECTED`)

---

### 4. Booking & Work Order Layer (`bookings`, `work_orders`)
- **`Booking`**:
  - `id`: UUID
  - `bookingReference`: String (Unique, e.g. `BK-2026-XXXXX`)
  - `jobId`: Foreign Key -> `Job.id` (1:1)
  - `customerId`: Foreign Key -> `User.id`
  - `providerId`: Foreign Key -> `User.id`
  - `agreedPrice`: Decimal
  - `status`: `BookingStatus` enum (`PENDING_CONFIRMATION`, `CONFIRMED`, `SCHEDULED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`, `DISPUTED`)

- **`WorkOrder`**:
  - `id`: UUID
  - `workOrderReference`: String (Unique, e.g. `WO-2026-XXXXX`)
  - `bookingId`: Foreign Key -> `Booking.id` (1:1)
  - `status`: `WorkOrderStatus` enum (`DRAFT`, `ISSUED`, `IN_PROGRESS`, `PENDING_CUSTOMER_APPROVAL`, `COMPLETED`, `CANCELLED`)

---

### 5. Financial & Wallet Ledger Layer (`payment_orders`, `wallet_accounts`, `wallet_ledger_entries`, `payout_requests`)
- **`PaymentOrder`**:
  - `id`: UUID, `orderReference`: String (Unique)
  - `grossAmount`: Decimal, `commissionAmount`: Decimal, `netProviderAmount`: Decimal
  - `status`: `PaymentOrderStatus` enum (`PENDING`, `AUTHORIZED`, `PAID`, `REFUNDED`, `CANCELLED`)
- **`WalletAccount`**:
  - `id`: UUID, `userId`: Foreign Key -> `User.id` (1:1)
  - `availableBalance`: Decimal, `pendingBalance`: Decimal, `totalEarned`: Decimal
- **`WalletLedgerEntry`**:
  - Single-entry immutable financial ledger recording `CREDIT`, `DEBIT`, `COMMISSION`, `REFUND`, `PAYOUT`.
- **`PayoutRequest`**:
  - `id`: UUID, `providerId`: Foreign Key -> `User.id`
  - `amount`: Decimal, `paymentMethod`: Enum (`ONLINE_BKASH`, `ONLINE_NAGAD`, `BANK_TRANSFER`)
  - `status`: `PayoutStatus` enum (`PENDING`, `APPROVED`, `PROCESSING`, `PAID`, `REJECTED`)

---

### 6. Audit & Governance Layer (`audit_logs`, `feature_flags`)
- **`AuditLog`**:
  - `id`: UUID, `userId`: Foreign Key -> `User.id`?
  - `action`: String (e.g., `USER_STATUS_UPDATED`, `PROVIDER_VERIFIED`, `PAYOUT_APPROVED`)
  - `entityType`: String, `entityId`: String?
  - `metadata`: Json?
  - `createdAt`: DateTime
