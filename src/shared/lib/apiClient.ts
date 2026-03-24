import axios from 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    _skipAuth?: boolean;
  }
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  if (config._skipAuth) return config;
  // Attach auth token here when auth is implemented:
  // const token = useAuthStore.getState().token;
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (error: unknown) => {
    return Promise.reject(error);
  },
);
