import { useAuthStore } from "@/store/useAuthStore";
import { previewMatches } from "@/constants/previewMatches";
import {
  Bet,
  BetCreator,
  BetMatch,
  BetStatus,
  CreateCustomBetInput,
  MyBetsFilters,
  OpenBetsFilters,
  PaginatedBets,
} from "@/types/bets.types";

/**
 * In-memory stand-in for the bets endpoints, used while SIMULATE.p2p is on.
 * It has the same method names and return shapes as services/betsService.ts,
 * so hooks/useBets.ts swaps one for the other. State lives only for the
 * session: create, take and cancel really change what the lists show.
 * Delete this file when the endpoints are wired.
 */

const me = () => useAuthStore.getState().user?.id ?? "me";
const wait = (ms = 450) => new Promise((r) => setTimeout(r, ms));
const hoursFromNow = (h: number) => new Date(Date.now() + h * 3600_000).toISOString();
const hoursAgo = (h: number) => new Date(Date.now() - h * 3600_000).toISOString();

const pick = (i: number) => previewMatches[i % Math.max(previewMatches.length, 1)];
const matchId = (i: number) => pick(i)?.id ?? `m${i}`;
const matchInfo = (i: number): BetMatch | undefined => {
  const m = pick(i);
  return m
    ? { homeTeam: m.homeTeam, awayTeam: m.awayTeam, league: m.league?.name, startTime: m.startTime, status: m.status, homeScore: m.homeScore, awayScore: m.awayScore }
    : undefined;
};

const CREATORS: Record<string, BetCreator> = {
  "u-ada": { username: "AdaNwosu", winRate: 0.92 },
  "u-chidi": { username: "ChidiOkoro", winRate: 0.81 },
  "u-ife": { username: "IfeBello", winRate: 0.74 },
};
const NOTES: Record<string, string> = {
  b1: "Strong at home and the other side is missing two starters.",
  b2: "Away form has been the best in the league for a month.",
  b3: "Both sides are cagey; I am backing a stalemate.",
};

let seq = 100;
let store: Bet[] | null = null;

/* Built lazily so the signed-in user's id can be used for "my" bets. */
const seed = (): Bet[] => {
  const mine = me();
  const base = { category: "CUSTOM" as const, currency: "NGN" };

  return [
    /* Open, from other players - the lobby. */
    { ...base, id: "b1", status: "OPEN", matchId: matchId(0), match: matchInfo(0), betType: "MATCH_WINNER", prediction: { winner: "home" }, odds: 2.1, stake: 5000, creatorId: "u-ada", createdAt: hoursAgo(1), expiresAt: hoursFromNow(5) },
    { ...base, id: "b2", status: "OPEN", matchId: matchId(1), match: matchInfo(1), betType: "MATCH_WINNER", prediction: { winner: "away" }, odds: 3.4, stake: 2500, creatorId: "u-chidi", createdAt: hoursAgo(2), expiresAt: hoursFromNow(8) },
    { ...base, id: "b3", status: "OPEN", matchId: matchId(2), match: matchInfo(2), betType: "MATCH_WINNER", prediction: { winner: "draw" }, odds: 3.0, stake: 10000, creatorId: "u-ife", createdAt: hoursAgo(3), expiresAt: hoursFromNow(3) },

    /* Mine. */
    { ...base, id: "b4", status: "OPEN", matchId: matchId(3), match: matchInfo(3), betType: "MATCH_WINNER", prediction: { winner: "home" }, odds: 1.9, stake: 4000, creatorId: mine, createdAt: hoursAgo(1), expiresAt: hoursFromNow(6) },
    { ...base, id: "b5", status: "MATCHED", matchId: matchId(4), match: matchInfo(4), betType: "MATCH_WINNER", prediction: { winner: "away" }, odds: 2.6, stake: 6000, creatorId: mine, takerId: "u-ada", createdAt: hoursAgo(5) },
    { ...base, id: "b6", status: "SETTLED_WIN", matchId: matchId(5), match: matchInfo(5), betType: "MATCH_WINNER", prediction: { winner: "home" }, odds: 2.0, stake: 3000, creatorId: mine, takerId: "u-chidi", createdAt: hoursAgo(30) },
    { ...base, id: "b7", status: "SETTLED_LOSS", matchId: matchId(6), match: matchInfo(6), betType: "MATCH_WINNER", prediction: { winner: "draw" }, odds: 3.2, stake: 2000, creatorId: "u-ife", takerId: mine, createdAt: hoursAgo(52) },
    { ...base, id: "b8", status: "CANCELLED", matchId: matchId(7), match: matchInfo(7), betType: "MATCH_WINNER", prediction: { winner: "away" }, odds: 2.4, stake: 1500, creatorId: mine, createdAt: hoursAgo(70) },
  ];
};

/* Fills the display-only fields the design shows but the bet itself does not carry. */
const decorate = (list: Bet[]): Bet[] =>
  list.map((b) => ({
    ...b,
    taker: b.taker ?? (b.takerId ? CREATORS[b.takerId] : undefined),
    creator: b.creator ?? (b.creatorId ? CREATORS[b.creatorId] : undefined),
    commentary: b.commentary ?? NOTES[b.id],
    viewers: b.viewers ?? 15,
    match: b.match ? { venue: "Main Stadium", ...b.match } : b.match,
  }));

const bets = () => (store ??= decorate(seed()));

const paginate = (list: Bet[]): PaginatedBets => ({
  bets: list,
  pagination: { page: 1, limit: list.length, total: list.length, totalPages: 1 },
});

const isMine = (b: Bet) => b.creatorId === me() || b.takerId === me();

export const mockBetsService = {
  async getOpenBets(filters?: OpenBetsFilters): Promise<PaginatedBets> {
    await wait();
    return paginate(
      bets().filter(
        (b) =>
          b.status === "OPEN" &&
          (!filters?.category || b.category === filters.category) &&
          (!filters?.matchId || b.matchId === filters.matchId)
      )
    );
  },

  async getMyBets(filters?: MyBetsFilters): Promise<PaginatedBets> {
    await wait();
    return paginate(
      bets().filter(
        (b) =>
          isMine(b) &&
          (!filters?.status || b.status === filters.status) &&
          (!filters?.category || b.category === filters.category)
      )
    );
  },

  async getBet(id: string): Promise<Bet | null> {
    await wait(250);
    return bets().find((b) => b.id === id) ?? null;
  },

  async createCustomBet(input: CreateCustomBetInput): Promise<Bet | null> {
    await wait(700);
    const bet: Bet = {
      id: `b${++seq}`,
      category: "CUSTOM",
      status: "OPEN",
      currency: "NGN",
      createdAt: new Date().toISOString(),
      creatorId: me(),
      ...input,
    };
    const found = previewMatches.find((m) => m.id === input.matchId);
    if (found) {
      bet.match = { homeTeam: found.homeTeam, awayTeam: found.awayTeam, league: found.league?.name, startTime: found.startTime, status: found.status };
    }
    bets().unshift(bet);
    return bet;
  },

  async takeBet(id: string): Promise<void> {
    await wait(700);
    const bet = bets().find((b) => b.id === id);
    if (!bet || bet.status !== "OPEN") throw new Error("This bet is no longer available.");
    if (bet.creatorId === me()) throw new Error("You cannot join your own bet.");
    bet.status = "MATCHED" as BetStatus;
    bet.takerId = me();
  },

  /** Dev-only: no endpoint settles a bet yet, so this lets the result flow be tested. */
  async settleBet(id: string, win: boolean): Promise<void> {
    await wait(500);
    const bet = bets().find((b) => b.id === id);
    if (!bet || bet.status !== "MATCHED") throw new Error("Only a matched bet can be settled.");
    bet.status = (win ? "SETTLED_WIN" : "SETTLED_LOSS") as BetStatus;
  },

  async cancelBet(id: string): Promise<void> {
    await wait(500);
    const bet = bets().find((b) => b.id === id);
    if (!bet || bet.status !== "OPEN") throw new Error("Only an open bet can be cancelled.");
    bet.status = "CANCELLED" as BetStatus;
  },
};
