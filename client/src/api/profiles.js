import { apiClient } from './client';

export const profileApi = {
  getAll: () => apiClient('/profiles'),
  create: (data) => apiClient('/profiles', { body: data }),
  update: (id, data) => apiClient(`/profiles/${id}`, { method: 'PATCH', body: data }),
  delete: (id) => apiClient(`/profiles/${id}`, { method: 'DELETE' }),
};
