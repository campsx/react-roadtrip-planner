import axios from 'axios';
import { env } from '../config/env';

export const client = axios.create({
  baseURL: env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      const isLoginRequest = error.config?.url?.includes('/api/login');
      if (status === 401 && !isLoginRequest) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('username');
        window.location.href = '/login';
      }

      const message: string =
        (error.response?.data as { message?: string } | undefined)?.message ??
        error.message ??
        'Une erreur inattendue est survenue.';

      return Promise.reject({ status: status ?? 0, message });
    }

    return Promise.reject({ status: 0, message: 'Une erreur inattendue est survenue.' });
  },
);
