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

/** A player circle on the pitch. */
export interface PitchPlayer {
  number: number;
  /** Short label shown under the circle, e.g. "Gabriel J.". */
  label: string;
  keeper?: boolean;
}

/** A row in the "starting XI" list. */
export interface KeyPlayer {
  number: number;
  name: string;
  position: string;
  /** Scorer: name is highlighted and a goal icon is shown. */
  scored?: boolean;
  /** Substituted off ("out") or on ("in") at this minute. */
  sub?: { direction: "in" | "out"; minute: number };
}

export interface SubPlayer {
  number: number;
  name: string;
}

export interface TeamLineup {
  formation: string;
  /** Goalkeeper first, then each line from defence to attack. */
  lines: PitchPlayer[][];
  keyPlayers: KeyPlayer[];
  substitutes: SubPlayer[];
}

/** One moment on the timeline, listed oldest first (the screen shows newest on top). */
export type TimelineItem =
  | {
      kind: "event";
      /** Shown as written, e.g. "45+2'". */
      minute: string;
      side: "home" | "away";
      type: "goal" | "yellow" | "red" | "sub" | "attack";
      /** Player name, or the title for a sub / attack. */
      title: string;
      /** Grey line under the title, e.g. "Header (1-1)". */
      detail?: string;
      /** Substitution only. */
      playerIn?: string;
      playerOut?: string;
    }
  | { kind: "pill"; label: string };

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
  /** Minute shown in the LIVE badge, or null once the match has ended. */
  liveMinute: number | null;
  timeline: TimelineItem[];
}

const pp = (number: number, label: string, keeper = false): PitchPlayer => ({
  number,
  label,
  keeper,
});

export const mockAnalytics: MatchAnalytics = {
  matchId: "sim",
  league: "Premier League",
  status: "Live 68'",
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
        [pp(1, "Sanchez", true)],
        [pp(3, "Cucurella"), pp(6, "Thiago S."), pp(2, "Disasi"), pp(27, "Gusto")],
        [pp(8, "Enzo"), pp(25, "Caicedo"), pp(23, "Gallagher")],
        [pp(10, "Mudryk"), pp(15, "Jackson"), pp(20, "Palmer")],
      ],
      keyPlayers: [
        { number: 1, name: "Robert Sanchez", position: "GK" },
        { number: 6, name: "Thiago Silva", position: "CB" },
        { number: 20, name: "Cole Palmer", position: "RW", scored: true },
        { number: 10, name: "Mykhailo Mudryk", position: "", sub: { direction: "out", minute: 62 } },
      ],
      substitutes: [
        { number: 11, name: "Madueke" },
        { number: 28, name: "Petrovic" },
        { number: 26, name: "Colwill" },
      ],
    },
    away: {
      formation: "4-2-3-1",
      lines: [
        [pp(22, "Raya", true)],
        [pp(35, "Zinchenko"), pp(6, "Gabriel"), pp(2, "Saliba"), pp(4, "White")],
        [pp(41, "Rice"), pp(20, "Jorginho")],
        [pp(11, "Martinelli"), pp(8, "Odegaard"), pp(7, "Saka")],
        [pp(9, "Gabriel J.")],
      ],
      keyPlayers: [
        { number: 8, name: "Martin Ødegaard", position: "CAM" },
        { number: 41, name: "Declan Rice", position: "CDM" },
        { number: 19, name: "Leandro Trossard", position: "", sub: { direction: "in", minute: 62 } },
      ],
      substitutes: [
        { number: 29, name: "Havertz" },
        { number: 14, name: "Nketiah" },
        { number: 15, name: "Kiwior" },
      ],
    },
  },
  liveMinute: 68,
  timeline: [
    { kind: "pill", label: "Match started" },
    { kind: "event", minute: "12'", side: "home", type: "goal", title: "N. Jackson", detail: "Assisted by E. Fernandez (1-0)" },
    { kind: "event", minute: "24'", side: "away", type: "goal", title: "B. Saka", detail: "Header (1-1)" },
    { kind: "event", minute: "45+2'", side: "away", type: "yellow", title: "W. Saliba", detail: "Unsporting behavior" },
    { kind: "pill", label: "Half time (1-1)" },
    { kind: "event", minute: "48'", side: "home", type: "goal", title: "C. Palmer", detail: "Penalty Kick (2-1)" },
    { kind: "event", minute: "58'", side: "home", type: "sub", title: "Substitution", playerIn: "Mudryk", playerOut: "Sterling" },
    { kind: "event", minute: "65'", side: "away", type: "attack", title: "Dangerous Attack", detail: "Arsenal pressure" },
  ],
};
