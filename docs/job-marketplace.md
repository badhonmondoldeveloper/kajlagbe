# KajLagbe Advanced Job Posting & Service Request Marketplace System (Module 06)

## 1. Executive Summary

Module 06 establishes the core **Marketplace Transaction Engine** for KajLagbe, enabling:
- **Customers** to publish service requests, set budget ranges and privacy-safe areas, receive provider quotes, compare proposals, and select providers.
- **Individual Providers** and **Business Agencies** to discover live job opportunities, check eligibility, submit structured price quotes with cover letters, and manage applications.

---

## 2. Core Marketplace Flow

```
CUSTOMER WORKFLOW:
  1. Post Job Wizard (/post-job, 7-step progressive flow)
  2. Define Service Category, Requirements, Urgency, and Budget Model
  3. Set Safe Public Area (e.g., Mirpur-10, Dhaka) and Encrypted Private Residential Address
  4. Publish Job or Save as Draft (/customer/jobs)
  5. Receive Real-Time Provider Quotes & In-App Notifications
  6. Compare Quotes & Candidate Credentials (/customer/jobs/[id])
  7. Confirm Provider Selection (Atomic Concurrency-Protected Transaction)

PROVIDER WORKFLOW:
  1. Discover Jobs Radar (/provider/jobs) with Category & Location Filters
  2. Verify Eligibility & Check Safety Notes
  3. Submit Application & Structured Quote (/provider/jobs/[id])
  4. Track Application States: SUBMITTED → SHORTLISTED → ACCEPTED (/provider/applications)
  5. Withdraw Proposal when Needed (/provider/applications/[id])
```

---

## 3. Privacy & Safety Architecture

- **Public Job Listings (`/jobs`, `/jobs/[id]`)**:
  - Expose only the **Safe General Area** (e.g. *মিরপুর-১০, ঢাকা*).
  - **Never** expose customer mobile numbers, emails, or exact residential addresses.
  - Display customer first name and verification badge only.
- **Private Residential Address (`privateAddress`)**:
  - Encrypted and withheld on the server until the customer explicitly confirms provider selection.
- **Emergency Protection**:
  - Urgency selector (`EMERGENCY_REQUEST`) includes clear safety advisories guiding users to official emergency hotlines (999) for dangerous emergencies.

---

## 4. Job Data Model & Status State Machine

### Prisma Models
- **`Job`**:
  - `status`: `DRAFT`, `PUBLISHED`, `PAUSED`, `EXPIRED`, `UNDER_REVIEW`, `PROVIDER_SELECTED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`, `ARCHIVED`
  - `urgency`: `FLEXIBLE`, `TODAY`, `URGENT`, `EMERGENCY_REQUEST`
  - `budgetType`: `FIXED_BUDGET`, `BUDGET_RANGE`, `NEGOTIABLE`, `REQUEST_QUOTES`
- **`JobApplication`**:
  - `status`: `DRAFT`, `SUBMITTED`, `VIEWED`, `SHORTLISTED`, `ACCEPTED`, `REJECTED`, `WITHDRAWN`
  - `pricingType`: `FIXED`, `HOURLY`, `NEGOTIABLE`
  - `proposedPrice`, `estimatedDays`, `coverLetter`, `isShortlisted`
- **`JobStatusHistory`**: Immutable log of every state change (`fromStatus`, `toStatus`, `changedBy`, `reason`).
- **`SavedJob`**: Provider bookmarking engine.

### Centralized State Machine (`JobStatusTransitionService`)
Enforces valid state progressions server-side to eliminate invalid transitions and unauthorized jumps.

---

## 5. Concurrency Protection & Atomic Transactions

When a customer selects a provider:
- Wrapped in an atomic **Prisma `$transaction`**.
- Verifies customer ownership and active job eligibility.
- Locks the selected candidate application and updates status to `ACCEPTED`.
- Transitions the job status to `PROVIDER_SELECTED`.
- Dispatches an in-app `Notification` to the chosen technician.
- Prevents race conditions and duplicate selections.

---

## 6. API Endpoints (`apps/api`)

### Jobs Domain (`/api/v1/jobs/*`)
- `GET /public`: Paginated & filtered public job board.
- `GET /public/:id`: Privacy-safe public job details.
- `GET /customer/mine`: Owner's created jobs with counts.
- `GET /customer/:id`: Private owner job command view with applicant quotes.
- `POST /`: Create draft or published job post.
- `PATCH /:id`: Update job details (subject to state rules).
- `POST /:id/publish`: Publish draft.
- `POST /:id/pause`: Pause active job.
- `POST /:id/cancel`: Cancel job with reason.
- `POST /:id/select-provider`: Confirm provider selection atomically.

### Applications Domain (`/api/v1/applications/*`)
- `POST /jobs/:id/apply`: Submit application quote.
- `GET /jobs/:id/applications`: Owner's application inbox.
- `GET /applications/provider/mine`: Provider's submitted applications.
- `GET /applications/provider/:id`: Provider single application details.
- `POST /applications/:id/shortlist`: Shortlist candidate.
- `POST /applications/:id/reject`: Reject application.
- `POST /applications/:id/withdraw`: Withdraw candidate application.
- `POST /jobs/:id/save`: Bookmark job.
- `DELETE /jobs/:id/save`: Remove bookmark.
- `GET /jobs/provider/saved`: List bookmarked jobs.

