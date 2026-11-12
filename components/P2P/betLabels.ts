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

/** "Warriors to Win" - the headline form used on the bet details screen. */
export const predictionTitle = (bet?: Bet | null) => {
  const p = (bet?.prediction ?? {}) as Record<string, unknown>;
  if (p.winner === "draw") return "Draw";
  if (p.winner === "home" && bet?.match) return `${bet.match.homeTeam} to Win`;
  if (p.winner === "away" && bet?.match) return `${bet.match.awayTeam} to Win`;
  return predictionLabel(bet);
};

/** Decimal odds as the American price the design shows, e.g. 1.87 -> "-115". */
export const americanOdds = (odds?: number | string | null) => {
  const d = Number(odds);
  if (!Number.isFinite(d) || d <= 1) return "-";
  return d >= 2 ? `+${Math.round((d - 1) * 100)}` : `-${Math.round(100 / (d - 1))}`;
};

/** "Marcus" from "MarcusVane"; the whole name when it has no capital split. */
export const firstName = (username?: string) => {
  if (!username) return "Their";
  const m = username.match(/^[A-Z][a-z]+/);
  return m ? m[0] : username;
};

/** "TONIGHT 8:30 PM", "TOMORROW 3:00 PM" or a short date, from an ISO start time. */
export const kickoffLabel = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const time = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }).toUpperCase();
  const today = new Date();
  const sameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();
  const tomorrow = new Date(today.getTime() + 86400000);
  if (sameDay(d, today)) return `${d.getHours() >= 17 ? "TONIGHT" : "TODAY"} ${time}`;
  if (sameDay(d, tomorrow)) return `TOMORROW ${time}`;
  return `${d.toLocaleDateString([], { month: "short", day: "numeric" }).toUpperCase()} ${time}`;
};
