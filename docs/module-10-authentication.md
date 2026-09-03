# KajLagbe Module 10 — Real Working Authentication & Security Master System

## Overview
Module 10 establishes a production-grade authentication, account security, and session management system for **KAJLAGBE (কাজ লাগবে)**. It unifies Supabase Auth for credential handling and OAuth with PostgreSQL (Prisma) for application profile management, role enforcement, and session persistence.

---

## System Architecture

```
User Action (Login / Register / OAuth)
                  │
Supabase Auth (@supabase/ssr)
 ├── Credential Validation & JWT Session Issue
 └── Passwords owned strictly by Supabase Auth (NEVER stored in Prisma)
                  │
PostgreSQL Application User (prisma.user)
 ├── Profile Sync (UserProfile, CustomerProfile, ProviderProfile, BusinessProfile)
 ├── Role Assignment (CUSTOMER, INDIVIDUAL_PROVIDER, BUSINESS, ADMIN)
 └── Onboarding Status (NOT_STARTED, IN_PROGRESS, COMPLETED)
```

---

## Key Features & Security Protections

### 1. Centralized Open Redirect Protection
- **Helper**: `sanitizeRedirectPath(path?: string | null, fallback = '/dashboard'): string` in `@kajlagbe/utils`.
- **Protection**: Enforces relative internal routes starting with `/` (disallowing `//` protocol-relative open redirect attacks).

### 2. Database Profile Synchronization & Fallback Provisioning
- Automatically provisions PostgreSQL `User` and role profile records (`UserProfile`, `CustomerProfile`, `ProviderProfile`, `BusinessProfile`) upon signup/login.
- Guarantees transaction consistency (if Supabase Auth user exists without PostgreSQL profile, recovery sync provisions it seamlessly).

### 3. Role-Based Access Control & Routing
- **Customer**: `/dashboard` (or `/onboarding/customer` if pending)
- **Individual Provider**: `/provider/dashboard` (or `/onboarding/provider` if pending)
- **Service Business**: `/provider/dashboard` (or `/onboarding/business` if pending)
- **Admin**: `/admin`
- Public registration of privileged roles (`ADMIN`, `SUPER_ADMIN`) is blocked.

### 4. Password Recovery System
- `/forgot-password`: Submits email request to `supabase.auth.resetPasswordForEmail()`. Renders generic Bengali message to prevent email enumeration.
- `/reset-password`: Validates active recovery session, updates password via `supabase.auth.updateUser()`, and redirects to `/login`.

### 5. Dedicated Account Portal (`/account`)
- Profile details management, Security controls (password change, verification badges), Onboarding state, and secure logout.
