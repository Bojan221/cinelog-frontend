import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import axiosAuth, { BASE_URL } from "./axiosAuth";
import { getAccessToken, setAccessToken, clearAccessToken } from "./tokenStore";


const REFRESH_URL = "/auth/refresh";

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

let refreshPromise: Promise<string> | null = null;

// Shared, de-duplicated refresh: concurrent callers await the same request so
// we never fire two /auth/refresh round trips (which could rotate the cookie
// out from under each other).
export const refreshAccessToken = async (): Promise<string> => {
  if (!refreshPromise) {
    refreshPromise = axiosAuth
      .post<{ accessToken: string }>(REFRESH_URL)
      .then((res) => {
        const token = res.data.accessToken;
        setAccessToken(token);
        return token;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

// Attach the token. If it's not in memory yet (e.g. right after a hard refresh,
// before initAuth has resolved), wait for a refresh instead of firing a request
// that would just 401 and retry.
axiosPrivate.interceptors.request.use(async (config) => {
  let token = getAccessToken();
  if (!token) {
    try {
      token = await refreshAccessToken();
    } catch {
      // No valid session — let the request go out and 401 normally.
    }
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableConfig | undefined;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosPrivate(originalRequest);
      } catch (refreshError) {
        clearAccessToken();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosPrivate;
