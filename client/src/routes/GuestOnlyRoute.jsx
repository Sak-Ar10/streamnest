import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function GuestOnlyRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-surface-border border-t-brand rounded-full animate-spin"></div>
      </div>
    );
  }

  // If user is logged in, redirect to browse
  if (user) {
    return <Navigate to="/browse" replace />;
  }

  return children;
}
