# KajLagbe Admin Operations & Governance Manual

## Operational Guidelines

### 1. User Account Lifecycle Management
- **Active State**: Standard operational user account.
- **Suspended State**: Account blocked from logging in, creating jobs, or sending messages. Used for policy violations.
- **Restricted State**: Account can log in and view history but cannot create new jobs or submit applications.

### 2. Provider KYC Verification Workflow
- Review provider name, email, experience years, service categories, and NID documents.
- Click **Approve** to set `verificationStatus = APPROVED` and grant verified provider badge.
- Click **Reject** with explicit Bengali rejection reason to notify provider to re-submit documentation.

### 3. Payout Request Approval Workflow
- Inspect pending payout requests in `/admin/payouts`.
- Verify provider's available wallet balance and masked account number (`017****1234`).
- Click **Approve (Process)** to update payout status to `PROCESSED` and deduct from wallet pending balance.

### 4. Feature Flag Governance
- Toggle platform features (`CHAT_ENABLED`, `PAYMENT_ENABLED`, `PROVIDER_REGISTRATION_ENABLED`, `MAINTENANCE_MODE`) dynamically.
- All toggles log an immutable record to `AuditLog`.

