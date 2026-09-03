# KajLagbe System Architecture

## 1. System Overview

**KajLagbe** is architected as an API-first, mobile-responsive local service marketplace tailored specifically for the socio-economic context of Bangladesh. It connects consumers and businesses requiring on-demand/scheduled maintenance, repairs, renovations, and professional services with verified individual freelancers and registered service companies.

```
┌────────────────────────────────────────────────────────┐
│                   Clients Layer                        │
│   Next.js Web (App Router)   │   Future iOS/Android    │
└──────────────────────────┬─────────────────────────────┘
                           │ HTTPS / WSS
┌──────────────────────────▼─────────────────────────────┐
│                 API Gateway / NestJS                   │
│  - Helmet Security           - Rate Limiting           │
│  - Global Transform / Filter - Swagger OpenAPI Docs    │
│  - JWT Auth Guard            - RBAC & Permissions Guard│
└───────────┬───────────────────────────────┬────────────┘
            │                               │
┌───────────▼──────────┐         ┌──────────▼────────────┐
│   Modular Domains    │         │ Service Abstractions  │
│  - Auth & Users      │         │  - Redis Cache        │
│  - Locations (BD)    │         │  - Background Queue   │
│  - Jobs & Bookings   │         │  - Object Storage     │
│  - Payments & Ledger │         │  - Realtime Events    │
│  - KYC Verification  │         └───────────────────────┘
│  - 30+ Micro-Modules │
└───────────┬──────────┘
            │ Prisma ORM
┌───────────▼────────────────────────────────────────────┐
│              PostgreSQL Database Foundation            │
│  - Users, Profiles, Roles, Permissions                 │
│  - Bangladesh Hierarchy (Divisions, Districts, Upazilas)│
│  - System Settings, Feature Flags, Audit Logs          │
└────────────────────────────────────────────────────────┘
```

---

## 2. Monorepo Organization

The project uses [Turborepo](https://turbo.build/) with `pnpm` workspaces for high build caching efficiency, dependency sharing, and parallel execution.

### Applications (`apps/`)
- `apps/web`: Next.js with React 18, App Router, Tailwind CSS. Contains user dashboards, provider portal, admin control center, and public landing pages.
- `apps/api`: NestJS application providing unified REST API endpoints under `/api/v1/*` and OpenAPI documentation at `/api/docs`.

### Shared Packages (`packages/`)
- `packages/ui`: Atomic React UI components (`Button`, `Card`, `Input`, `Badge`, `EmptyState`, `LoadingState`).
- `packages/database`: PostgreSQL Prisma ORM schema, client initialization, migrations, and Bangladesh geographic seeders.
- `packages/types`: Shared TypeScript interfaces, response envelopes (`ApiResponse<T>`, `PaginatedResponse<T>`), and RBAC enums.
- `packages/config`: Shared base configurations for TypeScript (`tsconfig`), ESLint, and Prettier.
- `packages/utils`: Helper functions for BDT currency formatting, date/time normalization in `Asia/Dhaka`, phone numbers, and pagination calculations.

---

## 3. Geographic Hierarchy of Bangladesh

KajLagbe structures service delivery across the official 3-tier administrative hierarchy of Bangladesh:
1. **Divisions** (8 Divisions: Dhaka, Chittagong, Rajshahi, Khulna, Barisal, Sylhet, Rangpur, Mymensingh)
2. **Districts** (64 Zilas)
3. **Upazilas** (495+ Thanas/Sub-districts)

This geographic database allows hyper-local provider matching, zone-based pricing, and regional analytics.

---

## 4. Security & RBAC Architecture

Access control is governed by two complementary layers:
1. **Role-Based Access Control (`RolesGuard`)**: 11 distinct personas (`SUPER_ADMIN`, `ADMIN`, `OPERATIONS_MANAGER`, `FINANCE_ADMIN`, `VERIFICATION_OFFICER`, `SUPPORT_AGENT`, `CUSTOMER`, `INDIVIDUAL_PROVIDER`, `COMPANY_OWNER`, `COMPANY_MANAGER`, `TEAM_MEMBER`).
2. **Fine-Grained Permissions (`PermissionsGuard`)**: Decoupled codes (`USER_VIEW`, `PROVIDER_VERIFY`, `PAYOUT_APPROVE`, etc.) allowing dynamic administrative policy assignment.

All requests pass through:
- Helmet HTTP security headers
- CORS whitelist origin verification
- Rate-limiting protection via `@nestjs/throttler`
- Global Exception Filtering preventing internal stack-trace leakage
- Global Transform Interceptor maintaining standardized response shapes

