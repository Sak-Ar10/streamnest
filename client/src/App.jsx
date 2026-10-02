import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Landing from './pages/Landing';
import GuestOnlyRoute from './routes/GuestOnlyRoute';

// Placeholders for future phases
const PlaceholderPage = ({ title }) => (
  <div className="min-h-screen flex items-center justify-center bg-background text-white text-2xl font-bold">
    {title} (Coming Soon)
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Guest Routes */}
        <Route 
          path="/" 
          element={
            <GuestOnlyRoute>
              <Landing />
            </GuestOnlyRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <GuestOnlyRoute>
              <PlaceholderPage title="Sign Up Page" />
            </GuestOnlyRoute>
          } 
        />
        <Route 
          path="/login" 
          element={
            <GuestOnlyRoute>
              <PlaceholderPage title="Log In Page" />
            </GuestOnlyRoute>
          } 
        />

        {/* Protected Routes placeholder */}
        <Route path="/browse" element={<PlaceholderPage title="Browse" />} />

        {/* Fallback */}
        <Route path="*" element={<PlaceholderPage title="404 Not Found" />} />
      </Routes>
    </AuthProvider>
  );
}
