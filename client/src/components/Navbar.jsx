import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-background/80 backdrop-blur-md border-b border-surface-border transition-all duration-300">
      <Logo />
      
      <div className="flex items-center space-x-4">
        {user ? (
          <Link 
            to="/browse"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Browse
          </Link>
        ) : (
          <Link 
            to="/login"
            className="px-5 py-2 rounded-lg bg-brand hover:bg-brand-hover text-white text-sm font-medium transition-colors shadow-lg shadow-brand/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-brand"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
