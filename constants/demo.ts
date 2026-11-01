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
