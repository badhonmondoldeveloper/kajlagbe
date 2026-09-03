# KajLagbe Module 11 — Super Admin Master Control, Operations & Platform Management System

## Overview
Module 11 introduces a production-ready, highly secure, scalable Admin Master Control System for **KAJLAGBE (কাজ লাগবে)**. It equips platform administrators with real-time operational monitoring, user & provider governance, marketplace job moderation, finance payout approvals, system feature flag toggles, and immutable audit logging.

---

## 4-Layer Admin Security Architecture

```
1. Client UI Visibility Guard  ──> Only renders for ADMIN / SUPER_ADMIN roles
2. Route Middleware Guard    ──> Protected routes /admin automatically redirect unauthorized users
3. Server API Guard           ──> @Roles('ADMIN', 'SUPER_ADMIN') enforces 403 Forbidden on API endpoints
4. Audit Log System           ──> Immutable recording of every administrative mutation
```

---

## Key Operational Subsystems

### 1. Operational KPI Dashboard (`/admin`)
- Aggregates live PostgreSQL database metrics (`User`, `ProviderProfile`, `Job`, `Booking`, `PayoutRequest`).
- Zero-states displayed honestly when no data exists.

### 2. User Directory & Account Management (`/admin/users`)
- Real-time directory with search, role filters, status updates (`ACTIVE`, `SUSPENDED`, `RESTRICTED`), and audit logging.

### 3. Provider Verification Center (`/admin/providers`)
- KYC document review queue supporting `APPROVED`, `REJECTED`, or `SUSPENDED` actions with mandatory audit records.

### 4. Finance Control & Payout Approvals (`/admin/payouts`)
- Integrated with Module 09 single-entry wallet ledger to approve or reject provider withdrawal requests with masked account display (`017****1234`).

### 5. Feature Flags & Immutable Audit Trail (`/admin/feature-flags` & `/admin/audit-logs`)
- Dynamic feature toggles (`CHAT_ENABLED`, `PAYMENT_ENABLED`, `PROVIDER_REGISTRATION_ENABLED`, `MAINTENANCE_MODE`) and an unalterable audit log browser.
