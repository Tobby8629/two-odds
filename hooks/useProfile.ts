import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { useAuthStore } from "@/store/useAuthStore";
import { UpdateProfileInput } from "@/types/profile.types";

export const profileKeys = {
  detail: ["profile"] as const,
};

/**
 * Server-owned profile data. Only runs once there is a session, so it does
 * not fire a doomed request while the app is still restoring tokens.
 */
export const useProfile = () => {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: profileKeys.detail,
    queryFn: userService.getProfile,
    enabled: Boolean(user),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

/**
 * PATCH /users/profile documents no response body, so the cache is
 * refetched rather than patched from the mutation result.
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateProfileInput) =>
      userService.updateProfile(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: profileKeys.detail,
      });
    },
    onError: (error: unknown) => {
      console.error("Profile update failed:", error);
    },
  });
};
