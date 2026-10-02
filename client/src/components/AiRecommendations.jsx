import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { aiApi } from '../api/ai';
import TitleCard from './TitleCard';

export default function AiRecommendations({ profileId, onTitleClick, myListIds, onToggleList }) {
  const [prompt, setPrompt] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const res = await aiApi.getRecommendations(profileId, prompt);
      setResults(res.recommendations);
    } catch (err) {
      if (err.status === 501) {
        setError('AI Recommendations are not enabled in this environment.');
      } else {
        setError('Failed to get recommendations. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface border border-surface-border rounded-2xl p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-transparent pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/3">
          <div className="flex items-center space-x-2 mb-3">
            <Sparkles className="w-6 h-6 text-brand" />
            <h3 className="text-xl font-bold">AI Magic Picks</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Tell us what you're in the mood for. Our AI will analyze your taste and find the perfect match.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
            <textarea
              rows="3"
              placeholder="e.g. A dark sci-fi thriller with mind-bending plot twists"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-background border border-gray-600 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-brand resize-none"
            />
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="bg-brand hover:bg-brand-hover text-white py-2 rounded-lg font-bold text-sm transition-colors disabled:opacity-50"
            >
              {loading ? 'Thinking...' : 'Get Recommendations'}
            </button>
          </form>
          {error && <p className="text-red-400 text-xs mt-3">{error}</p>}
        </div>

        <div className="w-full md:w-2/3">
          {results.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {results.map(t => (
                <TitleCard 
                  key={t.id} 
                  title={t} 
                  onClick={onTitleClick}
                  inList={myListIds.has(t.id)}
                  onToggleList={onToggleList}
                />
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-gray-700 rounded-xl text-gray-500">
              {loading ? 'Asking AI...' : 'Your AI recommendations will appear here'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
