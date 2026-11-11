import axios from "axios";
import { mockAxiosAdapter } from "../mock/mockApiEngine.js";

const configuredApiUrl =
  import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL;
const normalizedApiUrl = configuredApiUrl?.trim().replace(/\/+$/, "");
const apiBaseUrl = normalizedApiUrl
  ? normalizedApiUrl.endsWith("/api")
    ? normalizedApiUrl
    : `${normalizedApiUrl}/api`
  : "/api";

const axiosInstance = axios.create({
  // VITE_API_URL may be the site root or an /api URL; local dev defaults to Vite's proxy.
  baseURL: apiBaseUrl,
  withCredentials: true,
  timeout: 5000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If backend is unreachable, proxy fails, network disconnects, or server times out
    const isNetworkOrServerError =
      !error.response ||
      error.code === "ECONNABORTED" ||
      error.code === "ERR_NETWORK" ||
      error.response.status >= 500;

    if (
      isNetworkOrServerError &&
      error.config &&
      !error.config._isMockFallback
    ) {
      try {
        error.config._isMockFallback = true;
        return await mockAxiosAdapter(error.config);
      } catch (mockErr) {
        return Promise.reject(mockErr);
      }
    }
    return Promise.reject(error);
  },
);

export const apiUrl = (endpoint) => {
  const path = endpoint.startsWith("/api/") ? endpoint.slice(4) : endpoint;
  return `${apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
};

export default axiosInstance;
