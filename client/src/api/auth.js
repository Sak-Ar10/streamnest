import { apiClient } from './client';

export const authApi = {
  signup: (data) => apiClient('/auth/signup', { body: data }),
  login: (data) => apiClient('/auth/login', { body: data }),
  logout: () => apiClient('/auth/logout', { method: 'POST' }),
  getMe: () => apiClient('/auth/me'),
};
