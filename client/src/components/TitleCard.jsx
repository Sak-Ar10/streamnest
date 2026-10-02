import React, { useState } from 'react';
import { Play, Plus, Check, ChevronDown } from 'lucide-react';

export default function TitleCard({ title, onClick, inList, onToggleList }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative flex-shrink-0 cursor-pointer transition-transform duration-300 ease-out z-10 hover:z-30 hover:scale-105"
      style={{ width: '240px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(title)}
    >
      <div className="aspect-video w-full rounded-md overflow-hidden bg-surface-elevated relative">
        <img 
          src={title.backdrop_url || title.poster_url} 
          alt={title.title} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {isHovered && (
          <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-4 animate-in fade-in duration-200">
            <h4 className="text-white font-bold mb-2 truncate">{title.title}</h4>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button 
                  className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  onClick={(e) => { e.stopPropagation(); onClick(title); }}
                >
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </button>
                <button 
                  className="w-8 h-8 bg-black/50 border border-gray-400 text-white rounded-full flex items-center justify-center hover:border-white transition-colors"
                  onClick={(e) => { e.stopPropagation(); onToggleList(title); }}
                  title={inList ? "Remove from My List" : "Add to My List"}
                >
                  {inList ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
              </div>
              
              <button className="w-8 h-8 bg-black/50 border border-gray-400 text-white rounded-full flex items-center justify-center hover:border-white transition-colors">
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center space-x-2 mt-3 text-xs font-semibold text-gray-300">
              <span className="text-emerald-400">Match {Math.round(title.rating * 10)}%</span>
              <span className="border border-gray-600 px-1 rounded">{title.maturity_rating}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
