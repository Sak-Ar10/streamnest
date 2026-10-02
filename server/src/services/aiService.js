
import { getList } from './listService.js';
import { HttpError } from '../utils/httpError.js';
import { query } from '../config/db.js';

export const getRecommendations = async (userId, profileId, userPrompt) => {
  if (!process.env.GROQ_API_KEY) {
    throw new HttpError(501, 'AI recommendations are not enabled', 'NOT_IMPLEMENTED');
  }

  // Get user's list for context
  const list = await getList(userId, profileId);
  const listContext = list.length > 0 
    ? `The user's current favorite titles include: ${list.map(t => t.title).join(', ')}.`
    : 'The user has no favorites yet.';

  const systemPrompt = `You are a movie and TV show recommendation engine for StreamNest. 
${listContext}
The user is asking: "${userPrompt}"
Based on this, recommend exactly 3 titles (movies or TV shows) that exist in the TMDB database and are a great fit.
Respond ONLY with a valid JSON array of strings containing the titles. Example: ["The Matrix", "Inception", "Interstellar"]. Do not include markdown blocks or any other text.`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [{ role: 'system', content: systemPrompt }],
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API returned ${response.status}`);
    }

    const data = await response.json();
    const resultText = data.choices[0].message.content.trim();
    
    // Attempt to parse JSON array
    const recommendedTitles = JSON.parse(resultText);

    // Fetch matching titles from our DB
    const results = [];
    for (const titleName of recommendedTitles) {
      const res = await query(`SELECT * FROM titles WHERE title ILIKE $1 LIMIT 1`, [`%${titleName}%`]);
      if (res.rowCount > 0) {
        results.push(res.rows[0]);
      }
    }

    return results;
  } catch (error) {
    console.error('AI Recommendation Error:', error);
    throw new HttpError(500, 'Failed to generate recommendations', 'AI_ERROR');
  }
};
