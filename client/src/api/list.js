import { apiClient } from './client';

export const listApi = {
  get: (profileId) => apiClient(`/profiles/${profileId}/list`),
  add: (profileId, titleId) => apiClient(`/profiles/${profileId}/list`, { method: 'POST', body: { titleId } }),
  remove: (profileId, titleId) => apiClient(`/profiles/${profileId}/list/${titleId}`, { method: 'DELETE' }),
};
