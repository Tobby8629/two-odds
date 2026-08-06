import { getRequest, patchRequest } from "@/components/api/Axois";
import {
  ApiResponse,
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
};
