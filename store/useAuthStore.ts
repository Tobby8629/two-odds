import axios from "axios";
import { create } from "zustand";
import { tokenStorage } from "@/services/tokenStorage";
import { getRequest, publicApi } from "@/components/api/Axois";
import { ApiResponse } from "@/types/api.types";
import { useProfileStore } from "@/store/useProfileStore";

/** Shape returned by GET /auth/me. */
export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  walletAddress?: string;
  role?: string;
  isEmailVerified?: boolean;
  isActive?: boolean;
  isPremium?: boolean;
}

interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface AuthResponseData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

type AuthResponse = ApiResponse<AuthResponseData>;

type RefreshResponse = ApiResponse<{
  accessToken: string;
  refreshToken?: string;
}>;

interface AuthState {
  user: User | null;
  initialized: boolean;
  isLoading: boolean;
  error: string | null;

  initializeAuth: () => Promise<void>;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
  clearSession: () => Promise<void>;
  clearError: () => void;
}

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { message?: string }
      | undefined;

    return (
      data?.message ??
      error.message ??
      "The request could not be completed."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong.";
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  initialized: false,
  isLoading: false,
  error: null,

  initializeAuth: async () => {
    try {
      const refreshToken =
        await tokenStorage.getRefreshToken();
  
      if (!refreshToken) {
        set({
          user: null,
          initialized: true,
          error: null,
        });

        return;
      }

      const refreshResponse =
        await publicApi.post<RefreshResponse>(
          "/auth/refresh",
          {
            refreshToken,
          }
        );


      const {
        accessToken,
        refreshToken: newRefreshToken,
      } = refreshResponse.data.data;

  
      if (!accessToken) {
        throw new Error(
          "The refresh endpoint did not return an access token."
        );
      }

      await tokenStorage.saveTokens(
        accessToken,
        newRefreshToken ?? refreshToken
      );
      
      const meResponse = await getRequest<ApiResponse<User>>(
        "/auth/me",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const user = meResponse.data.data;

      if (!user?.id) {
        throw new Error(
          "The /auth/me endpoint did not return a user."
        );
      }

      set({
        user,
        initialized: true,
        error: null,
      });
    } catch (error) {
      await tokenStorage.clearTokens();

      set({
        user: null,
        initialized: true,
        error: null,
      });
    }
  },



  login: async ({ email, password }) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await publicApi.post<AuthResponse>(
        "/auth/login",
        {
          email: email.trim().toLowerCase(),
          password,
        }
      );
      console.log("Login response:", response);
      

      const { user, accessToken, refreshToken } =
        response.data.data;
      if (!accessToken || !refreshToken || !user) {
        throw new Error(
          "The login response is missing authentication data."
        );
      }

      await tokenStorage.saveTokens(
        accessToken,
        refreshToken
      );

      set({
        user,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      await tokenStorage.clearTokens();

      set({
        user: null,
        isLoading: false,
        error: getErrorMessage(error),
      });

      throw error;
    }
  },

  register: async ({ name, email, password }) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await publicApi.post<AuthResponse>(
        "/auth/register",
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
        }
      );

      const { user, accessToken, refreshToken } =
        response.data.data;

      if (!accessToken || !refreshToken || !user) {
        throw new Error(
          "The registration response is missing authentication data."
        );
      }

      await tokenStorage.saveTokens(
        accessToken,
        refreshToken
      );

      set({
        user,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      await tokenStorage.clearTokens();

      set({
        user: null,
        isLoading: false,
        error: getErrorMessage(error),
      });

      throw error;
    }
  },

  logout:  async() => {
    set({
      isLoading: true,
      error: null,
    });

    const refreshToken =
      await tokenStorage.getRefreshToken();

    try {
      /*
       * The backend should revoke or delete this refresh token.
       */
      if (refreshToken) {
        await publicApi.post("/auth/logout", {
          refreshToken,
        });
        
      }
    } catch (error) {
      /*
       * Local logout should still succeed when the backend cannot
       * be reached.
       */
      console.warn(
        "Backend logout failed:",
        getErrorMessage(error)
      );
    } finally {
      await tokenStorage.clearTokens();

      /*
       * The avatar is device-local, so it has to be dropped too or the next
       * account to sign in on this device inherits it.
       */
      useProfileStore.getState().resetAvatar();

      set({
        user: null,
        isLoading: false,
        error: null,
      });
    }
  },

  /*
   * Drops the local session without calling the backend. Used after the
   * account is already gone, where /auth/logout would only 401.
   */
  clearSession: async () => {
    await tokenStorage.clearTokens();
    useProfileStore.getState().resetAvatar();

    set({
      user: null,
      isLoading: false,
      error: null,
    });
  },

  clearError: () => {
    set({ error: null });
  },
}));