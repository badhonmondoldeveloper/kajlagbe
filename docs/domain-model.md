# KajLagbe Domain Model & Boundaries Specification

## Domain Overview
The **KAJLAGBE (কাজ লাগবে)** marketplace architecture is organized into 22 distinct domain boundaries mapped to the 46 Prisma PostgreSQL models and NestJS API services.

---

## 22 Domain Boundaries & Implementation Matrix

| # | Domain Boundary | Primary Entities | Current Status | Target Module |
| :- | :--- | :--- | :--- | :--- |
| 1 | **Users & Identity** | `User` | `IMPLEMENTED` | Module 10 |
| 2 | **Profiles & KYC** | `UserProfile`, `CustomerProfile`, `ProviderProfile`, `BusinessProfile` | `IMPLEMENTED` | Module 10 / 13 |
| 3 | **Roles & Permissions** | `Role`, `Permission`, `UserRole`, `RolePermission` | `IMPLEMENTED` | Module 10 / 11 |
| 4 | **Service Categories** | `ProviderService`, `BusinessService` | `IMPLEMENTED` | Module 11 |
| 5 | **Subservices** | Category & service JSON metadata | `PARTIALLY_IMPLEMENTED` | Module 11 / 19 |
| 6 | **Provider Services** | `ProviderService`, `BusinessService` | `IMPLEMENTED` | Module 13 |
| 7 | **Provider Pricing** | `PricingType` enum, price decimal fields | `IMPLEMENTED` | Module 13 |
| 8 | **Geographic Hierarchy** | `Division`, `District`, `Upazila` | `IMPLEMENTED` | Module 11 / 19 |
| 9 | **Provider Service Areas** | `BusinessLocation`, Provider area fields | `PARTIALLY_IMPLEMENTED` | Module 13 / 19 |
| 10 | **Availability** | `ProviderAvailability` | `IMPLEMENTED` | Module 13 |
| 11 | **Working Schedules** | `BookingSchedule`, `BookingRescheduleRequest` | `PARTIALLY_IMPLEMENTED` | Module 12 / 13 |
| 12 | **Jobs** | `Job`, `JobStatusHistory`, `SavedJob` | `IMPLEMENTED` | Module 12 |
| 13 | **Job Applications** | `JobApplication` | `IMPLEMENTED` | Module 12 / 13 |
| 14 | **Bookings** | `Booking`, `BookingCancellation`, `BookingStatusHistory` | `IMPLEMENTED` | Module 12 |
| 15 | **Work Orders** | `WorkOrder`, `WorkOrderStatusHistory`, `ServiceProgressUpdate` | `IMPLEMENTED` | Module 12 / 13 |
| 16 | **Notifications Foundation** | `Notification` | `IMPLEMENTED` | Module 15 |
| 17 | **Payment Architecture** | `PaymentOrder`, `PaymentAttempt` | `DATABASE_ONLY` | Module 16 (`FUTURE_MODULE`) |
| 18 | **Wallet & Ledger** | `WalletAccount`, `WalletLedgerEntry`, `PayoutRequest` | `DATABASE_ONLY` | Module 16 (`FUTURE_MODULE`) |
| 19 | **Reviews Foundation** | Rating fields in profile/bookings | `DATABASE_ONLY` | Module 18 (`FUTURE_MODULE`) |
| 20 | **Disputes Foundation** | `DISPUTED` enum in `BookingStatus` | `DATABASE_ONLY` | Module 18 (`FUTURE_MODULE`) |
| 21 | **Audit Logging** | `AuditLog`, `UserActivity` | `IMPLEMENTED` | Module 11 |
| 22 | **Trust & Safety** | NID verification fields in `UserProfile` | `PARTIALLY_IMPLEMENTED` | Module 17 (`FUTURE_MODULE`) |

---

## Domain Relationship Mapping

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                       KAJLAGBE MARKETPLACE BOUNDARY MAP                        │
├───────────────────┬───────────────────┬───────────────────┬────────────────────┤
│ 1. Identity & Auth│ 2. Profiles & KYC │ 3. Roles & RBAC   │ 4. Service Taxonomy│
├───────────────────┼───────────────────┼───────────────────┼────────────────────┤
│ 5. Subservices    │ 6. Provider Serv. │ 7. Pricing        │ 8. Geography       │
├───────────────────┼───────────────────┼───────────────────┼────────────────────┤
│ 9. Service Areas  │ 10. Availability  │ 11. Schedules     │ 12. Jobs           │
├───────────────────┼───────────────────┼───────────────────┼────────────────────┤
│ 13. Applications  │ 14. Bookings      │ 15. Work Orders   │ 16. Notifications  │
├───────────────────┼───────────────────┼───────────────────┼────────────────────┤
│ 17. Payment Arch. │ 18. Wallet Ledger │ 19. Reviews Arch. │ 20. Disputes Arch. │
├───────────────────┴───────────────────┴───────────────────┴────────────────────┤
│ 21. Audit Logging                      │ 22. Trust & Safety                    │
└────────────────────────────────────────┴────────────────────────────────────────┘
```
