# KajLagbe Multi-Role Dashboard System (Module 05)

## 1. Executive Summary

Module 05 establishes a tailored, mobile-first multi-role dashboard architecture for **KajLagbe**. Instead of a generic single-dashboard template, each platform participant experiences a purpose-built workspace aligned with their daily workflow and operational requirements.

---

## 2. Role Dashboard Matrix

| Role | Primary Route | Core Focus & Features |
| :--- | :--- | :--- |
| `CUSTOMER` | `/customer/dashboard` | Service discovery, custom job posting, booking overview, saved provider bookmarks, activity feed, privacy-aware profile editing. |
| `INDIVIDUAL_PROVIDER` | `/provider/dashboard` | Live Job Radar, availability switcher (*Available*, *Busy*, *Away*), service & starting rate catalog, portfolio projects, performance & review analytics. |
| `BUSINESS` | `/business/dashboard` | Corporate maintenance overview, team technician management, service catalog & pricing packages, branch offices, B2B analytics. |
| `ADMIN` / `SUPER_ADMIN` | `/admin` | Operational command center, system parameters, verification queues, and audit logs. |
| `SUPPORT` | `/support` | Customer & technician support ticket queue, dispute mediation. |
| `MODERATOR` | `/moderator` | Identity document audits, NID & trade license verification queues. |

---

## 3. Route Architecture & Smart Redirection

### Central Smart Router
When an authenticated user requests `/dashboard`:
- Resolves the authorized role on the server/session.
- Redirects immediately to `/customer/dashboard`, `/provider/dashboard`, `/business/dashboard`, or `/admin`.

### Dashboard Route Map
- **Customer**: `/customer/dashboard`, `/customer/profile`, `/customer/saved`, `/customer/activity`, `/customer/settings`
- **Provider**: `/provider/dashboard`, `/provider/profile`, `/provider/services`, `/provider/portfolio`, `/provider/availability`, `/provider/reviews`, `/provider/performance`, `/provider/earnings`, `/provider/settings`
- **Business**: `/business/dashboard`, `/business/profile`, `/business/services`, `/business/team`, `/business/locations`, `/business/analytics`, `/business/settings`
- **Shared Hubs**: `/notifications`, `/account/profile`, `/account/settings`, `/settings/security`

---

## 4. Reusable Dashboard UI System

Located in `apps/web/src/components/dashboard/`:
- **`DashboardLayout`**: Master layout with fixed collapsible sidebar on desktop, top header, content container, and mobile bottom bar.
- **`DashboardSidebar`**: Role-adaptive navigation with active route highlights, user identity chip, security center link, and logout.
- **`DashboardHeader`**: Time-aware greeting, search trigger, quick actions, and notification badge indicator.
- **`DashboardMobileNav`**: Touch-friendly bottom navigation bar custom-tailored for each role.
- **`DashboardStatCard`**: Stat metric card with icon, label, value, and change indicators.
- **`DashboardEmptyState`**: Truthful, non-fabricated empty state with actionable CTAs.
- **`ProfileCompletionCard`**: Progress bar with missing fields checklist and direct links.
- **`DashboardStatusBanner`**: Account verification banner (`PENDING_REVIEW`, `PENDING_EMAIL_VERIFICATION`).
- **`DashboardActivityFeed`**: Account activity timeline.

---

## 5. Data & API Architecture

### Extended Prisma Models
- `Notification`: In-app notification queue (`ACCOUNT`, `SECURITY`, `BOOKING`, `JOB`, `MESSAGE`, `PAYMENT`, `SYSTEM`).
- `UserActivity`: Audit events (`PROFILE_UPDATED`, `SERVICE_ADDED`, `AVAILABILITY_CHANGED`, `SECURITY_EVENT`).
- `ProviderService`: Provider services with pricing types (`fixed`, `hourly`, `starting_from`).
- `ProviderPortfolio`: Past verified projects and image showcase.
- `ProviderAvailability`: Real-time technician availability and working hours note.
- `BusinessService`: Agency service packages and pricing models.
- `BusinessLocation`: Multi-branch office hubs and service locations.
- `BusinessTeamMember`: Field technicians and managers with contact information.
- `SavedProvider`: Customer bookmarked providers.

### Backend Endpoints (`DashboardController` @ `/api/v1/dashboard/*`)
- `GET /stats/customer`, `GET /stats/provider`, `GET /stats/business`
- `GET /notifications`, `PATCH /notifications/:id/read`, `POST /notifications/mark-all-read`
- `GET /activity`
- `GET/POST/DELETE /saved-providers`
- `GET/POST/DELETE /provider/services`, `GET/PUT /provider/availability`, `GET/POST/DELETE /provider/portfolio`
- `GET/POST/DELETE /business/services`, `GET/POST/DELETE /business/locations`, `GET/POST/DELETE /business/team`

---

## 6. Truthful Analytics & Empty States

In compliance with platform guidelines, no fake marketplace bookings, wallets, or earnings are generated:
- Financial sections display truthful balances (`৳ ০.০০`) with clear indicators that transaction data will populate automatically upon service completion and escrow release.
- Unfilled sections display meaningful empty states with direct guidance on how to populate them.

