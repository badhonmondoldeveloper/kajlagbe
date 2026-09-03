# KajLagbe Development Roadmap

This document defines the 12-module roadmap to construct the full KajLagbe platform.

---

### MODULE 01 — Foundation (Current)
- Monorepo setup with Turborepo and pnpm workspaces
- Shared packages: `config`, `types`, `utils`, `database`, `ui`
- NestJS API foundation with 30+ modular domains, health check, global filters & interceptors
- PostgreSQL Prisma ORM schema with User, Profile, RBAC, Bangladesh hierarchy, settings, feature flags, audit logs
- Next.js web application shell with App Router, route groups, and placeholder architecture
- GitHub Actions CI workflow

---

### MODULE 02 — Premium Design System
- Full branding & UI kit with Tailwind CSS & shadcn/ui
- Bengali & English typography (Hind Siliguri / Inter)
- Theme system (light/dark mode support)
- Mobile-first responsive navigation bar and mobile bottom navigation drawer
- Form components, dialogs, dropdowns, data tables, file upload dropzones

---

### MODULE 03 — Public Website
- Hero section with quick service search & location selector (Dhaka, Chittagong, etc.)
- Top categories catalog & featured popular services
- How It Works walkthrough for customers and service providers
- Testimonials, verified badges, trust & safety guarantees
- Public service directory with faceted filters (price, rating, location)
- Public provider profile view & public custom jobs board

---

### MODULE 04 — Authentication & Multi-Role Onboarding
- JWT access and refresh token rotation architecture
- Phone OTP authentication (Bangladeshi SMS Gateway integration)
- Google OAuth & Email/Password sign in
- Role-specific onboarding:
  - Customer profile setup
  - Individual provider skill & equipment registration
  - Service company registration with trade license & tax certificate upload

---

### MODULE 05 — Provider System & KYC Engine
- Provider console with real-time job radar
- National ID (NID) & trade license verification workflow with OCR / manual review
- Service catalog creator with custom pricing and add-ons
- Working zones / coverage radius selection (Division > District > Upazila)
- Provider portfolio gallery and verified badge display
- Subscription management & bidding credits balance

---

### MODULE 06 — Customer Dashboard
- Unified booking management (Pending, Accepted, In-Progress, Completed, Cancelled)
- Custom job request creator (budget, location, photos, urgency)
- Provider comparison & quotation acceptance
- Live tracking of assigned technician arrival
- Service reviews, 5-star ratings, and tipping

---

### MODULE 07 — Job & Booking Engine
- On-demand instant booking engine vs scheduled booking engine
- Custom job tender bidding system (providers submit quotes with itemized labor & materials)
- Rescheduling, cancellation, and refund state machines
- Technician dispatch and company team assignment system

---

### MODULE 08 — Messaging, Notifications & Real-Time
- Real-time in-app chat with image/attachment sharing (WebSockets / Socket.IO)
- Push notifications for web and mobile (Firebase Cloud Messaging)
- SMS alerts for critical events (Booking confirmed, Provider arrived, OTP)
- Email notifications for invoices and receipts

---

### MODULE 09 — Revenue Engine & Payments
- Payment gateway integration for Bangladesh: bKash, Nagad, Rocket, Upay, Visa/Mastercard (SSLCommerz / Shurjopay)
- Escrow payment hold until service completion & customer sign-off
- Platform commission deduction engine
- Provider payout withdrawal requests & finance approval queue
- Double-entry ledger for accounting integrity

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

