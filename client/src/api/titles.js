import { apiClient } from './client';

export const titleApi = {
  getBrowse: (profileId) => apiClient(`/titles/browse?profileId=${profileId || ''}`),
  getTitles: (params) => {
    const qs = new URLSearchParams(params).toString();
    return apiClient(`/titles?${qs}`);
  },
  getTitleById: (id, profileId) => apiClient(`/titles/${id}?profileId=${profileId || ''}`),
  getGenres: () => apiClient('/titles/genres'),
};
