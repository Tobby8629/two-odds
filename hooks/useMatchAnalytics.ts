import { useQuery } from "@tanstack/react-query";
import { SIMULATE } from "@/constants/demo";
import { mockAnalytics, MatchAnalytics } from "@/constants/mockAnalytics";

/*
 * The single place to wire the real endpoint: replace the body of
 * fetchAnalytics with a service call that returns MatchAnalytics.
 */
const fetchAnalytics = async (matchId: string): Promise<MatchAnalytics | null> => {
  if (SIMULATE.matchAnalytics) {
    await new Promise((r) => setTimeout(r, 400));
    return { ...mockAnalytics, matchId };
  }
  return null;
};

export const useMatchAnalytics = (matchId: string) =>
  useQuery({
    queryKey: ["matchAnalytics", matchId],
    queryFn: () => fetchAnalytics(matchId),
    staleTime: 60 * 1000,
  });
