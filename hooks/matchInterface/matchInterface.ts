import { Sport } from "..";

export type Team = "home" | "away";
export type Winner = "home" | "away" | "draw";
export type OverUnderType = "over" | "under";

export type DoubleChanceOutcome =
  | "home_draw"
  | "away_draw"
  | "home_away";

// ==============================
// MATCH WINNER
// ==============================

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

// ==============================
// DOUBLE CHANCE
// ==============================

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

// ==============================
// OVER / UNDER
// ==============================

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

// ==============================
// FIRST HALF OVER / UNDER
// ==============================

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

// ==============================
// TEAM TOTAL
// ==============================

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

// ==============================
// HANDICAP
// ==============================

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

// ==============================
// FIRST HALF WINNER
// ==============================

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

export interface League {
  id: string;
  name: string;
  country: string;
  sport: Sport;
}


export interface Prediction {
  winner: Winner;
}

export interface Outcome {
  price: number;
  prediction: Prediction;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  status: "UPCOMING" | "LIVE" | "FINISHED";
  homeScore: number;
  awayScore: number;
  league: League;
  markets: Market[];
}

// ==============================
// ALL MARKETS
// ==============================

export type Market =
  | MatchWinnerMarket
  | DoubleChanceMarket
  | OverUnderMarket
  | FirstHalfOverUnderMarket
  | TeamTotalMarket
  | HandicapMarket
  | FirstHalfWinnerMarket;