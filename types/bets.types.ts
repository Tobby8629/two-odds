// types/bets.types.ts

export type BetCategory = "SINGLE" | "ACCUMULATOR" | "CUSTOM";

export type BetStatus =
  | "OPEN"
  | "MATCHED"
  | "SETTLED_WIN"
  | "SETTLED_LOSS"
  | "CANCELLED"
  | "EXPIRED"
  | "CASHED_OUT";

/** Statuses that belong in the History tab. */
export const HISTORY_STATUSES: BetStatus[] = [
  "SETTLED_WIN",
  "SETTLED_LOSS",
  "CANCELLED",
  "EXPIRED",
  "CASHED_OUT",
];

/**
 * The spec documents no response schema for any bets endpoint except cashout,
 * so this is a deliberately loose, defensive model of what a bet looks like.
 * Every field beyond id is optional: nothing here is guaranteed by a contract,
 * and the UI must degrade rather than assume.
 *
 * Verify against a real response and tighten this before relying on any field.
 */
export interface Bet {
  id: string;
  category?: BetCategory;
  status?: BetStatus;
  matchId?: string;
  betType?: string;
  prediction?: Record<string, unknown>;
  odds?: number | string;
  stake?: number | string;
  currency?: string;
  expiresAt?: string;
  createdAt?: string;
  updatedAt?: string;
  /*
   * Side identity is undocumented. These are the plausible field names; the
   * helpers below treat all of them as optional so a missing one is not a bug.
   */
  creatorId?: string;
  takerId?: string;
  userId?: string;
}

export interface Pagination {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

export interface PaginatedBets {
  bets: Bet[];
  pagination?: Pagination;
}

/** Request body for POST /bets/custom. */
export interface CreateCustomBetInput {
  matchId: string;
  betType: string;
  prediction: Record<string, unknown>;
  odds: number;
  stake: number;
  expiresAt?: string;
}

export interface MyBetsFilters {
  status?: BetStatus;
  category?: BetCategory;
  page?: number;
  limit?: number;
}

export interface OpenBetsFilters {
  matchId?: string;
  betType?: string;
  category?: BetCategory;
  page?: number;
  limit?: number;
}
