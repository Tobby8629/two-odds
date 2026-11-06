// types/wallet.types.ts

/**
 * Balances arrive as fixed-point strings ("50000.00000000") rather than
 * numbers, so precision is not lost in transit.
 */
export interface CurrencyBalance {
  balance: string;
  lockedBalance: string;
}

/** Shape returned by GET /wallet/balance. */
export interface WalletBalance {
  ngn: CurrencyBalance;
  usdt: CurrencyBalance;
}

export type WalletCurrency = "NGN" | "USDT";

export type LimitPeriod = "daily" | "weekly" | "monthly";

/** A null period means no limit is set for it. */
export type DepositLimits = Record<LimitPeriod, string | null>;

/** GET /wallet/deposit-limits returns one entry per currency. */
export interface CurrencyDepositLimits {
  currency: WalletCurrency;
  limits: DepositLimits;
}

/**
 * PUT /wallet/deposit-limits takes numbers rather than the fixed-point
 * strings it returns, and only the periods being changed. An explicit null
 * removes a limit, so omitted and null are not interchangeable.
 */
export interface UpdateDepositLimitsInput {
  currency: WalletCurrency;
  daily?: number | null;
  weekly?: number | null;
  monthly?: number | null;
}

/** POST /wallet/pin/set — 4 digits, server pattern ^\d{4}$. */
export interface SetPinInput {
  pin: string;
}

/** POST /wallet/pin/change */
export interface ChangePinInput {
  currentPin: string;
  newPin: string;
}

/** POST /wallet/pin/reset — code comes from /pin/forgot by email. */
export interface ResetPinInput {
  code: string;
  newPin: string;
}

export type DepositNetwork = "SOLANA" | "ETHEREUM";

/** POST /wallet/deposit/usdt */
export interface UsdtDepositInput {
  amount: number;
  network: DepositNetwork;
}

export interface UsdtDeposit {
  payAddress: string;
  payAmount: string | number;
  paymentId: string;
  network: string;
  reference: string;
}

/** POST /wallet/deposit/naira */
export interface NairaDepositInput {
  amount: number;
}

export interface NairaDeposit {
  authorizationUrl: string;
  accessCode: string;
  reference: string;
}
