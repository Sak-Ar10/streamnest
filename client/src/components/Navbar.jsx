import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, LogOut, User } from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { activeProfile, clearProfile } = useProfile();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSwitchProfile = () => {
    clearProfile();
    navigate('/profiles');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/50 to-transparent transition-all duration-300">
      <div className="flex items-center space-x-8">
        <Logo size="md" />
        
        {activeProfile && (
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link to="/browse" className="text-white hover:text-gray-300 transition-colors">Home</Link>
            <Link to="/mylist" className="text-gray-300 hover:text-white transition-colors">My List</Link>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-6">
        {activeProfile ? (
          <>
            <form onSubmit={handleSearch} className="relative flex items-center">
              <button 
                type="button" 
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-white focus:outline-none"
              >
                <Search className="w-5 h-5" />
              </button>
              <input
                type="text"
                placeholder="Titles, people, genres"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`transition-all duration-300 bg-black/60 border border-white/80 text-white text-sm px-3 py-1.5 focus:outline-none absolute right-8 ${searchOpen ? 'w-48 md:w-64 opacity-100' : 'w-0 opacity-0 pointer-events-none'}`}
              />
            </form>

            <div className="group relative">
              <div className="w-8 h-8 rounded overflow-hidden cursor-pointer">
                {/* Temporary avatar representation */}
                <div className={`w-full h-full bg-brand flex items-center justify-center text-white font-bold text-xs`}>
                  {activeProfile.name.charAt(0).toUpperCase()}
                </div>
              </div>
              
              <div className="absolute right-0 mt-2 w-48 bg-black/90 border border-gray-700 rounded-md shadow-2xl py-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity">
                <button 
                  onClick={handleSwitchProfile}
                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 flex items-center space-x-2"
                >
                  <User className="w-4 h-4" /> <span>Switch Profile</span>
                </button>
                <div className="border-t border-gray-700 my-1" />
                <button 
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" /> <span>Sign Out</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          !user && (
            <Link 
              to="/login"
              className="px-5 py-2 rounded-lg bg-brand hover:bg-brand-hover text-white text-sm font-medium transition-colors shadow-lg shadow-brand/20"
            >
              Sign In
            </Link>
          )
        )}
      </div>
    </nav>
  );
}
