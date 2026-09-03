# KajLagbe Module 11 — Real Architecture Audit & Inventory Report

## Executive Summary
This document presents an authoritative audit of the actual database architecture and domain models for **KAJLAGBE (কাজ লাগবে)**, based on inspecting `packages/database/prisma/schema.prisma` and NestJS API modules.

- **Total Prisma Models**: 46
- **Total PostgreSQL Enums**: 23
- **Primary Key Strategy**: UUID (`@default(uuid())`) across all 46 models
- **Timestamp Strategy**: Automated `createdAt @default(now())` and `updatedAt @updatedAt` across all mutable entities

---

## 46 Prisma Models Classification Audit

| # | Model Name | Category | Classification | Actual Implementation Details |
| :- | :--- | :--- | :--- | :--- |
| 1 | `User` | Identity & Auth | `IMPLEMENTED` | Primary account record linked to Supabase Auth (`id` = Supabase `auth.uid()`), status control (`UserStatus`), email/phone verification flags. |
| 2 | `UserProfile` | Identity & Profile | `IMPLEMENTED` | 1:1 cascade profile storing first/last name, avatar, bio, geographic IDs (`divisionId`, `districtId`, `upazilaId`), and `VerificationStatus`. |
| 3 | `CustomerProfile` | Identity & Profile | `IMPLEMENTED` | 1:1 profile storing location preferences, service interests, and notification permissions. |
| 4 | `ProviderProfile` | Provider Domain | `IMPLEMENTED` | 1:1 profile storing experience years, primary/secondary category arrays, bio, skills, services offered Json, and `ProfileStatus`. |
| 5 | `ProviderService` | Provider Domain | `IMPLEMENTED` | Provider-specific service offerings with `categorySlug`, `pricingType` (`fixed`, `hourly`, `starting_from`), and starting price. |
| 6 | `ProviderPortfolio` | Provider Domain | `IMPLEMENTED` | Portfolio project showcase with title, description, image gallery array, and project URL. |
| 7 | `ProviderAvailability` | Provider Availability | `IMPLEMENTED` | Weekly working days, hours, holiday dates, and instant booking toggle. |
| 8 | `BusinessProfile` | Agency & Company | `IMPLEMENTED` | Service company profile storing company name, trade license number, TIN, BIN, company size, and verification status. |
| 9 | `BusinessService` | Agency & Company | `IMPLEMENTED` | Corporate service catalog for business entities. |
| 10 | `BusinessLocation` | Agency & Company | `IMPLEMENTED` | Multi-branch location addresses across Bangladesh divisions. |
| 11 | `BusinessTeamMember` | Agency & Company | `PARTIALLY_IMPLEMENTED` | Team member staff records with company roles (`COMPANY_OWNER`, `COMPANY_MANAGER`, `TEAM_MEMBER`). |
| 12 | `SavedProvider` | Customer Domain | `IMPLEMENTED` | Customer bookmark list for favorite service providers. |
| 13 | `Notification` | System & Communication| `IMPLEMENTED` | In-app user notifications with `NotificationType` (`ACCOUNT`, `SECURITY`, `BOOKING`, `JOB`, `MESSAGE`, `PAYMENT`, `SYSTEM`). |
| 14 | `UserActivity` | System & Security | `IMPLEMENTED` | User activity audit log tracking profile changes, job creation, logins, and security events. |
| 15 | `Role` | RBAC Authorization | `IMPLEMENTED` | System roles (`SUPER_ADMIN`, `ADMIN`, `OPERATIONS_MANAGER`, `FINANCE_ADMIN`, `VERIFICATION_OFFICER`, `SUPPORT_AGENT`, `CUSTOMER`, `INDIVIDUAL_PROVIDER`, `COMPANY_OWNER`, `COMPANY_MANAGER`, `TEAM_MEMBER`). |
| 16 | `Permission` | RBAC Authorization | `IMPLEMENTED` | Granular system permissions (`users:read`, `users:write`, `providers:verify`, `payouts:approve`, etc.). |
| 17 | `UserRole` | RBAC Authorization | `IMPLEMENTED` | Many-to-many junction table mapping `User` to `Role`. |
| 18 | `RolePermission` | RBAC Authorization | `IMPLEMENTED` | Junction table mapping `Role` to `Permission`. |
| 19 | `Division` | Geography | `IMPLEMENTED` | 8 Divisions of Bangladesh (`DHAKA`, `CHITTAGONG`, `RAJSHAHI`, `KHULNA`, `BARISAL`, `SYLHET`, `RANGPUR`, `MYMENSINGH`). |
| 20 | `District` | Geography | `IMPLEMENTED` | 64 Districts of Bangladesh linked to Division. |
| 21 | `Upazila` | Geography | `IMPLEMENTED` | Upazilas of Bangladesh linked to District. |
| 22 | `SystemSetting` | Governance | `IMPLEMENTED` | Platform configuration settings (`PLATFORM_NAME`, `PLATFORM_CURRENCY`, `DEFAULT_COMMISSION_PERCENT`, `SUPPORT_EMAIL`). |
| 23 | `FeatureFlag` | Governance | `IMPLEMENTED` | Live feature toggle switches (`CHAT_ENABLED`, `PAYMENT_ENABLED`, `PROVIDER_REGISTRATION_ENABLED`, `MAINTENANCE_MODE`). |
| 24 | `AuditLog` | Governance & Security | `IMPLEMENTED` | Immutable admin audit log recording actor ID, action, entity type, entity ID, metadata, and timestamp. |
| 25 | `Job` | Marketplace Jobs | `IMPLEMENTED` | Customer posted jobs with title, description, category, budget bounds, area, urgency, and status lifecycle (`JobStatus`). |
| 26 | `JobApplication` | Marketplace Jobs | `IMPLEMENTED` | Bids submitted by providers containing proposed price, cover note, estimated days, and status (`SUBMITTED`, `SHORTLISTED`, `ACCEPTED`). |
| 27 | `JobStatusHistory` | Marketplace Jobs | `IMPLEMENTED` | Immutable audit log of job status state transitions. |
| 28 | `SavedJob` | Marketplace Jobs | `IMPLEMENTED` | Provider saved job listings bookmark table. |
| 29 | `Booking` | Bookings Domain | `IMPLEMENTED` | Accepted work agreement between customer and provider (`bookingReference`, agreed price, area, scheduled date/time, `BookingStatus`). |
| 30 | `BookingSchedule` | Bookings Domain | `IMPLEMENTED` | Proposed schedule slots and time flexibility notes. |
| 31 | `BookingRescheduleRequest` | Bookings Domain | `IMPLEMENTED` | Reschedule request negotiation between customer and provider. |
| 32 | `BookingCancellation` | Bookings Domain | `IMPLEMENTED` | Cancellation record storing reason category, note, and previous status. |
| 33 | `WorkOrder` | Work Orders Domain | `IMPLEMENTED` | Formal work execution order (1:1 with Booking) tracking completion evidence and customer confirmation. |
| 34 | `BookingStatusHistory` | Bookings Domain | `IMPLEMENTED` | Audit log of booking status transitions. |
| 35 | `WorkOrderStatusHistory` | Work Orders Domain | `IMPLEMENTED` | Audit log of work order status transitions. |
| 36 | `ServiceProgressUpdate` | Work Orders Domain | `IMPLEMENTED` | On-site photo and note progress updates submitted by provider during work. |
| 37 | `Conversation` | Messaging Domain | `IMPLEMENTED` | Chat thread isolated by context (`jobId`, `bookingId`, `workOrderId`, `supportTicketId`). |
| 38 | `ConversationParticipant` | Messaging Domain | `IMPLEMENTED` | Participant membership storing unread message count and last read timestamp. |
| 39 | `Message` | Messaging Domain | `IMPLEMENTED` | Individual chat message storing sender ID, message type, content, and read status. |
| 40 | `MessageAttachment` | Messaging Domain | `IMPLEMENTED` | Image/file attachment metadata linked to a message. |
| 41 | `PaymentOrder` | Financial & Escrow | `DATABASE_ONLY` | Payment order calculation model (`grossAmount`, `commissionAmount`, `netProviderAmount`). Gateway integration reserved for Module 16 (`FUTURE_MODULE`). |
| 42 | `PaymentAttempt` | Financial & Escrow | `DATABASE_ONLY` | Gateway transaction attempt log. Gateway webhooks reserved for Module 16 (`FUTURE_MODULE`). |
| 43 | `PlatformCommissionConfig` | Financial Engine | `IMPLEMENTED` | Admin configurable commission rules per service category. |
| 44 | `WalletAccount` | Wallet & Ledger | `DATABASE_ONLY` | Available balance, pending balance, and total earned. Financial payouts reserved for Module 16 (`FUTURE_MODULE`). |
| 45 | `WalletLedgerEntry` | Wallet & Ledger | `DATABASE_ONLY` | Single-entry immutable financial ledger (`CREDIT`, `DEBIT`, `COMMISSION`, `REFUND`, `PAYOUT`). |
| 46 | `PayoutRequest` | Wallet & Ledger | `PARTIALLY_IMPLEMENTED` | Provider withdrawal request queue (`ONLINE_BKASH`, `ONLINE_NAGAD`, `BANK_TRANSFER`) with Admin approval interface. |

---

## PostgreSQL Enums Inventory (23 Enums)
1. `UserStatus`: `ACTIVE`, `PENDING_EMAIL_VERIFICATION`, `PENDING_REVIEW`, `SUSPENDED`, `RESTRICTED`, `DEACTIVATED`, `INACTIVE`, `PENDING_VERIFICATION`
2. `OnboardingStatus`: `NOT_STARTED`, `IN_PROGRESS`, `COMPLETED`, `SKIPPED_OPTIONAL`, `PENDING_REVIEW`
3. `VerificationStatus`: `NOT_STARTED`, `PENDING`, `UNDER_REVIEW`, `APPROVED`, `REJECTED`
4. `ProfileStatus`: `DRAFT`, `PENDING_REVIEW`, `ACTIVE`, `SUSPENDED`, `REJECTED`
5. `NotificationType`: `ACCOUNT`, `SECURITY`, `BOOKING`, `JOB`, `MESSAGE`, `PAYMENT`, `SYSTEM`
6. `ActivityType`: `PROFILE_UPDATED`, `SERVICE_ADDED`, `AVAILABILITY_CHANGED`, `ACCOUNT_STATUS_CHANGED`, `BOOKING_CREATED`, `JOB_CREATED`, `PAYMENT_COMPLETED`, `SECURITY_EVENT`
7. `JobStatus`: `DRAFT`, `PUBLISHED`, `PAUSED`, `EXPIRED`, `UNDER_REVIEW`, `PROVIDER_SELECTED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`, `ARCHIVED`
8. `JobUrgency`: `FLEXIBLE`, `TODAY`, `URGENT`, `EMERGENCY_REQUEST`
9. `BudgetType`: `FIXED_BUDGET`, `BUDGET_RANGE`, `NEGOTIABLE`, `REQUEST_QUOTES`
10. `ApplicationStatus`: `DRAFT`, `SUBMITTED`, `VIEWED`, `SHORTLISTED`, `ACCEPTED`, `REJECTED`, `WITHDRAWN`
11. `PricingType`: `fixed`, `hourly`, `starting_from`
12. `BookingStatus`: `PENDING_CONFIRMATION`, `CONFIRMED`, `SCHEDULED`, `RESCHEDULE_REQUESTED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`, `DISPUTED_FUTURE`, `ARCHIVED`
13. `WorkOrderStatus`: `DRAFT`, `ISSUED`, `IN_PROGRESS`, `PENDING_CUSTOMER_APPROVAL`, `COMPLETED`, `CANCELLED`
14. `RescheduleStatus`: `PENDING`, `ACCEPTED`, `DECLINED`, `EXPIRED`
15. `CancellationReason`: `CUSTOMER_CANCELLED`, `PROVIDER_CANCELLED`, `SCHEDULE_CONFLICT`, `PRICE_DISAGREEMENT`, `SAFETY_CONCERN`, `SYSTEM_CANCELLED`
16. `LocationAccessState`: `LOCATION_HIDDEN`, `GENERAL_AREA_ONLY`, `FULL_ADDRESS_UNLOCKED`
17. `ConversationContextType`: `DIRECT`, `JOB_APPLICATION`, `BOOKING`, `WORK_ORDER`, `SUPPORT_TICKET`
18. `MessageType`: `TEXT`, `IMAGE`, `FILE`, `SYSTEM_EVENT`, `LOCATION`, `BOOKING_UPDATE`
19. `MessageStatus`: `SENT`, `DELIVERED`, `READ`, `FAILED`
20. `PaymentStatus`: `PENDING`, `AUTHORIZED`, `PAID`, `REFUNDED`, `FAILED`, `CANCELLED`
21. `PaymentMethod`: `ONLINE_BKASH`, `ONLINE_NAGAD`, `ONLINE_CARD`, `BANK_TRANSFER`, `CASH_AFTER_SERVICE`
22. `LedgerEntryType`: `CREDIT`, `DEBIT`, `COMMISSION`, `REFUND`, `PAYOUT`, `ADJUSTMENT`
23. `PayoutStatus`: `PENDING`, `APPROVED`, `PROCESSING`, `PAID`, `REJECTED`
