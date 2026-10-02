import * as aiService from '../services/aiService.js';

export const getRecommendations = async (req, res) => {
  const { profileId, prompt } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ error: { message: 'Prompt is required' } });
  }

  const recommendations = await aiService.getRecommendations(req.user.id, profileId, prompt);
  res.status(200).json({ recommendations });
};
