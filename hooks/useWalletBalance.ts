import { useQuery } from "@tanstack/react-query";
import { walletService } from "@/services/walletService";
import { useAuthStore } from "@/store/useAuthStore";

export const walletKeys = {
  balance: ["wallet", "balance"] as const,
};

/**
 * Balances move whenever a bet settles or a deposit lands, so this is kept
 * short-lived and refetched when the screen regains focus.
 */
export const useWalletBalance = () => {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: walletKeys.balance,
    queryFn: walletService.getBalance,
    enabled: Boolean(user),
    staleTime: 30 * 1000,
    retry: 1,
  });
};
