/**
 * Fixtures for the match analytics screen (stats, lineups, timeline).
 * No endpoint serves this yet; hooks/useMatchAnalytics.ts returns it in dev
 * builds. Replace the hook's query function and delete this file when wired.
 */

export interface TeamSide {
  name: string;
  short: string;
}

export interface StatRow {
  label: string;
  home: number;
  away: number;
}

export interface LineupPlayer {
  number: number;
  name: string;
  /** Goal or card marker shown next to the name, if any. */
  note?: "goal" | "yellow" | "red";
  rating?: number;
}

export interface TeamLineup {
  formation: string;
  /** Goalkeeper first, then each line from defence to attack. */
  lines: LineupPlayer[][];
  substitutes: LineupPlayer[];
}

export interface TimelineEvent {
  minute: number;
  side: "home" | "away";
  type: "goal" | "yellow" | "red" | "sub";
  player: string;
  /** Second line, e.g. the assist or the player replaced. */
  detail?: string;
}

export interface MatchAnalytics {
  matchId: string;
  league: string;
  status: string;
  home: TeamSide;
  away: TeamSide;
  homeScore: number;
  awayScore: number;
  possession: { home: number; away: number };
  stats: StatRow[];
  cards: { homeYellow: number; homeRed: number; awayYellow: number; awayRed: number };
  lineups: { home: TeamLineup; away: TeamLineup };
  timeline: TimelineEvent[];
}

const p = (number: number, name: string, extra: Partial<LineupPlayer> = {}): LineupPlayer => ({
  number,
  name,
  ...extra,
});

export const mockAnalytics: MatchAnalytics = {
  matchId: "sim",
  league: "Premier League",
  status: "Full time",
  home: { name: "Chelsea", short: "CHE" },
  away: { name: "Arsenal", short: "ARS" },
  homeScore: 2,
  awayScore: 1,
  possession: { home: 54, away: 46 },
  stats: [
    { label: "Shots", home: 12, away: 9 },
    { label: "Shots on target", home: 6, away: 4 },
    { label: "Corners", home: 7, away: 3 },
    { label: "Fouls", home: 9, away: 11 },
  ],
  cards: { homeYellow: 2, homeRed: 0, awayYellow: 3, awayRed: 1 },
  lineups: {
    home: {
      formation: "4-3-3",
      lines: [
        [p(1, "R. Sanchez")],
        [p(24, "R. James"), p(6, "T. Silva"), p(26, "L. Colwill"), p(21, "B. Chilwell")],
        [p(8, "E. Fernandez"), p(25, "M. Caicedo"), p(20, "C. Palmer", { note: "goal" })],
        [p(7, "R. Sterling"), p(15, "N. Jackson", { note: "goal" }), p(11, "N. Madueke")],
      ],
      substitutes: [p(12, "M. Mudryk"), p(10, "C. Nkunku"), p(17, "A. Disasi")],
    },
    away: {
      formation: "4-3-3",
      lines: [
        [p(1, "D. Raya")],
        [p(4, "B. White"), p(2, "W. Saliba"), p(6, "Gabriel"), p(35, "O. Zinchenko")],
        [p(8, "M. Odegaard"), p(41, "D. Rice", { note: "yellow" }), p(29, "K. Havertz")],
        [p(7, "B. Saka", { note: "goal" }), p(9, "G. Jesus"), p(11, "G. Martinelli")],
      ],
      substitutes: [p(19, "L. Trossard"), p(14, "E. Nketiah"), p(18, "T. Tomiyasu")],
    },
  },
  timeline: [
    { minute: 12, side: "home", type: "goal", player: "C. Palmer", detail: "Assist: R. Sterling" },
    { minute: 27, side: "away", type: "yellow", player: "D. Rice" },
    { minute: 38, side: "away", type: "goal", player: "B. Saka", detail: "Assist: M. Odegaard" },
    { minute: 55, side: "home", type: "sub", player: "M. Mudryk", detail: "For N. Madueke" },
    { minute: 64, side: "home", type: "goal", player: "N. Jackson", detail: "Assist: C. Palmer" },
    { minute: 78, side: "away", type: "red", player: "Gabriel" },
  ],
};
