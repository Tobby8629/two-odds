import { Bet } from "@/types/bets.types";

/** "Arsenal vs Man City", or a neutral label when the bet carries no fixture. */
export const matchTitle = (bet?: Bet | null) =>
  bet?.match ? `${bet.match.homeTeam} vs ${bet.match.awayTeam}` : "Custom bet";

/**
 * Readable call for a bet: { winner: "home" } becomes "Arsenal Win" when the
 * fixture is known. Shapes it does not recognise fall back to key: value.
 */
export const predictionLabel = (bet?: Bet | null) => {
  const p = (bet?.prediction ?? {}) as Record<string, unknown>;
  const home = bet?.match?.homeTeam;
  const away = bet?.match?.awayTeam;

  const side = (t: unknown) => (t === "home" ? home : t === "away" ? away : undefined);

  if (p.winner !== undefined) {
    if (p.winner === "draw") return "Draw";
    const name = side(p.winner);
    return name ? `${name} Win` : String(p.winner);
  }

  if (p.line !== undefined && p.type !== undefined) {
    const who = side(p.team);
    const type = String(p.type).replace(/^./, (c) => c.toUpperCase());
    return `${who ? who + " " : ""}${type} ${p.line}`;
  }

  const entries = Object.entries(p);
  if (!entries.length) return bet?.betType ?? "Custom bet";
  return entries.map(([k, v]) => `${k}: ${String(v)}`).join(", ");
};

/** Short reference such as "#P2P-88291" built from the bet id. */
export const betRef = (id?: string) => {
  const digits = (id ?? "").replace(/\D/g, "");
  return `#P2P-${(digits || "0").padStart(5, "0").slice(-5)}`;
};
