import { footballData } from "@/constants/dataOne";
import { Match } from "@/types/sports.types";

/**
 * TEMPORARY. The sports API has no live fixtures yet, so the existing local
 * football data stands in purely so the screen flow can be reviewed.
 * Delete this file and its use in P2PLanding once live matches return data.
 */
export const previewMatches: Match[] = footballData
  .flatMap((country) =>
    country.leagues.flatMap((league) =>
      league.matches.map((m) => ({
        id: `preview-${league.name}-${m.id}`,
        homeTeam: m.home,
        awayTeam: m.away,
        status: "LIVE" as const,
        homeScore: 1,
        awayScore: 0,
        league: {
          id: league.name,
          name: league.name,
          country: country.country,
          sport: { id: "football", name: "Football" },
        },
        markets: [
          {
            betType: "MATCH_WINNER",
            outcomes: [
              { prediction: { winner: "home" }, price: Number(m.odds?.home ?? 2) },
              { prediction: { winner: "draw" }, price: Number(m.odds?.draw ?? 3) },
              { prediction: { winner: "away" }, price: Number(m.odds?.away ?? 3) },
            ],
          },
        ],
      }))
    )
  )
  .slice(0, 6);
