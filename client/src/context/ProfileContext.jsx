import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const { user } = useAuth();
  const [activeProfileId, setActiveProfileId] = useState(() => {
    return localStorage.getItem('streamnest_active_profile_id') || null;
  });
  const [activeProfile, setActiveProfile] = useState(null);

  // Clear on logout
  useEffect(() => {
    if (!user) {
      setActiveProfileId(null);
      setActiveProfile(null);
      localStorage.removeItem('streamnest_active_profile_id');
    }
  }, [user]);

  const selectProfile = (profile) => {
    setActiveProfile(profile);
    setActiveProfileId(profile.id);
    localStorage.setItem('streamnest_active_profile_id', profile.id);
  };

  const clearProfile = () => {
    setActiveProfile(null);
    setActiveProfileId(null);
    localStorage.removeItem('streamnest_active_profile_id');
  };

  return (
    <ProfileContext.Provider value={{ activeProfileId, activeProfile, selectProfile, clearProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
