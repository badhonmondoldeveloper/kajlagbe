# KajLagbe Database Architecture Specification

## Overview
This document specifies the PostgreSQL database schema architecture for **KAJLAGBE (কাজ লাগবে)** based on the exact 46 Prisma models and 23 enums in `packages/database/prisma/schema.prisma`.

---

## Core Schema Principles

1. **UUID Primary Keys**: All 46 entity tables use standard `@default(uuid())` string primary keys.
2. **Foreign Key Integrity**: Explicit cascading deletions (`onDelete: Cascade`) for child profile resources and restricted deletion (`onDelete: SetNull` / `onDelete: Restrict`) for financial, booking, and audit entities.
3. **Status Control Enums**: All lifecycle states are governed by 23 PostgreSQL enums (`UserStatus`, `ProfileStatus`, `VerificationStatus`, `JobStatus`, `BookingStatus`, `WorkOrderStatus`, `PaymentStatus`, `PayoutStatus`).
4. **Auditability**: Every administrative action, job status change, or booking update writes an entry to `AuditLog`, `JobStatusHistory`, `BookingStatusHistory`, or `WorkOrderStatusHistory`.

---

## Current Implementation vs Planned Future Architecture

### CURRENT IMPLEMENTATION (Active & Operational)
- **Identity & User Profiles**: `User`, `UserProfile`, `CustomerProfile`, `ProviderProfile`, `BusinessProfile`, `BusinessService`, `BusinessLocation`, `BusinessTeamMember`, `SavedProvider`, `UserActivity`, `Notification`
- **RBAC Authorization**: `Role`, `Permission`, `UserRole`, `RolePermission`
- **Geographic Hierarchy**: `Division`, `District`, `Upazila`
- **Governance & System Control**: `SystemSetting`, `FeatureFlag`, `AuditLog`
- **Provider Offerings & Availability**: `ProviderService`, `ProviderPortfolio`, `ProviderAvailability`
- **Marketplace Jobs & Applications**: `Job`, `JobApplication`, `JobStatusHistory`, `SavedJob`
- **Bookings & Work Orders**: `Booking`, `BookingSchedule`, `BookingRescheduleRequest`, `BookingCancellation`, `WorkOrder`, `BookingStatusHistory`, `WorkOrderStatusHistory`, `ServiceProgressUpdate`
- **Real-time Messaging**: `Conversation`, `ConversationParticipant`, `Message`, `MessageAttachment`
- **Platform Commission Config**: `PlatformCommissionConfig`

### PLANNED FUTURE ARCHITECTURE (Database Schema Ready, Logic in Module 16)
- **Escrow & Gateway Payments**: `PaymentOrder`, `PaymentAttempt` (Module 16)
- **Single-Entry Wallet & Ledger**: `WalletAccount`, `WalletLedgerEntry`, `PayoutRequest` (Module 16)

---

## Entity Relationship Summary (46 Models)

### 1. Identity & Profiles (11 Models)
`User` -> 1:1 `UserProfile`, 1:1 `CustomerProfile`, 1:1 `ProviderProfile`, 1:1 `BusinessProfile` -> `BusinessService`, `BusinessLocation`, `BusinessTeamMember`.

### 2. Authorization (4 Models)
`User` -> `UserRole` -> `Role` -> `RolePermission` -> `Permission`.

### 3. Geography (3 Models)
`Division` -> `District` -> `Upazila`.

### 4. Marketplace & Applications (4 Models)
`User` (Customer) -> `Job` -> `JobApplication` (Provider) -> `JobStatusHistory`, `SavedJob`.

### 5. Bookings & Execution (8 Models)
`Booking` -> `BookingSchedule`, `BookingRescheduleRequest`, `BookingCancellation`, `BookingStatusHistory`.
`Booking` -> 1:1 `WorkOrder` -> `WorkOrderStatusHistory`, `ServiceProgressUpdate`.

### 6. Communication (4 Models)
`Conversation` -> `ConversationParticipant`, `Message` -> `MessageAttachment`.

### 7. Governance & Auditing (3 Models)
`SystemSetting`, `FeatureFlag`, `AuditLog`.

### 8. Financial Engine (6 Models)
`PaymentOrder`, `PaymentAttempt`, `PlatformCommissionConfig`, `WalletAccount`, `WalletLedgerEntry`, `PayoutRequest`.
