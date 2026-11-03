import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { useAuthStore } from "@/store/useAuthStore";
import { AvatarUpload, UpdateProfileInput } from "@/types/profile.types";

export const profileKeys = {
  detail: ["profile"] as const,
  public: (id: string) => ["profile", "public", id] as const,
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

/** Another user's public profile, for bet counterparties. */
export const usePublicProfile = (id: string | undefined) =>
  useQuery({
    queryKey: profileKeys.public(id ?? ""),
    queryFn: () => userService.getPublicProfile(id as string),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

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

/** Stores a generated avatar value, e.g. a locally chosen SVG id. */
export const useSetAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (avatarUrl: string) => userService.setAvatar(avatarUrl),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: profileKeys.detail });
    },
  });
};

export const useOnlineUsers = (withinMinutes = 15, limit = 20) =>
  useQuery({
    queryKey: ["users", "online", withinMinutes, limit],
    queryFn: () => userService.getOnlineUsers(withinMinutes, limit),
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
    retry: 1,
  });

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: AvatarUpload) => userService.uploadAvatar(file),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: profileKeys.detail,
      });
    },
  });
};
