import { getRequest, patchRequest, postRequest } from "@/components/api/Axois";
import { ApiResponse } from "@/types/api.types";
import {
  AvatarUpload,
  PresignedUpload,
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

  /** Users active within the window, most recently seen first. */
  async getOnlineUsers(withinMinutes = 15, limit = 20): Promise<PublicProfile[]> {
    const response = await getRequest<ApiResponse<PublicProfile[]>>(
      "/users/online",
      { params: { withinMinutes, limit } }
    );

    return response.data?.data ?? [];
  },

  /**
   * Stores an avatar value directly. Takes an uploaded fileUrl or a generated
   * avatar string, so a locally chosen SVG can follow the account.
   */
  async setAvatar(avatarUrl: string): Promise<string | null> {
    const response = await postRequest<
      ApiResponse<{ id: string; avatarUrl: string }>
    >("/users/profile/avatar", { avatarUrl });

    return response.data?.data?.avatarUrl ?? null;
  },

  /**
   * Three steps: ask for a presigned URL, PUT the bytes straight to S3, then
   * hand the returned fileUrl back. The file never passes through the API.
   */
  async uploadAvatar(file: AvatarUpload): Promise<string | null> {
    const contentType = file.type ?? "image/jpeg";

    const presign = await postRequest<ApiResponse<PresignedUpload>>(
      "/uploads/presign",
      {
        purpose: "avatar",
        contentType,
        contentLength: file.size,
      }
    );

    const { uploadUrl, fileUrl } = presign.data?.data ?? {};

    if (!uploadUrl || !fileUrl) {
      throw new Error("The upload could not be prepared.");
    }

    const body = await (await fetch(file.uri)).blob();

    /* S3 signs the content type, and rejects any Authorization header. */
    const put = await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": contentType },
      body,
    });

    if (!put.ok) {
      throw new Error(`Upload failed with status ${put.status}`);
    }

    return userService.setAvatar(fileUrl);
  },
};
