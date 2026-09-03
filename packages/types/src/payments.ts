export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentMethod {
  ONLINE_BKASH = 'ONLINE_BKASH',
  ONLINE_NAGAD = 'ONLINE_NAGAD',
  ONLINE_CARDS = 'ONLINE_CARDS',
  CASH_ON_SERVICE = 'CASH_ON_SERVICE',
}

export enum LedgerEntryType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
  COMMISSION_FEE = 'COMMISSION_FEE',
  HOLD = 'HOLD',
  RELEASE = 'RELEASE',
  PAYOUT = 'PAYOUT',
  REFUND = 'REFUND',
}

export enum PayoutStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  PROCESSING = 'PROCESSING',
  PAID = 'PAID',
  REJECTED = 'REJECTED',
}

export interface PaymentOrderResponseDto {
  id: string;
  orderReference: string;
  bookingId?: string | null;
  workOrderId?: string | null;
  customerId: string;
  providerId: string;
  grossAmount: number;
  commissionAmount: number;
  netProviderAmount: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  createdAt: string | Date;
  updatedAt: string | Date;
  customer?: any;
  provider?: any;
}

export interface CreatePaymentOrderDto {
  bookingId?: string;
  workOrderId?: string;
  grossAmount: number;
  paymentMethod?: PaymentMethod;
}

export interface VerifyPaymentDto {
  paymentOrderId: string;
  transactionId: string;
  gatewayProvider?: string;
}

export interface RequestPayoutDto {
  amount: number;
  paymentMethod: PaymentMethod;
  accountDetails: string;
}

export interface WalletSummaryDto {
  availableBalance: number;
  pendingBalance: number;
  totalEarned: number;
}
