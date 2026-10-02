import React, { useEffect, useState } from 'react';
import { listApi } from '../api/list';
import { titleApi } from '../api/titles';
import { useProfile } from '../context/ProfileContext';
import Navbar from '../components/Navbar';
import TitleCard from '../components/TitleCard';
import TitleModal from '../components/TitleModal';

export default function MyList() {
  const { activeProfileId } = useProfile();
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTitle, setSelectedTitle] = useState(null);

  useEffect(() => {
    if (activeProfileId) {
      loadList();
    }
  }, [activeProfileId]);

  const loadList = async () => {
    try {
      const res = await listApi.get(activeProfileId);
      setTitles(res.list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleList = async (title) => {
    try {
      await listApi.remove(activeProfileId, title.id);
      setTitles(prev => prev.filter(t => t.id !== title.id));
      if (selectedTitle && selectedTitle.id === title.id) {
        setSelectedTitle(null);
      }
    } catch (err) {
      alert('Failed to remove from list');
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-surface-border border-t-brand rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-6 md:px-12">
      <Navbar />
      
      <h1 className="text-3xl font-bold text-white mb-8">My List</h1>
      
      {titles.length === 0 ? (
        <div className="text-gray-400 text-lg">
          You haven't added any titles to your list yet.
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {titles.map(t => (
            <TitleCard 
              key={t.id} 
              title={t} 
              onClick={handleTitleClick}
              inList={true}
              onToggleList={handleToggleList}
            />
          ))}
        </div>
      )}

      {selectedTitle && (
        <TitleModal 
          title={selectedTitle} 
          onClose={() => setSelectedTitle(null)}
          inList={true}
          onToggleList={handleToggleList}
        />
      )}
    </div>
  );
}
