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
