import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { titleApi } from '../api/titles';
import { listApi } from '../api/list';
import { useProfile } from '../context/ProfileContext';
import Navbar from '../components/Navbar';
import TitleCard from '../components/TitleCard';
import TitleModal from '../components/TitleModal';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const { activeProfileId } = useProfile();
  const [titles, setTitles] = useState([]);
  const [myListIds, setMyListIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [selectedTitle, setSelectedTitle] = useState(null);

  useEffect(() => {
    if (activeProfileId && query) {
      performSearch();
    }
  }, [activeProfileId, query]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const [searchRes, listRes] = await Promise.all([
        titleApi.getTitles({ q: query, profileId: activeProfileId }),
        listApi.get(activeProfileId)
      ]);
      setTitles(searchRes.titles);
      setMyListIds(new Set(listRes.list.map(t => t.id)));
    } catch (err) {
      console.error(err);
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
      const fullTitle = await titleApi.getTitleById(title.id, activeProfileId);
      setSelectedTitle(fullTitle.title);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-6 md:px-12">
      <Navbar />
      
      <div className="mb-8">
        <h1 className="text-gray-400 text-xl">
          Search results for: <span className="text-white font-semibold">"{query}"</span>
        </h1>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-surface-border border-t-brand rounded-full animate-spin"></div>
        </div>
      ) : titles.length === 0 ? (
        <div className="text-gray-400 text-lg py-10">
          No matches found for "{query}". Try another search term.
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {titles.map(t => (
            <TitleCard 
              key={t.id} 
              title={t} 
              onClick={handleTitleClick}
              inList={myListIds.has(t.id)}
              onToggleList={handleToggleList}
            />
          ))}
        </div>
      )}

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
