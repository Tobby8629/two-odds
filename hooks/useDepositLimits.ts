import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { walletService } from "@/services/walletService";
import { useAuthStore } from "@/store/useAuthStore";
import {
  DepositLimits,
  UpdateDepositLimitsInput,
  WalletCurrency,
} from "@/types/wallet.types";

export const depositLimitKeys = {
  all: ["wallet", "deposit-limits"] as const,
};

const NO_LIMITS: DepositLimits = {
  daily: null,
  weekly: null,
  monthly: null,
};

/**
 * The endpoint returns an entry per currency, so the caller selects one and
 * gets NO_LIMITS when the backend has no row for it yet.
 */
export const useDepositLimits = (
  currency: WalletCurrency
) => {
  const user = useAuthStore((state) => state.user);

  const query = useQuery({
    queryKey: depositLimitKeys.all,
    queryFn: walletService.getDepositLimits,
    enabled: Boolean(user),
    staleTime: 60 * 1000,
    retry: 1,
  });

  const limits =
    query.data?.find(
      (entry) => entry.currency === currency
    )?.limits ?? NO_LIMITS;

  return { ...query, limits };
};

export const useUpdateDepositLimits = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateDepositLimitsInput) =>
      walletService.updateDepositLimits(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: depositLimitKeys.all,
      });
    },
  });
};
