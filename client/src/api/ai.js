import { apiClient } from './client';

export const aiApi = {
  getRecommendations: (profileId, prompt) => 
    apiClient('/ai/recommend', { 
      method: 'POST', 
      body: { profileId, prompt } 
    }),
};
