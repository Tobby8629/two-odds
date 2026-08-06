import axios from "axios";
import { create } from "zustand";
import { tokenStorage } from "@/services/tokenStorage";
import { axiosInstance, getRequest, publicApi } from "@/components/api/Axois";

// export interface UserRes {
//   data: User;
// }


export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
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

interface AuthResponseData{
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface AuthResponse {
 data: AuthResponseData;
}

interface RefreshResponse {
  data: {
    accessToken: string;
    refreshToken?: string;
  };
}

// interface RefreshResponse {
//   accessToken: string;
//   refreshToken?: string;
// }

interface AuthState {
  user: User | null;
  initialized: boolean;
  isLoading: boolean;
  error: string | null;

  initializeAuth: () => Promise<void>;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
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
      
      const user = (await getRequest<User>("/auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })).data

      set({
        user: user,
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

      set({
        user: null,
        isLoading: false,
        error: null,
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));