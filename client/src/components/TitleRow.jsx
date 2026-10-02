import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TitleCard from './TitleCard';

export default function TitleRow({ title, titles, onTitleClick, myListIds, onToggleList }) {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth + 100 : scrollLeft + clientWidth - 100;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!titles || titles.length === 0) return null;

  return (
    <div className="relative mb-8 group">
      <h3 className="text-xl font-bold text-gray-200 mb-3 px-12">{title}</h3>
      
      <div className="relative">
        {/* Left Scroll Button */}
        <button 
          className="absolute left-0 top-0 bottom-0 w-12 bg-black/50 hover:bg-black/80 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>

        {/* Scrollable container */}
        <div 
          ref={rowRef}
          className="flex overflow-x-scroll scrollbar-hide px-12 space-x-4 pb-4 pt-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {titles.map(t => (
            <TitleCard 
              key={t.id} 
              title={t} 
              onClick={onTitleClick}
              inList={myListIds.has(t.id)}
              onToggleList={onToggleList}
            />
          ))}
        </div>

        {/* Right Scroll Button */}
        <button 
          className="absolute right-0 top-0 bottom-0 w-12 bg-black/50 hover:bg-black/80 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>
      
      {/* Hide scrollbar for Chrome/Safari via inline style block if needed, but Tailwind plugin or global css is better. */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}</style>
    </div>
  );
}
