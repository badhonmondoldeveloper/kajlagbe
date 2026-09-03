# KajLagbe (কাজ লাগবে) — Bangladesh Local Service Marketplace

> **Module 01: Platform Architecture & Monorepo Foundation**

KajLagbe is an enterprise-grade, high-performance, Bangladesh-wide local service marketplace connecting customers, individual service professionals, and registered service companies across all 8 divisions and 64 districts of Bangladesh.

---

## Architecture Overview

KajLagbe is organized as a unified monorepo managed by [Turborepo](https://turbo.build/) and `pnpm`:

```
kajlagbe/
├── apps/
│   ├── web/                     # Next.js 14 (App Router, Tailwind CSS, shadcn/ui foundation)
│   └── api/                     # NestJS (Modular Architecture, Swagger OpenAPI, RBAC)
├── packages/
│   ├── ui/                      # Shared reusable UI component library
│   ├── database/                # Prisma ORM schema, PostgreSQL client & seeders
│   ├── types/                   # Shared TypeScript models, enums & response contracts
│   ├── config/                  # Centralized TypeScript, ESLint & Prettier configs
│   └── utils/                   # Shared formatting (BDT currency, BD phone/dates), pagination
├── docs/                        # Architecture & Development Roadmap documentation
├── scripts/                     # Local setup & generator scripts
└── .github/                     # GitHub Actions CI/CD workflows
```

---

## Technology Stack

- **Monorepo Engine**: Turborepo, pnpm workspaces
- **Web Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS, TypeScript
- **Backend API**: NestJS 10, TypeScript, Swagger/OpenAPI, Helmet, Throttler
- **Database**: PostgreSQL with Prisma ORM
- **Validation**: `class-validator`, `class-transformer`, `zod`
- **Code Quality**: Strict TypeScript, ESLint, Prettier, `.editorconfig`
- **CI / CD**: GitHub Actions

---

## Getting Started

### 1. Prerequisites
- **Node.js**: `v20.0.0` or later
- **pnpm**: `v9.0.0` or later (`npm install -g pnpm@9`)
- **PostgreSQL**: `v14` or later (or Docker)

### 2. Installation
Clone the repository and install all workspace dependencies:
```bash
git clone https://github.com/kajlagbe/kajlagbe.git
cd kajlagbe
pnpm install
```

### 3. Environment Configuration
Copy the example environment files for the API and Web apps:
```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

### 4. Database Setup
Ensure PostgreSQL is running locally. For Docker users:
```bash
docker run --name kajlagbe-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=kajlagbe -p 5432:5432 -d postgres:16-alpine
```

Generate Prisma Client and push schema:
```bash
pnpm db:generate
pnpm db:push
pnpm db:seed
```

### 5. Running in Development
Start all applications concurrently:
```bash
pnpm dev
```

- **Web Frontend**: [http://localhost:3000](http://localhost:3000)
- **API Server**: [http://localhost:4000/api/v1](http://localhost:4000/api/v1)
- **API Health Check**: [http://localhost:4000/api/v1/health](http://localhost:4000/api/v1/health)
- **Swagger Documentation**: [http://localhost:4000/api/docs](http://localhost:4000/api/docs)

---

## Workspace Commands

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Start development servers for all workspaces |
| `pnpm build` | Run production builds across all apps and packages |
| `pnpm lint` | Run ESLint across all workspaces |
| `pnpm typecheck` | Run strict TypeScript validation across the monorepo |
| `pnpm format` | Format code using Prettier |
| `pnpm format:check` | Check code formatting compliance |
| `pnpm db:generate` | Generate Prisma client from schema |
| `pnpm db:push` | Push schema changes directly to the PostgreSQL database |
| `pnpm db:seed` | Seed initial roles, Bangladesh divisions, and system settings |

---

## Role-Based Access Control (RBAC)

The platform implements 11 system roles:
1. `SUPER_ADMIN` — Full platform access, security, and governance
2. `ADMIN` — Platform operations and catalog management
3. `OPERATIONS_MANAGER` — Service operations, disputes, and provider performance
4. `FINANCE_ADMIN` — Payments, commissions, provider payouts, and financial ledger
5. `VERIFICATION_OFFICER` — NID, trade licenses, and provider background checks
6. `SUPPORT_AGENT` — Customer & provider help desk ticket mediation
7. `CUSTOMER` — End-users hiring and booking services
8. `INDIVIDUAL_PROVIDER` — Freelance service professionals
9. `COMPANY_OWNER` — Corporate service business owners
10. `COMPANY_MANAGER` — Managers handling company jobs and technician teams
11. `TEAM_MEMBER` — Technicians/staff deployed by service companies

---

## Roadmap

See [docs/development-roadmap.md](docs/development-roadmap.md) for the 12-module development roadmap.
- **Module 01**: Monorepo & Platform Foundation (Current)
- **Module 02**: Premium Design System & Brand Identity
- **Module 03**: Public Website & Marketplace Discovery
- **Module 04**: Multi-Role Authentication & Onboarding
- **Module 05**: Provider Portal & KYC Verification Engine
- **Module 06**: Customer Dashboard & Experience
- **Module 07**: Job Board, Quotation & Booking Engine
- **Module 08**: Real-time Messaging, Push & SMS Notifications
- **Module 09**: Payments (bKash/Nagad/Cards), Escrow, Commission & Payouts
- **Module 10**: Admin Command Center & Business Intelligence
- **Module 11**: Security Hardening, Automated E2E & Load Testing
- **Module 12**: Production CI/CD, Containerization & High-Availability Deployment

