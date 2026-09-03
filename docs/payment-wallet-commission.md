# KajLagbe Module 09 — Payment, Wallet, Commission & Revenue Engine

## Overview
Module 09 implements a transparent, auditable, double-entry financial ledger and revenue engine for KajLagbe. It supports payment order creation, Bangladesh payment gateway adapter abstraction (bKash, Nagad, Cards), server-side verification, idempotency protection, platform commission calculation, provider wallet accounts, and withdrawal payout requests.

---

## Financial Architecture

```
Customer Payment Order (ORDER-2026-XXXX)
      │
Platform Commission Engine
 (Calculates 10% platform fee & net provider earnings)
      │
Server-Side Payment Verification (Idempotent Webhook / API)
      │
Double-Entry Append-Only Wallet Ledger
 ├── WalletAccount (availableBalance, pendingBalance, totalEarned)
 └── WalletLedgerEntry (CREDIT / DEBIT / COMMISSION_FEE / PAYOUT)
```

---

## Data Models
1. **PaymentOrder**: `orderReference` (`ORDER-2026-XXXX`), `grossAmount`, `commissionAmount`, `netProviderAmount`, `paymentMethod`, `status` (`PENDING`, `PROCESSING`, `SUCCEEDED`, `FAILED`, `CANCELLED`).
2. **PaymentAttempt**: `gatewayProvider`, `transactionId`, `status`, `idempotencyKey` (guards against duplicate webhooks).
3. **PlatformCommissionConfig**: Dynamic category & global percentage/fixed fee rules.
4. **WalletAccount**: `userId`, `availableBalance`, `pendingBalance`, `totalEarned`.
5. **WalletLedgerEntry**: Immutable transaction log (`amount`, `type`, `referenceId`, `description`).
6. **PayoutRequest**: Provider withdrawal requests (`bKash`, `Nagad`, `Bank`) with status (`PENDING`, `APPROVED`, `PAID`, `REJECTED`).

---

## Security & Idempotency Rules
1. **Server-Side Verification**: Payments are strictly verified backend-side. Frontend claims of `success=true` are never trusted without backend confirmation.
2. **Idempotency Keys**: Payment attempts check unique `idempotencyKey` values so duplicate webhooks or network retries never double-credit money.
3. **Double-Entry Ledger**: Balances are calculated through append-only ledger entries.

---

## API Endpoints
- `POST /payments/create-order` — Create payment order with commission calculation
- `POST /payments/verify` — Idempotent server-side payment verification
- `GET /payments/customer/history` — Customer payment history
- `GET /payments/provider/history` — Provider earnings payment history
- `GET /wallet/account` — Wallet summary & ledger entries
- `POST /wallet/payout-request` — Provider withdrawal request
- `GET /wallet/payouts/history` — Provider payout queue history

---

## Frontend Portals
- `/customer/payments` — Digital receipts and customer payment history.
- `/provider/earnings` — Provider earnings console with gross earnings, platform fee deduction, and net balance.
- `/provider/payouts` — Provider withdrawal request portal.
