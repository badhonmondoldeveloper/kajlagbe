# KajLagbe Authentication & Account Security Architecture (Module 04)

## 1. Executive Summary

Module 04 establishes a hardened, scalable, multi-role authentication and identity management foundation for the **KajLagbe** Bangladesh local service marketplace.

The authentication system combines:
1. **Supabase Auth**: Manages cryptographic password hashing (bcrypt/argon2), JWT token generation, session cookies, PKCE OAuth/email code exchanges, and token rotation.
2. **PostgreSQL + Prisma**: Stores rich platform profiles (`UserProfile`, `CustomerProfile`, `ProviderProfile`, `BusinessProfile`), RBAC assignments, onboarding progression, and immutable audit logs.
3. **NestJS API Auth Guards**: Server-side JWT authorization guards (`SupabaseAuthGuard`, `RolesGuard`, `PermissionsGuard`) enforcing security boundaries at the API layer.
4. **Next.js Middleware & SSR**: Handles session token refreshes, cookie management via `@supabase/ssr`, and protected route gating.

---

## 2. Multi-Role Registration Policy

### Public Self-Registration
The platform strictly allows public self-registration for only **three** user roles:
- `CUSTOMER`: Individuals hiring service professionals.
- `INDIVIDUAL_PROVIDER`: Independent skilled technicians and workers.
- `BUSINESS`: Service agencies, maintenance firms, and multi-technician companies.

```typescript
export const ALLOWED_PUBLIC_REGISTRATION_ROLES: RoleType[] = [
  RoleType.CUSTOMER,
  RoleType.INDIVIDUAL_PROVIDER,
  RoleType.BUSINESS,
];
```

### Privileged & Administrative Roles
Privileged roles cannot be self-registered or submitted via client payloads:
- `ADMIN` & `SUPER_ADMIN`
- `OPERATIONS_MANAGER`
- `FINANCE_ADMIN`
- `VERIFICATION_OFFICER`
- `SUPPORT_AGENT` / `SUPPORT`
- `MODERATOR`

Attempts to register with unauthorized roles are intercepted and rejected server-side by `AuthService.syncUser()` with a `403 Forbidden` exception and logged in `audit_logs`.

---

## 3. Bangladesh Phone & OTP Architecture

### Phone Normalization
All Bangladeshi phone inputs (e.g. `01712345678`, `+8801712345678`, `8801712345678`) are sanitized and validated using `normalizeBangladeshiPhone`:
- Verifies operator prefix: `013`, `014`, `015`, `016`, `017`, `018`, `019`.
- Normalizes to canonical format `+8801XXXXXXXXX` and local format `01XXXXXXXXX`.

### Transparent OTP Integration Status
- In development/configuration mode, the application does not claim fake OTP dispatch.
- `PhoneVerificationNotice` displays a transparent notice explaining where SMS gateways (SSL Wireless / Greenweb / Infobip / Supabase Phone Auth) will be configured in production.

---

## 4. Authentication & Onboarding Routes

| Route | Functionality |
| :--- | :--- |
| `/login` | Bilingual login form with email/phone identifier, password toggle, and role-based redirect. |
| `/signup` | Multi-role account type selector (Customer, Provider, Business). |
| `/signup/customer` | Customer registration form (Name, Email, Phone, Password, Agreement). |
| `/signup/provider` | Provider registration form (Name, Email, Phone, Category, Location, Password). |
| `/signup/business` | Business registration form (Rep Name, Company Name, Email, Phone, Category, Password). |
| `/forgot-password` | Password reset request with safe non-enumerating confirmation. |
| `/reset-password` | Secure password reset form with password strength meter. |
| `/verify-email` | Email verification instructions and resend mechanism. |
| `/auth/callback` | Next.js Route Handler for Supabase PKCE code exchange. |
| `/logout` | Session teardown and safe redirect. |
| `/account-pending` | Account under administrative review notification screen. |
| `/onboarding` | Dynamic role-based onboarding router. |
| `/onboarding/customer` | 3-step lightweight customer onboarding. |
| `/onboarding/provider` | 6-step progressive provider profile builder. |
| `/onboarding/business` | 6-step progressive business profile builder. |
| `/settings/security` | Account security center (password change, active session control, audit log). |

---

## 5. Security & Session Handling

- **HttpOnly Cookies**: Session tokens are synchronized and managed via `@supabase/ssr` to prevent XSS credential theft.
- **No Plaintext Passwords**: Password hashing is delegated to Supabase Auth.
- **Zero Exposed Secrets**: `SUPABASE_SECRET_KEY` and `DATABASE_URL` are strictly confined to backend execution environments.
- **Audit Logging**: Sensitive actions (`SIGNUP_SUCCESS`, `LOGIN_SUCCESS`, `ONBOARDING_COMPLETED`, `PROVIDER_ONBOARDING_SUBMITTED`, etc.) are recorded in the PostgreSQL `audit_logs` table with timestamp, IP address, and user agent metadata.

