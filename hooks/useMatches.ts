import { useQuery } from "@tanstack/react-query";
import { sportsService } from "@/services/sportsService";
import { MatchFilters } from "@/types/sports.types";

export const sportKeys = { list: ["sports"] as const };

export const useSports = () =>
  useQuery({
    queryKey: sportKeys.list,
    queryFn: sportsService.getSports,
    staleTime: 30 * 60 * 1000,
    retry: 1,
  });

export const matchKeys = {
  list: (filters?: MatchFilters) => ["matches", filters ?? {}] as const,
};

/** The marketplace is public, so this does not wait for a session. */
export const useMatches = (filters?: MatchFilters) =>
  useQuery({
    queryKey: matchKeys.list(filters),
    queryFn: () => sportsService.getMatches(filters),
    staleTime: 60 * 1000,
    retry: 1,
  });

/** Live scores move constantly, so these refresh on a timer. */
export const useLiveMatches = (limit = 10) =>
  useQuery({
    queryKey: matchKeys.list({ status: "LIVE", limit }),
    queryFn: () => sportsService.getMatches({ status: "LIVE", limit }),
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
    retry: 1,
  });
