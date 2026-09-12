import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { kycService } from "@/services/kycService";
import { useAuthStore } from "@/store/useAuthStore";
import { SubmitKycInput } from "@/types/kyc.types";

export const kycKeys = {
  status: ["kyc", "status"] as const,
};

/**
 * A selfie submission resolves asynchronously via webhook, so this polls while
 * the status is PENDING and stops once it settles.
 */
export const useKycStatus = () => {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: kycKeys.status,
    queryFn: kycService.getStatus,
    enabled: Boolean(user),
    staleTime: 30 * 1000,
    retry: 1,
    refetchInterval: (query) =>
      query.state.data?.kycStatus === "PENDING" ? 10 * 1000 : false,
  });
};

export const useSubmitKyc = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: SubmitKycInput) => kycService.submit(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: kycKeys.status });
    },
  });
};
