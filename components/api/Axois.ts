import { tokenStorage } from "@/services/tokenStorage";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const API_URL =
  "https://twoodds-backenddev.onrender.com/api/v1/";

interface RetryRequestConfig
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface RefreshResponse {
  accessToken: string;
  refreshToken?: string;
}

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const publicApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getRequest = <T = unknown>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return axiosInstance.get<T>(url, config);
};

const postRequest = <T = unknown>(
  url: string,
  data: unknown,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return axiosInstance.post<T>(url, data, config);
};

const putRequest = <T = unknown>(
  url: string,
  data: unknown,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return axiosInstance.put<T>(url, data, config);
};

const deleteRequest = <T = unknown>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return axiosInstance.delete<T>(url, config);
};

let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  const refreshToken =
    await tokenStorage.getRefreshToken();

  if (!refreshToken) {
    throw new Error(
      "No refresh token is available."
    );
  }

  const response =
    await publicApi.post<RefreshResponse>(
      "auth/refresh",
      {
        refreshToken,
      }
    );

  const {
    accessToken,
    refreshToken: rotatedRefreshToken,
  } = response.data;

  if (!accessToken) {
    throw new Error(
      "The backend did not return an access token."
    );
  }

  if (rotatedRefreshToken) {
    await tokenStorage.saveTokens(
      accessToken,
      rotatedRefreshToken
    );
  } else {
    await tokenStorage.saveAccessToken(
      accessToken
    );
  }

  return accessToken;
}

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken =
      await tokenStorage.getAccessToken();

    if (accessToken) {
      config.headers.set(
        "Authorization",
        `Bearer ${accessToken}`
      );
    }

    console.log(
      "Authorization:",
      config.headers.get("Authorization")
    );

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest =
      error.config as RetryRequestConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      refreshPromise ??=
        refreshAccessToken();

      const newAccessToken =
        await refreshPromise;

      originalRequest.headers.set(
        "Authorization",
        `Bearer ${newAccessToken}`
      );

      return axiosInstance.request(
        originalRequest
      );
    } catch (refreshError) {
      await tokenStorage.clearTokens();

      return Promise.reject(refreshError);
    } finally {
      refreshPromise = null;
    }
  }
);

export {
  axiosInstance,
  publicApi,
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
};