import React from 'react';
import { X, Play, Plus, Check } from 'lucide-react';

export default function TitleModal({ title, onClose, inList, onToggleList }) {
  if (!title) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-y-auto">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl bg-surface rounded-2xl overflow-hidden shadow-2xl z-10 animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Backdrop Video/Image Header */}
        <div className="relative aspect-video w-full bg-black">
          {title.trailer_youtube_id ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${title.trailer_youtube_id}?autoplay=1&mute=0&controls=1&rel=0`}
              title="Trailer"
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <img src={title.backdrop_url} alt={title.title} className="w-full h-full object-cover" />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute bottom-6 left-8 flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-white text-black px-6 py-2.5 rounded-lg font-bold hover:bg-gray-200 transition-colors">
              <Play className="w-6 h-6 fill-current" />
              <span>Play</span>
            </button>
            <button 
              onClick={() => onToggleList(title)}
              className="flex items-center justify-center w-11 h-11 bg-black/50 border border-gray-400 hover:border-white rounded-full text-white transition-colors"
              title={inList ? "Remove from My List" : "Add to My List"}
            >
              {inList ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-4">
              <h2 className="text-3xl font-bold">{title.title}</h2>
              <div className="flex items-center space-x-3 text-sm text-gray-400 font-medium">
                <span className="text-emerald-400">Match {Math.round(title.rating * 10)}%</span>
                <span>{title.release_year}</span>
                <span className="border border-gray-600 px-1.5 py-0.5 rounded text-xs">{title.maturity_rating}</span>
                {title.type === 'movie' ? (
                  <span>{title.runtime_minutes}m</span>
                ) : (
                  <span>{title.seasons} Seasons</span>
                )}
              </div>
              <p className="text-gray-200 text-lg leading-relaxed">{title.overview}</p>
            </div>
            
            <div className="w-full md:w-1/3 text-sm space-y-4">
              <div>
                <span className="text-gray-500 block mb-1">Genres</span>
                <span className="text-gray-300">
                  {title.genres ? title.genres.join(', ') : 'Unknown'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
