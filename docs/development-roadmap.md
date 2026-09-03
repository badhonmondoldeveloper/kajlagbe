# KajLagbe Development Roadmap

This document defines the 12-module roadmap to construct the full KajLagbe platform.

---

### MODULE 01 — Foundation (Completed)
- Monorepo setup with Turborepo and pnpm workspaces
- Shared packages: `config`, `types`, `utils`, `database`, `ui`
- NestJS API foundation with 30+ modular domains, health check, global filters & interceptors
- PostgreSQL Prisma ORM schema with User, Profile, RBAC, Bangladesh hierarchy, settings, feature flags, audit logs
- Next.js web application shell with App Router, route groups, and placeholder architecture
- GitHub Actions CI workflow

---

### MODULE 02 — Premium Design System (Completed)
- Full branding & UI kit with Tailwind CSS & shadcn/ui
- Bengali & English typography (Hind Siliguri / Inter)
- Theme system (light/dark mode support)
- Mobile-first responsive navigation bar and mobile bottom navigation drawer
- Form components, dialogs, dropdowns, data tables, file upload dropzones

---

### MODULE 03 — Public Website (Completed)
- Master Homepage with smart service search & location selector (Dhaka, Chattogram, Sylhet, etc.)
- Top categories catalog & featured popular services with subservice breakdown
- How It Works walkthrough for customers and service providers
- Testimonials, verified badges, trust & safety guarantees
- Public service directory with faceted filters (price, rating, location)
- Public provider profile view with portfolio & customer reviews
- Public live jobs board & job details view
- Marketing & trust pages: `/for-providers`, `/for-businesses`, `/pricing`, `/safety`, `/help`, `/about`, `/contact`, `/blog`

---

### MODULE 04 — Authentication & Multi-Role Onboarding (Completed)
- Supabase Auth integration with secure HTTP-only cookies and token rotation via `@supabase/ssr`
- Prisma database models: `CustomerProfile`, `ProviderProfile`, `BusinessProfile`, `OnboardingStatus`
- Bangladeshi phone normalization (`normalizeBangladeshiPhone`) and OTP abstraction
- Role enforcement: Public registration strictly limited to `CUSTOMER`, `INDIVIDUAL_PROVIDER`, `BUSINESS`
- Complete Auth Routes: `/login`, `/signup`, `/signup/customer`, `/signup/provider`, `/signup/business`, `/forgot-password`, `/reset-password`, `/verify-email`, `/auth/callback`, `/logout`, `/account-pending`
- Progressive Onboarding: `/onboarding/customer`, `/onboarding/provider`, `/onboarding/business`
- Account Security Center Foundation: `/settings/security` (password change, active sessions, audit activity)
- NestJS JWT authorization guard (`SupabaseAuthGuard`), `RolesGuard`, and `AuthService` sync endpoints

---

### MODULE 05 — Complete Multi-Role Dashboard System (Completed)
- Central Smart Role Router: `/dashboard` with authorized role resolution
- Dedicated Workspaces:
  - Customer Portal: `/customer/dashboard`, `/customer/profile`, `/customer/saved`, `/customer/activity`, `/customer/settings`
  - Individual Provider Console: `/provider/dashboard`, `/provider/profile`, `/provider/services`, `/provider/portfolio`, `/provider/availability`, `/provider/reviews`, `/provider/performance`, `/provider/earnings`, `/provider/settings`
  - Business Agency Console: `/business/dashboard`, `/business/profile`, `/business/services`, `/business/team`, `/business/locations`, `/business/analytics`, `/business/settings`
  - Shared Hubs & Protected Placeholders: `/notifications`, `/account/*`, `/support`, `/moderator`
- Extended Prisma Schema: `Notification`, `UserActivity`, `ProviderService`, `ProviderPortfolio`, `ProviderAvailability`, `BusinessService`, `BusinessLocation`, `BusinessTeamMember`, `SavedProvider`
- NestJS `DashboardModule` with endpoints for stats, notifications, activity feeds, provider services, availability, and business teams with strict ownership enforcement
- Shared Dashboard UI System: `DashboardLayout`, `DashboardSidebar`, `DashboardHeader`, `DashboardMobileNav`, `DashboardStatCard`, `DashboardEmptyState`, `ProfileCompletionCard`, `DashboardStatusBanner`

---

### MODULE 06 — Advanced Job Posting & Service Request Marketplace (Completed)
- 7-Step Multi-Step Job Creator: `/post-job` with category, requirements, safe public area, protected private address, budget ranges, urgency, and draft saving
- Customer Job Command Center: `/customer/jobs` and `/customer/jobs/[id]` with status tabs, application inbox, quote comparison matrix, double-confirmation provider selection, and audit timeline
- Provider Job Discovery Console: `/provider/jobs` and `/provider/jobs/[id]` with real-time job radar, category/location filters, proposal & price quote submissions, and job bookmarking
- Provider Applications Manager: `/provider/applications` and `/provider/applications/[id]` with lifecycle tracking (SUBMITTED, SHORTLISTED, ACCEPTED, REJECTED, WITHDRAWN) and withdrawal action
- Public Job Board & Single View: `/jobs` and `/jobs/[id]` with privacy-aware customer protection
- Extended Prisma Schema: `Job`, `JobApplication`, `JobStatusHistory`, `SavedJob` with atomic state transitions
- NestJS API Modules: `JobsModule` and `ApplicationsModule` with concurrency protection, state machine validation, and ownership enforcement


---

### MODULE 07 — Advanced Booking, Work Order & Service Management System (Completed)
- Atomic Booking Creation: Automatically converts selected job applications into structured Bookings (`BK-2026-XXXX`)
- Provider Availability Confirmation: Transitions booking to `CONFIRMED`, unlocks private customer location (`LOCATION_REVEALED`), and auto-creates Work Order (`WO-2026-XXXX`)
- Controlled Location Privacy: Hides private customer address (`LOCATION_HIDDEN`) until booking confirmation
- Service Execution Controls: Provider starts work (`IN_PROGRESS`), posts real-time progress updates, and marks work completed (`COMPLETED_BY_PROVIDER`)
- Customer Completion Confirmation: Customer reviews work, confirms completion (`CONFIRMED_BY_CUSTOMER` -> `CLOSED` & Booking -> `COMPLETED`), writing audit & activity records
- Reschedule & Cancellation Workflows: Structured reschedule requests between customer & provider with status tracking and reason-based cancellations
- Customer & Provider Portals: `/customer/bookings`, `/customer/bookings/[id]`, `/provider/bookings`, `/provider/bookings/[id]`, `/provider/schedule`
- Extended Prisma Schema: `Booking`, `WorkOrder`, `BookingSchedule`, `BookingRescheduleRequest`, `BookingCancellation`, `BookingStatusHistory`, `WorkOrderStatusHistory`, `ServiceProgressUpdate`
- NestJS API Modules: `BookingsModule` and `WorkOrdersModule` with `BookingStatusTransitionService` state machine validation

---

### MODULE 08 — Advanced Communication & Chat System (Completed)
- Context-Aware Conversations: Initiates chat between Customer, Provider, and Business based on authorized marketplace context (`DIRECT`, `JOB_APPLICATION`, `BOOKING`, `WORK_ORDER`)
- Real-Time Messaging: Integrated NestJS WebSocket / Supabase Realtime event streaming for instant message delivery and unread badges
- Database-Backed Security: Participant membership & relationship checks strictly enforced server-side
- Mobile-First Chat UI: Searchable Inbox (`/messages`) and Chat Window (`/messages/[id]`) with system message pills, attachment support, and touch-friendly composer
- Extended Prisma Schema: `Conversation`, `ConversationParticipant`, `Message`, `MessageAttachment`

---

### MODULE 09 — Payment, Wallet, Commission & Revenue Engine (Completed)
- Financial Architecture: `PaymentOrder` (`ORDER-2026-XXXX`), `PaymentAttempt`, `PlatformCommissionConfig`, `WalletAccount`, `WalletLedgerEntry`
- Bangladesh Payment Adapter: Provider-agnostic gateway architecture for bKash, Nagad, Cards
- Server-Side Verification: Idempotent payment verification and webhook signature validation to prevent duplicate transactions
- Platform Commission Engine: Dynamic percentage/fixed fee calculations with rule snapshotting at order creation
- Double-Entry Append-Only Wallet Ledger: Tracks available balance, pending balance, and net provider earnings
- Customer & Provider Portals: Customer Payments (`/customer/payments`), Provider Earnings (`/provider/earnings`), Provider Payout Requests (`/provider/payouts`)

---

### MODULE 10 — Admin Command Center
- Comprehensive operational dashboards and KPI cards (GMV, active jobs, take rate)
- Verification Officer queue for KYC document reviews
- Dispute mediation and refund arbitration panel
- Dynamic CMS manager for banners, promo codes, and blog articles
- Feature flag management with live percentage rollout controls
- Immutable audit log browser

---

### MODULE 11 — Security & Testing
- Automated unit tests, integration tests, and Playwright E2E suites
- OWASP Top 10 security audit and SQL injection / XSS prevention
- Rate limiting on SMS OTP and sensitive endpoints
- Database automated backup scripts and disaster recovery drill

---

### MODULE 12 — Production Deployment & DevOps
- Docker containerization for Next.js web and NestJS API
- Kubernetes / Docker Compose deployment configurations
- PostgreSQL connection pooling (PgBouncer) & Redis cluster caching
- S3 / Cloudflare R2 object storage for uploads
- CDN configuration and performance optimization
