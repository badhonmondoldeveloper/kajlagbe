# KajLagbe Role-Based Access Control (RBAC) & Permission System

## 1. Role Taxonomy

| Role Type | Target Audience | Allowed Self-Registration | Primary Scope |
| :--- | :--- | :---: | :--- |
| `CUSTOMER` | Service Seekers & Households | **Yes** | Post jobs, hire providers, leave reviews, manage bookings. |
| `INDIVIDUAL_PROVIDER` | Skilled Technicians & Craftsmen | **Yes** | Accept jobs, submit proposals, manage service schedule. |
| `BUSINESS` | Service Companies & Agencies | **Yes** | Manage technician teams, assign jobs, corporate invoicing. |
| `ADMIN` | Platform Administrators | **No** | Full operational control, user management, category settings. |
| `SUPER_ADMIN` | System Architects | **No** | Full system administration, RBAC role assignments, feature flags. |
| `SUPPORT_AGENT` / `SUPPORT` | Customer & Provider Support | **No** | Ticket management, user assistance, dispute handling. |
| `MODERATOR` | Content & Review Moderators | **No** | Profile reviews, verification audits, comment moderation. |

---

## 2. Permission Foundation

Granular permissions are organized by module:

```typescript
export enum PermissionType {
  // User Management
  USER_VIEW = 'USER_VIEW',
  USER_CREATE = 'USER_CREATE',
  USER_EDIT = 'USER_EDIT',
  USER_SUSPEND = 'USER_SUSPEND',
  USER_DELETE = 'USER_DELETE',
  USER_READ_SELF = 'USER_READ_SELF',
  USER_UPDATE_SELF = 'USER_UPDATE_SELF',

  // Provider & Verification
  PROVIDER_VIEW = 'PROVIDER_VIEW',
  PROVIDER_CREATE = 'PROVIDER_CREATE',
  PROVIDER_EDIT = 'PROVIDER_EDIT',
  PROVIDER_UPDATE_SELF = 'PROVIDER_UPDATE_SELF',
  PROVIDER_VERIFY = 'PROVIDER_VERIFY',

  // Business
  BUSINESS_CREATE = 'BUSINESS_CREATE',
  BUSINESS_UPDATE_SELF = 'BUSINESS_UPDATE_SELF',
  BUSINESS_VIEW = 'BUSINESS_VIEW',

  // Jobs & Bookings
  JOB_VIEW = 'JOB_VIEW',
  JOB_CREATE = 'JOB_CREATE',
  JOB_EDIT = 'JOB_EDIT',
  JOB_CANCEL = 'JOB_CANCEL',
  BOOKING_VIEW = 'BOOKING_VIEW',
  BOOKING_CREATE = 'BOOKING_CREATE',
  BOOKING_MANAGE = 'BOOKING_MANAGE',

  // Financial & Payments
  PAYMENT_VIEW = 'PAYMENT_VIEW',
  PAYMENT_MANAGE = 'PAYMENT_MANAGE',
  PAYOUT_VIEW = 'PAYOUT_VIEW',
  PAYOUT_APPROVE = 'PAYOUT_APPROVE',
  SUBSCRIPTION_MANAGE = 'SUBSCRIPTION_MANAGE',

  // Disputes & Support
  DISPUTE_VIEW = 'DISPUTE_VIEW',
  DISPUTE_MANAGE = 'DISPUTE_MANAGE',
  SUPPORT_VIEW = 'SUPPORT_VIEW',
  SUPPORT_RESPOND = 'SUPPORT_RESPOND',
  SUPPORT_ACCESS = 'SUPPORT_ACCESS',

  // Content & CMS
  CMS_VIEW = 'CMS_VIEW',
  CMS_EDIT = 'CMS_EDIT',

  // System Administration
  SETTINGS_VIEW = 'SETTINGS_VIEW',
  SETTINGS_EDIT = 'SETTINGS_EDIT',
  FEATURE_FLAG_MANAGE = 'FEATURE_FLAG_MANAGE',
  AUDIT_LOG_VIEW = 'AUDIT_LOG_VIEW',
  ADMIN_ACCESS = 'ADMIN_ACCESS',
}
```

---

## 3. Server-Side Enforcement (NestJS)

Frontend conditional rendering is solely for user experience. Authorization security boundaries are strictly enforced on backend endpoints via decorators and guards:

```typescript
@UseGuards(SupabaseAuthGuard, RolesGuard)
@Roles(RoleType.ADMIN, RoleType.SUPER_ADMIN)
@Get('admin/users')
async listAllUsers() {
  // Protected endpoint
}
```
