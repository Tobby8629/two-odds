// ======================================================
// SHARED TYPES
// ======================================================

export type Team = "home" | "away";

export type Winner =
  | "home"
  | "away"
  | "draw";

export type OverUnderType =
  | "over"
  | "under";

export type DoubleChanceOutcome =
  | "home_draw"
  | "away_draw"
  | "home_away";

/*
 * Exactly what GET /sports/matches returns and accepts as a filter.
 * A finished match is FINISHED, not COMPLETED, so comparing to "COMPLETED"
 * never matches and the match keeps reading as upcoming. POSTPONED is sent too.
 * Mirrored in types/sports.types.ts; keep the two in step.
 */
export type MatchStatus =
  | "UPCOMING"
  | "LIVE"
  | "FINISHED"
  | "CANCELLED"
  | "POSTPONED";


// ======================================================
// SPORT
// ======================================================

export interface Sport {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
}


// ======================================================
// LEAGUE
// ======================================================

export interface League {
  id: string;
  sportId: string;
  name: string;
  slug: string;
  externalId: string;
  country: string;
  isActive: boolean;
  lastSyncedAt: string | null;
  sport: Sport;
}


// ======================================================
// MATCH WINNER
// ======================================================

export interface MatchWinnerOutcome {
  price: number;

  prediction: {
    winner: Winner;
  };
}

export interface MatchWinnerMarket {
  betType: "MATCH_WINNER";
  outcomes: MatchWinnerOutcome[];
}


// ======================================================
// DOUBLE CHANCE
// ======================================================

export interface DoubleChanceMarketOutcome {
  price: number;

  prediction: {
    outcome: DoubleChanceOutcome;
  };
}

export interface DoubleChanceMarket {
  betType: "DOUBLE_CHANCE";
  outcomes: DoubleChanceMarketOutcome[];
}


// ======================================================
// OVER / UNDER
// ======================================================

export interface OverUnderOutcome {
  price: number;

  prediction: {
    line: number;
    type: OverUnderType;
  };
}

export interface OverUnderMarket {
  betType: "OVER_UNDER";
  outcomes: OverUnderOutcome[];
}


// ======================================================
// FIRST HALF OVER / UNDER
// ======================================================

export interface FirstHalfOverUnderOutcome {
  price: number;

  prediction: {
    line: number;
    type: OverUnderType;
  };
}

export interface FirstHalfOverUnderMarket {
  betType: "FIRST_HALF_OVER_UNDER";
  outcomes: FirstHalfOverUnderOutcome[];
}


// ======================================================
// TEAM TOTAL
// ======================================================

export interface TeamTotalOutcome {
  price: number;

  prediction: {
    line: number;
    team: Team;
    type: OverUnderType;
  };
}

export interface TeamTotalMarket {
  betType: "TEAM_TOTAL";
  outcomes: TeamTotalOutcome[];
}


// ======================================================
// HANDICAP
// ======================================================

export interface HandicapOutcome {
  price: number;

  prediction: {
    line: number;
    team: Team;
  };
}

export interface HandicapMarket {
  betType: "HANDICAP";
  outcomes: HandicapOutcome[];
}


// ======================================================
// FIRST HALF WINNER
// ======================================================

export interface FirstHalfWinnerOutcome {
  price: number;

  prediction: {
    winner: Winner;
  };
}

export interface FirstHalfWinnerMarket {
  betType: "FIRST_HALF_WINNER";
  outcomes: FirstHalfWinnerOutcome[];
}


// ======================================================
// ALL MARKET TYPES
// ======================================================

export type Market =
  | MatchWinnerMarket
  | DoubleChanceMarket
  | OverUnderMarket
  | FirstHalfOverUnderMarket
  | TeamTotalMarket
  | HandicapMarket
  | FirstHalfWinnerMarket;


// ======================================================
// BET
// ======================================================

export type Bet = unknown;


// ======================================================
// MATCH
// ======================================================

export interface Match {
  id: string;
  leagueId: string;
  externalId: string;

  homeTeam: string;
  awayTeam: string;

  startTime: string;
  status: MatchStatus;

  homeScore: number | null;
  awayScore: number | null;

  halfTimeHomeScore: number | null;
  halfTimeAwayScore: number | null;

  resultConfirmedAt: string | null;

  createdAt: string;
  updatedAt: string;

  league: League;

  bets: Bet[];

  markets: Market[];
}


// ======================================================
// MATCH DETAILS
// ======================================================

export type MatchDetails = Match;


// ======================================================
// MATCH DETAILS API RESPONSE
// ======================================================

export interface MatchDetailsResponse {
  success: boolean;
  data: MatchDetails;
}
