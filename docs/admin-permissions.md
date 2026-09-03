# KajLagbe Admin Permissions & Role Authorization Matrix

## Supported Roles & Access Matrix

| Role | Admin Dashboard | User Management | Provider Verification | Job Moderation | Payout Approval | Feature Flags | Audit Logs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **SUPER_ADMIN** | Full Access | Full Access | Full Access | Full Access | Full Access | Full Access | Full Access |
| **ADMIN** | Full Access | Manage Status | Approve/Reject | Moderate Status | Review/Approve | View Only | View Only |
| **CUSTOMER** | Denied (403) | Denied | Denied | Denied | Denied | Denied | Denied |
| **INDIVIDUAL_PROVIDER** | Denied (403) | Denied | Denied | Denied | Denied | Denied | Denied |
| **BUSINESS** | Denied (403) | Denied | Denied | Denied | Denied | Denied | Denied |

---

## Security Enforcement

1. **NestJS API Level**: `@Roles('ADMIN', 'SUPER_ADMIN')` coupled with `RolesGuard` and `SupabaseAuthGuard`.
2. **Next.js Middleware Level**: Route protection intercepts `/admin` routes.
3. **Audit Trail**: Every administrative mutation creates an `AuditLog` record containing `userId`, `action`, `entityType`, `entityId`, and `metadata`.

