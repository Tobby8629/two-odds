import { getRequest, patchRequest, postRequest } from "@/components/api/Axois";
import { ApiResponse } from "@/types/api.types";
import {
  AvatarUpload,
  PublicProfile,
  UpdateProfileInput,
  UserProfile,
} from "@/types/profile.types";

/**
 * Thin typed wrappers over the /users endpoints. Unwrapping the
 * { success, data } envelope here keeps it out of the components.
 */
export const userService = {
  async getProfile(): Promise<UserProfile> {
    const response =
      await getRequest<ApiResponse<UserProfile>>(
        "/users/profile"
      );

    const profile = response.data.data;

    if (!profile?.id) {
      throw new Error(
        "The profile endpoint did not return a user."
      );
    }

    return profile;
  },

  async updateProfile(
    input: UpdateProfileInput
  ): Promise<UserProfile> {
    const response =
      await patchRequest<ApiResponse<UserProfile>>(
        "/users/profile",
        input
      );

    return response.data.data;
  },

  /** Public, unauthenticated. Used for bet counterparties. */
  async getPublicProfile(id: string): Promise<PublicProfile | null> {
    const response =
      await getRequest<ApiResponse<PublicProfile>>(`/users/${id}`);

    return response.data?.data ?? null;
  },

  /**
   * multipart/form-data with field name `avatar`. The instance default of
   * application/json has to be overridden or the boundary is dropped.
   */
  async uploadAvatar(file: AvatarUpload): Promise<string | null> {
    const form = new FormData();

    form.append("avatar", {
      uri: file.uri,
      name: file.name ?? "avatar.jpg",
      type: file.type ?? "image/jpeg",
    } as unknown as Blob);

    const response = await postRequest<
      ApiResponse<{ id: string; avatarUrl: string }>
    >("/users/profile/avatar", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data?.data?.avatarUrl ?? null;
  },
};
