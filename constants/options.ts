// Generic Odd type
export interface Odd {
  value: number;
  suspended?: boolean;
}

// ---------- MAIN MARKETS ----------
export interface MainMarkets {
  oneXtwo: { home: Odd; draw: Odd; away: Odd };
  doubleChance: { "HomeorDraw": Odd; "HomeorAway": Odd; "DraworAway": Odd };
  btts: { yes: Odd; no: Odd };
  drawNoBet: { home: Odd; away: Odd };
  correctScore: { score: string; odd: Odd }[];
  halftimeFulltime: { [key: string]: Odd }; // e.g., "home_home", "draw_away"
  winningMargin: { [key: string]: Odd }; // e.g., "home1", "away2"
  totalGoalsBands: { [key: string]: Odd }; // e.g., "0-1", "2-3"
}

// ---------- GOALS MARKETS ----------
// ------------------------------
// Base Types
// ------------------------------
export interface OverUnderLine {
  line: number;        // e.g., 0.5, 1.5, 2.5
  over: number;        // odds for over
  under: number;       // odds for under
}

export interface ExactGoalOption {
  goals: string;       // "0" | "1" | "2" | "3+"
  value: number;       // odds
}

export interface SimpleOption {
  label: string;       // Yes/No, or any label text
  value: number;       // odds
}

export interface TeamOption {
  team: string;        // Arsenal, Liverpool, etc.
  value: number;       // odds
}

export interface RaceToGoalRow {
  label: string;       // "First to 1 Goal"
  Arsenal: number;
  Liverpool: number;
  Neither: number;
}

// ------------------------------
// Section Interfaces
// ------------------------------
export interface MatchTotalGoalsSection {
  title: string;
  lines: OverUnderLine[];
}

export interface TeamTotalGoalsSection {
  title: string;
  lines: OverUnderLine[];
}

export interface BothTeamsToScoreSection {
  title: string;
  options: SimpleOption[];   // Yes / No
}

export interface FirstTeamToScoreSection {
  title: string;
  options: TeamOption[];     // Arsenal / Liverpool / No Goal
}

export interface LastTeamToScoreSection {
  title: string;
  options: TeamOption[];
}

export interface ExactGoalsSection {
  title: string;
  options: ExactGoalOption[];
}

export interface FirstHalfTotalGoalsSection {
  title: string;
  lines: OverUnderLine[];
}

export interface FirstHalfTeamTotalGoalsSection {
  title: string;
  lines: OverUnderLine[];
}

export interface RaceToGoalsSection {
  title: string;
  options: RaceToGoalRow[];
}

// ------------------------------
// Main Goals Interface
// ------------------------------
export interface GoalsMarket {
  matchTotalGoals: MatchTotalGoalsSection;

  teamTotalGoals: Record<string, TeamTotalGoalsSection>;        // Arsenal, Liverpool…

  bothTeamsToScore: BothTeamsToScoreSection;

  firstTeamToScore: FirstTeamToScoreSection;
  lastTeamToScore: LastTeamToScoreSection;

  exactGoals: Record<string, ExactGoalsSection>;                // Per-team exact goals

  firstHalfTotalGoals: FirstHalfTotalGoalsSection;

  firstHalfTeamTotalGoals: Record<string, FirstHalfTeamTotalGoalsSection>;

  raceToGoals: RaceToGoalsSection;
}


// ---------- HANDICAP MARKETS ----------
export interface HandicapMarkets {
  asianHandicapFullTime: { line: number; home: Odd; away: Odd }[];
  asianHandicap1stHalf: { line: number; home: Odd; away: Odd }[];
}

// ---------- HALF MARKETS ----------
export interface HalvesMarkets {
  firstHalf1X2: { home: Odd; draw: Odd; away: Odd };
  secondHalf1X2: { home: Odd; draw: Odd; away: Odd };
  firstHalfOverUnder: { [line: string]: { over: Odd; under: Odd } };
  secondHalfOverUnder: { [line: string]: { over: Odd; under: Odd } };
}

// ---------- COMBO MARKETS ----------
export interface ComboMarkets {
  bttsAndOverUnder: { btts: string; line: string; odd: Odd }[];
  doubleChanceAndBTTS: { dc: string; btts: string; odd: Odd }[];
}

// ---------- SPECIAL MARKETS ----------
export interface SpecialMarkets {
  cleanSheet: { home: Odd; away: Odd };
  scoreInBothHalves: { home: Odd; away: Odd };
  toWinEitherHalf: { home: Odd; away: Odd };
}

// ---------- PLAYER MARKETS ----------
export interface PlayerMarkets {
  anytimeGoalscorer: { [player: string]: Odd };
  firstGoalscorer: { [player: string]: Odd };
  lastGoalscorer: { [player: string]: Odd };
}

// ---------- FULL FOOTBALL MARKETS ----------
export interface FootballMarkets {
  main: MainMarkets;
  goals: GoalsMarket;
  handicap: HandicapMarkets;
  halves: HalvesMarkets;
  combos: ComboMarkets;
  specials: SpecialMarkets;
  players: PlayerMarkets;
}


export const sampleFootballMarket: FootballMarkets = {
  main: {
    oneXtwo: { home: { value: 1.85 }, draw: { value: 3.40 }, away: { value: 4.20 } },
    doubleChance: { "HomeorDraw": { value: 1.30 }, "HomeorAway": { value: 1.52 }, "DraworAway": { value: 2.05 } },
    btts: { yes: { value: 1.90 }, no: { value: 1.80 } },
    drawNoBet: { home: { value: 1.45 }, away: { value: 2.60 } },
    correctScore: [
      { score: "1-0", odd: { value: 5.50 } },
      { score: "2-1", odd: { value: 8.00 } },
      { score: "2-2", odd: { value: 14.00 } },
    ],
    halftimeFulltime: {
      home_home: { value: 3.20 }, home_draw: { value: 15.0 }, home_away: { value: 26.0 },
      draw_home: { value: 5.0 }, draw_draw: { value: 5.5 }, draw_away: { value: 7.5 },
      away_home: { value: 34.0 }, away_draw: { value: 15.0 }, away_away: { value: 4.5 }
    },
    winningMargin: { home1: { value: 4.5 }, home2: { value: 7.0 }, home3plus: { value: 15.0 }, draw: { value: 3.5 }, away1: { value: 5.0 }, away2: { value: 9.0 }, away3plus: { value: 20.0 } },
    totalGoalsBands: { "0-1": { value: 3.2 }, "2-3": { value: 1.9 }, "4-5": { value: 3.4 }, "6+": { value: 12.0 } }
  },
 goals: {
  // ---------------------------------------------
  // 1. MATCH TOTAL GOALS (FULL GAME OVER/UNDER)
  // ---------------------------------------------
  matchTotalGoals: {
    title: "Match Total Goals",
    lines: [
      { line: 0.5, over: 1.45, under: 2.85 },
      { line: 1.5, over: 1.80, under: 2.00 },
      { line: 2.5, over: 2.40, under: 1.55 },
      { line: 3.5, over: 3.80, under: 1.25 },
      { line: 4.5, over: 7.20, under: 1.08 },
    ],
  },

  // ---------------------------------------------
  // 2. TEAM TOTAL GOALS (EACH TEAM)
  // ---------------------------------------------
  teamTotalGoals: {
    Arsenal: {
      title: "Arsenal Total Goals",
      lines: [
        { line: 0.5, over: 1.60, under: 2.10 },
        { line: 1.5, over: 2.45, under: 1.70 },
        { line: 2.5, over: 4.80, under: 1.35 },
      ],
    },
    Liverpool: {
      title: "Liverpool Total Goals",
      lines: [
        { line: 0.5, over: 1.90, under: 1.85 },
        { line: 1.5, over: 2.80, under: 1.45 },
        { line: 2.5, over: 5.20, under: 1.28 },
      ],
    },
  },

  // ---------------------------------------------
  // 3. BOTH TEAMS TO SCORE
  // ---------------------------------------------
  bothTeamsToScore: {
    title: "Both Teams To Score",
    options: [
      { label: "Yes", value: 1.75 },
      { label: "No", value: 2.00 },
    ],
  },

  // ---------------------------------------------
  // 4. FIRST TEAM TO SCORE
  // ---------------------------------------------
  firstTeamToScore: {
    title: "First Team To Score",
    options: [
      { team: "Arsenal", value: 1.70 },
      { team: "Liverpool", value: 2.10 },
      { team: "No Goal", value: 9.50 },
    ],
  },

  // ---------------------------------------------
  // 5. LAST TEAM TO SCORE
  // ---------------------------------------------
  lastTeamToScore: {
    title: "Last Team To Score",
    options: [
      { team: "Arsenal", value: 1.75 },
      { team: "Liverpool", value: 2.00 },
      { team: "No Goal", value: 10.0 },
    ],
  },

  // ---------------------------------------------
  // 6. EXACT GOALS (BY TEAM)
  // ---------------------------------------------
  exactGoals: {
    Arsenal: {
      title: "Arsenal Exact Goals",
      options: [
        { goals: "0", value: 3.5 },
        { goals: "1", value: 2.0 },
        { goals: "2", value: 3.2 },
        { goals: "3+", value: 8.0 },
      ],
    },
    Liverpool: {
      title: "Liverpool Exact Goals",
      options: [
        { goals: "0", value: 3.8 },
        { goals: "1", value: 2.1 },
        { goals: "2", value: 3.0 },
        { goals: "3+", value: 7.5 },
      ],
    },
  },

  // ---------------------------------------------
  // 7. GOALS – FIRST HALF (Match)
  // ---------------------------------------------
  firstHalfTotalGoals: {
    title: "1st Half Total Goals",
    lines: [
      { line: 0.5, over: 1.65, under: 2.10 },
      { line: 1.5, over: 3.00, under: 1.40 },
      { line: 2.5, over: 6.80, under: 1.18 },
    ],
  },

  // ---------------------------------------------
  // 8. TEAM GOALS – FIRST HALF (Each Team)
  // ---------------------------------------------
  firstHalfTeamTotalGoals: {
    Arsenal: {
      title: "Arsenal 1st Half Goals",
      lines: [
        { line: 0.5, over: 2.10, under: 1.65 },
        { line: 1.5, over: 5.00, under: 1.20 },
      ],
    },
    Liverpool: {
      title: "Liverpool 1st Half Goals",
      lines: [
        { line: 0.5, over: 1.95, under: 1.75 },
        { line: 1.5, over: 4.60, under: 1.25 },
      ],
    },
  },

  // ---------------------------------------------
  // 9. RACE TO X GOALS
  // ---------------------------------------------
  raceToGoals: {
    title: "Race To Goals",
    options: [
      { label: "First to 1 Goal", Arsenal: 1.80, Liverpool: 2.00, Neither: 8.0 },
      { label: "First to 2 Goals", Arsenal: 2.80, Liverpool: 3.10, Neither: 1.45 },
      { label: "First to 3 Goals", Arsenal: 6.50, Liverpool: 7.20, Neither: 1.10 },
    ],
  },
  },
  handicap: {
    asianHandicapFullTime: [ { line: -1.5, home: { value: 3.4 }, away: { value: 1.3 } }, { line: +1.5, home: { value: 1.2 }, away: { value: 4.0 } } ],
    asianHandicap1stHalf: [ { line: -0.5, home: { value: 2.0 }, away: { value: 1.8 } } ]
  },
  halves: {
    firstHalf1X2: { home: { value: 2.4 }, draw: { value: 2.8 }, away: { value: 3.2 } },
    secondHalf1X2: { home: { value: 2.0 }, draw: { value: 3.1 }, away: { value: 4.0 } },
    firstHalfOverUnder: { "0.5": { over: { value: 1.7 }, under: { value: 2.0 } }, "1.5": { over: { value: 2.5 }, under: { value: 1.5 } } },
    secondHalfOverUnder: { "0.5": { over: { value: 1.8 }, under: { value: 1.9 } } }
  },
  combos: {
    bttsAndOverUnder: [ { btts: "yes", line: "over_2_5", odd: { value: 2.8 } } ],
    doubleChanceAndBTTS: [ { dc: "1X", btts: "yes", odd: { value: 2.1 } } ]
  },
  specials: {
    cleanSheet: { home: { value: 1.8 }, away: { value: 2.0 } },
    scoreInBothHalves: { home: { value: 3.5 }, away: { value: 4.0 } },
    toWinEitherHalf: { home: { value: 1.5 }, away: { value: 2.5 } }
  },
  players: {
    anytimeGoalscorer: { "Player A": { value: 2.1 }, "Player B": { value: 3.5 } },
    firstGoalscorer: { "Player A": { value: 4.5 }, "Player B": { value: 5.0 } },
    lastGoalscorer: { "Player A": { value: 6.0 }, "Player B": { value: 7.0 } }
  }
};
