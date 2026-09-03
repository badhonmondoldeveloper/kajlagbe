# Module 10 — Authentication, Account Security & User Session Master System Implementation Plan

## Executive Summary
This document defines the architectural implementation plan for **MODULE 10** of **KAJLAGBE (কাজ লাগবে)**. It establishes a production-grade, real working authentication system leveraging Supabase Auth for credential handling and PostgreSQL (Prisma) for application profile management, authorization, role enforcement, and session persistence.

---

## 1. Authentication Architecture & Data Mapping

```
Supabase Auth (Credential Authentication, JWT, OAuth)
                     │
                     ▼ (Mapped via authUser.id)
PostgreSQL Application User (prisma.user)
                     ├── UserProfile (firstName, lastName, avatarUrl)
                     ├── CustomerProfile / ProviderProfile / BusinessProfile
                     └── UserRole (CUSTOMER, INDIVIDUAL_PROVIDER, BUSINESS, ADMIN)
```

- **Credential Security**: Passwords are owned strictly by Supabase Auth and NEVER stored in Prisma application tables.
- **Account Provisioning Consistency**: When a user registers or logs in, `fetchProfile()` checks database record presence. If missing due to network interruption during signup, an automatic recovery sync provisions the `User` and role profile gracefully.

---

## 2. Centralized Redirect Sanitization Helper

##### [NEW] [redirect.ts](file:///home/badhondev/Documents/kaj%20lagbe/packages/utils/src/redirect.ts)
```ts
export function sanitizeRedirectPath(path?: string | null, fallback = '/dashboard'): string {
  if (!path || typeof path !== 'string') return fallback;
  const trimmed = path.trim();
  if (trimmed.startsWith('/') && !trimmed.startsWith('//') && !trimmed.includes('\\')) {
    return trimmed;
  }
  return fallback;
}
```
- Used centrally across `login/page.tsx`, `auth/callback/route.ts`, and Next.js middleware.

---

## 3. Role-Based Redirect Matrix

| Role | Onboarding Status | Destination Route |
| :--- | :--- | :--- |
| **CUSTOMER** | `COMPLETED` | `/dashboard` |
| **CUSTOMER** | `NOT_STARTED` / `IN_PROGRESS` | `/onboarding/customer` |
| **INDIVIDUAL_PROVIDER** | `COMPLETED` | `/provider/dashboard` |
| **INDIVIDUAL_PROVIDER** | `NOT_STARTED` / `IN_PROGRESS` | `/onboarding/provider` |
| **BUSINESS** | `COMPLETED` | `/provider/dashboard` |
| **BUSINESS** | `NOT_STARTED` / `IN_PROGRESS` | `/onboarding/business` |
| **ADMIN** / **SUPER_ADMIN** | Any | `/admin` |

---

## 4. 3-Step Registration System (`/signup`)
1. **Step 1 — Role Selection (`/signup`)**: Selection between Customer, Provider, and Business. Public registration of privileged roles (`ADMIN`, `SUPER_ADMIN`) is blocked.
2. **Step 2 — Basic Information (`/signup/[role]`)**: Full Name, Email, Password, Confirm Password.
3. **Step 3 — Legal Terms Acceptance**: Unchecked mandatory terms & privacy checkboxes recorded at submission time.

---

## 5. Password Reset Architecture (`/forgot-password` & `/reset-password`)
1. **Forgot Password (`/forgot-password`)**: Submits email to `supabase.auth.resetPasswordForEmail()` with safe redirect URL to `${origin}/reset-password`. Shows generic success state to prevent account enumeration.
2. **Reset Password (`/reset-password`)**: Checks active Supabase recovery session. If session is valid, allows password update (`supabase.auth.updateUser()`) and redirects to `/login`. If session is expired, displays expired token error with action to request new link.

---

## 6. Dedicated Account Security Portal (`/account`)

##### [NEW] [account/page.tsx](file:///home/badhondev/Documents/kaj%20lagbe/apps/web/src/app/account/page.tsx)
- **Profile Tab**: Name, email display, avatar, phone display.
- **Security Tab**: Change password form (`updateUser()`), session info, email/phone verification badges.
- **Onboarding Tab**: Account role, onboarding status badge, and CTA to complete onboarding if pending.
- **Sign Out**: Secure `signOut()` action clearing local cookies and returning to `/login`.

---

## 7. Verification & Quality Checklist
- `pnpm db:generate`
- `pnpm typecheck` (0 errors across all 7 monorepo packages)
- `pnpm lint`
- `pnpm build`
