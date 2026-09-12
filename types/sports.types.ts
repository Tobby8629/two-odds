// types/sports.types.ts

export type MatchStatus =
  | "UPCOMING"
  | "LIVE"
  | "FINISHED"
  | "CANCELLED"
  | "POSTPONED";

export interface Sport {
  id: string;
  name: string;
}

export interface League {
  id: string;
  name: string;
  country?: string | null;
  sport?: Sport;
}

export interface MarketOutcome {
  /** Passed straight through to bet creation alongside betType. */
  prediction: Record<string, unknown>;
  /** Average decimal odds across bookmakers. */
  price: number;
}

export interface Market {
  betType: string;
  outcomes: MarketOutcome[];
}

/** Shape returned by GET /sports/matches. */
export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  startTime?: string;
  status?: MatchStatus;
  homeScore?: number | null;
  awayScore?: number | null;
  league?: League;
  /** Empty until odds have synced. */
  markets?: Market[];
}

export interface MatchFilters {
  leagueId?: string;
  status?: MatchStatus;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}
