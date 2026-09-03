# KajLagbe Domain Model Specification

## Domain Overview
The **KAJLAGBE (কাজ লাগবে)** marketplace architecture is organized into 15 distinct domain boundaries. Each domain encapsulates its specific business rules, invariants, status state machines, and cross-domain events.

---

## 15 Key Domain Boundaries

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                           KAJLAGBE MARKETPLACE ECOSYSTEM                       │
├───────────────────┬───────────────────┬───────────────────┬────────────────────┤
│ 1. Identity & Auth│ 2. Profiles & KYC │ 3. Roles & RBAC   │ 4. Service Taxonomy│
├───────────────────┼───────────────────┼───────────────────┼────────────────────┤
│ 5. Provider Services│ 6. Geography     │ 7. Availability   │ 8. Job Marketplace │
├───────────────────┼───────────────────┼───────────────────┼────────────────────┤
│ 9. Applications   │ 10. Bookings & WO │ 11. Escrow & Wallet│ 12. Trust & Safety │
├───────────────────┼───────────────────┼───────────────────┼────────────────────┤
│ 13. Messaging     │ 14. Reviews & Rating│ 15. Disputes      │                    │
└───────────────────┴───────────────────┴───────────────────┴────────────────────┘
```

---

### Domain 1: Identity & Authentication
- **Responsibilities**: User registration, password authentication, Supabase Auth session issuance, password recovery, open redirect protection, and token validation.
- **Invariants**: Every user must have a unique email address or phone number.

### Domain 2: User Profiles & Provider KYC
- **Responsibilities**: Manages customer personal details, provider skills/portfolios/biography, company business profiles, and NID identity verification status (`NOT_STARTED` -> `PENDING` -> `APPROVED` / `REJECTED`).

### Domain 3: Roles & Permission Access Control (RBAC)
- **Responsibilities**: Enforces multi-role authorization across 11 system roles (`SUPER_ADMIN`, `ADMIN`, `OPERATIONS_MANAGER`, `FINANCE_ADMIN`, `VERIFICATION_OFFICER`, `SUPPORT_AGENT`, `CUSTOMER`, `INDIVIDUAL_PROVIDER`, `COMPANY_OWNER`, `COMPANY_MANAGER`, `TEAM_MEMBER`).

### Domain 4: Service Taxonomy & Catalog
- **Responsibilities**: Governs 8 main service categories (AC Repair, Electrician, Plumbing, Cleaning, Appliance Repair, Painting, Shifting, IT & Tech Support) and subcategories.

### Domain 5: Provider Services & Pricing
- **Responsibilities**: Allows providers and agencies to list specialized services, pricing models (`FIXED`, `HOURLY`, `STARTING_FROM`), and base rates.

### Domain 6: Geographic Location Hierarchy
- **Responsibilities**: Maps 8 divisions of Bangladesh down to 64 districts and upazilas for location-based matching without exposing raw customer private addresses publicly.

### Domain 7: Provider Availability & Schedule
- **Responsibilities**: Controls real-time availability states (`AVAILABLE`, `BUSY`, `AWAY`) and working calendar slots.

### Domain 8: Marketplace Job Posting
- **Responsibilities**: Allows customers to post job requirements with category tags, area bounds, budget specifications (`FIXED_BUDGET`, `BUDGET_RANGE`, `NEGOTIABLE`, `REQUEST_QUOTES`), and urgency levels.

### Domain 9: Bidding & Job Applications
- **Responsibilities**: Allows verified providers to submit applications with cover notes, proposed prices, and completion estimates.

### Domain 10: Booking & Work Order Management
- **Responsibilities**: Governs the complete transactional lifecycle from `PENDING_CONFIRMATION` -> `CONFIRMED` -> `IN_PROGRESS` -> `COMPLETED`.

### Domain 11: Escrow, Wallet & Platform Commission Engine
- **Responsibilities**: Single-entry immutable wallet ledger (`WalletAccount`, `WalletLedgerEntry`) tracking customer payments, platform commission deductions (10% default), and provider payout withdrawals.

### Domain 12: Trust, Safety & Verification Badges
- **Responsibilities**: Calculates trust ratings from verified NID documents, completed job counts, ratings, and dispute history.

### Domain 13: Real-time Communication & Messaging
- **Responsibilities**: Context-isolated chat threads linked to specific jobs or bookings (`Conversation`, `Message`, `MessageAttachment`).

### Domain 14: Ratings & Customer Reviews
- **Responsibilities**: Allows verified customers to leave 1-5 star ratings and reviews following booking completion.

### Domain 15: Disputes & Dispute Resolution
- **Responsibilities**: Arbitration flow for handling incomplete work, quality complaints, or pricing disputes with evidence collection and administrative resolution.
