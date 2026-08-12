import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { betsService } from "@/services/betsService";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Bet,
  CreateCustomBetInput,
  HISTORY_STATUSES,
  MyBetsFilters,
  OpenBetsFilters,
} from "@/types/bets.types";

export const betKeys = {
  open: (filters?: OpenBetsFilters) =>
    ["bets", "open", filters ?? {}] as const,
  my: (filters?: MyBetsFilters) =>
    ["bets", "my", filters ?? {}] as const,
  detail: (id: string) => ["bets", "detail", id] as const,
};

/** The marketplace is public, so this does not wait for a session. */
export const useOpenBets = (filters?: OpenBetsFilters) =>
  useQuery({
    queryKey: betKeys.open(filters),
    queryFn: () => betsService.getOpenBets(filters),
    staleTime: 30 * 1000,
    retry: 1,
  });

export const useMyBets = (filters?: MyBetsFilters) => {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: betKeys.my(filters),
    queryFn: () => betsService.getMyBets(filters),
    enabled: Boolean(user),
    staleTime: 30 * 1000,
    retry: 1,
  });
};

/**
 * The History tab spans five statuses but /bets/my only filters one at a time,
 * so this issues one request per status and merges them. Server pagination
 * cannot be preserved across that union, hence the high per-status limit.
 */
export const useMyBetHistory = (limit = 50) => {
  const user = useAuthStore((state) => state.user);

  const queries = useQueries({
    queries: HISTORY_STATUSES.map((status) => ({
      queryKey: betKeys.my({ status, category: "CUSTOM" as const, limit }),
      queryFn: () =>
        betsService.getMyBets({
          status,
          category: "CUSTOM" as const,
          limit,
        }),
      enabled: Boolean(user),
      staleTime: 30 * 1000,
      retry: 1,
    })),
  });

  const bets: Bet[] = queries.flatMap(
    (query) => query.data?.bets ?? []
  );

  /* Newest first, with undated bets last rather than sorted arbitrarily. */
  const sorted = [...bets].sort((a, b) => {
    if (!a.createdAt) return 1;
    if (!b.createdAt) return -1;

    return (
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
    );
  });

  return {
    bets: sorted,
    isPending: queries.some((query) => query.isPending),
    isError: queries.some((query) => query.isError),
    refetch: () => queries.forEach((query) => query.refetch()),
  };
};

export const useBet = (id: string | undefined) =>
  useQuery({
    queryKey: betKeys.detail(id ?? ""),
    queryFn: () => betsService.getBet(id as string),
    enabled: Boolean(id),
    retry: 1,
  });

/** Any mutation can move a bet between lists, so all bet lists are dropped. */
const useInvalidateBets = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({ queryKey: ["bets"] });
};

export const useCreateCustomBet = () => {
  const invalidate = useInvalidateBets();

  return useMutation({
    mutationFn: (input: CreateCustomBetInput) =>
      betsService.createCustomBet(input),
    onSuccess: () => void invalidate(),
  });
};

export const useTakeBet = () => {
  const invalidate = useInvalidateBets();

  return useMutation({
    mutationFn: (id: string) => betsService.takeBet(id),
    onSuccess: () => void invalidate(),
  });
};

export const useCancelBet = () => {
  const invalidate = useInvalidateBets();

  return useMutation({
    mutationFn: (id: string) => betsService.cancelBet(id),
    onSuccess: () => void invalidate(),
  });
};
