import React, { useEffect, useState } from 'react';
import { Play, Info } from 'lucide-react';
import { titleApi } from '../api/titles';
import { listApi } from '../api/list';
import { useProfile } from '../context/ProfileContext';
import Navbar from '../components/Navbar';
import TitleRow from '../components/TitleRow';
import TitleModal from '../components/TitleModal';
import AiRecommendations from '../components/AiRecommendations';

export default function Browse() {
  const { activeProfileId } = useProfile();
  
  const [data, setData] = useState({ featured: null, rows: [] });
  const [myListIds, setMyListIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  
  const [selectedTitle, setSelectedTitle] = useState(null);

  useEffect(() => {
    if (activeProfileId) {
      loadData();
    }
  }, [activeProfileId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [browseRes, listRes] = await Promise.all([
        titleApi.getBrowse(activeProfileId),
        listApi.get(activeProfileId)
      ]);
      setData(browseRes);
      
      const listIds = new Set(listRes.list.map(t => t.id));
      setMyListIds(listIds);
    } catch (err) {
      console.error('Failed to load browse data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleList = async (title) => {
    try {
      const isCurrentlyInList = myListIds.has(title.id);
      
      if (isCurrentlyInList) {
        await listApi.remove(activeProfileId, title.id);
        const next = new Set(myListIds);
        next.delete(title.id);
        setMyListIds(next);
      } else {
        await listApi.add(activeProfileId, title.id);
        const next = new Set(myListIds);
        next.add(title.id);
        setMyListIds(next);
      }
    } catch (err) {
      alert('Failed to update list');
    }
  };

  const handleTitleClick = async (title) => {
    try {
      // Fetch full details (includes trailer and genres)
      const fullTitle = await titleApi.getTitleById(title.id, activeProfileId);
      setSelectedTitle(fullTitle.title);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-surface-border border-t-brand rounded-full animate-spin"></div>
      </div>
    );
  }

  const { featured, rows } = data;

  return (
    <div className="min-h-screen bg-background pb-12 overflow-x-hidden">
      <Navbar />

      {/* Featured Billboard */}
      {featured && (
        <div className="relative w-full h-[85vh] mb-8">
          <div className="absolute inset-0">
            <img 
              src={featured.backdrop_url || featured.poster_url} 
              alt={featured.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          </div>
          
          <div className="absolute bottom-[20%] left-12 max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
              {featured.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow-md line-clamp-3">
              {featured.overview}
            </p>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded-md font-bold hover:bg-gray-200 transition-colors">
                <Play className="w-6 h-6 fill-current" />
                <span>Play</span>
              </button>
              <button 
                onClick={() => handleTitleClick(featured)}
                className="flex items-center space-x-2 bg-gray-500/70 text-white px-8 py-3 rounded-md font-bold hover:bg-gray-500/90 transition-colors"
              >
                <Info className="w-6 h-6" />
                <span>More Info</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Recommendations */}
      <div className="relative z-10 -mt-8 md:-mt-24 mb-12 px-6 md:px-12">
        <AiRecommendations profileId={activeProfileId} onTitleClick={handleTitleClick} myListIds={myListIds} onToggleList={handleToggleList} />
      </div>

      {/* Rows */}
      <div className="relative z-10 space-y-8">
        {rows.map((row, idx) => (
          <TitleRow 
            key={idx} 
            title={row.name} 
            titles={row.titles} 
            onTitleClick={handleTitleClick}
            myListIds={myListIds}
            onToggleList={handleToggleList}
          />
        ))}
      </div>

      {selectedTitle && (
        <TitleModal 
          title={selectedTitle} 
          onClose={() => setSelectedTitle(null)}
          inList={myListIds.has(selectedTitle.id)}
          onToggleList={handleToggleList}
        />
      )}
    </div>
  );
}
