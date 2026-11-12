/**
 * TEMPORARY demo switch for the P2P flow.
 *
 * While true, the P2P screens use local fixtures and do not call the backend:
 * matches come from constants/previewMatches and posting a bet resolves
 * locally so the success screen can be reviewed.
 *
 * Set to false to wire the flow to the live API, then delete this file and its
 * uses once the flow is signed off.
 */
export const DEMO_MODE = false;

/**
 * Fake data for features whose endpoint does not exist yet. Tied to __DEV__ so
 * a release build can never show simulated results as if they were real.
 */
export const SIMULATE = {
  /** GET /sports/matches?status=LIVE returns nothing until games are in play. */
  liveMatches: __DEV__,
  /** No endpoint tells the client that a deposit has been confirmed. */
  depositConfirmation: __DEV__,
  /** Deposit request bodies are unconfirmed (the real call returns 422), so dev builds fake the response. */
  depositRequest: __DEV__,
  /** No analytics endpoint exists yet (stats, lineups, timeline), so dev builds show fixtures. */
  matchAnalytics: __DEV__,
  /** The P2P flow runs on an in-memory bets service (constants/mockBets.ts) until the bets endpoints are wired. */
  p2p: __DEV__,
};
