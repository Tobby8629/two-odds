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
export interface GoalsMarkets {
  teamTotalGoals: { [team: string]: { over: Odd; under: Odd } };
  firstTeamToScore: { [team: string]: Odd };
  exactGoals: { [team: string]: { 0: Odd; 1: Odd; 2: Odd; "3+": Odd } };
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
  goals: GoalsMarkets;
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
    teamTotalGoals: { Arsenal: { over: { value: 1.60 }, under: { value: 2.10 } }, Liverpool: { over: { value: 1.90 }, under: { value: 1.85 } } },
    firstTeamToScore: { Arsenal: { value: 1.70 }, Liverpool: { value: 2.10 } },
    exactGoals: { Arsenal: { 0: { value: 3.5 }, 1: { value: 2.0 }, 2: { value: 3.2 }, "3+": { value: 8.0 } } }
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
