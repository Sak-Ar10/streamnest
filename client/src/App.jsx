import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProfileProvider } from './context/ProfileContext';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Profiles from './pages/Profiles';
import Browse from './pages/Browse';
import MyList from './pages/MyList';
import Search from './pages/Search';
import GuestOnlyRoute from './routes/GuestOnlyRoute';
import ProtectedRoute from './routes/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <Routes>
          {/* Guest Routes */}
          <Route path="/" element={<GuestOnlyRoute><Landing /></GuestOnlyRoute>} />
          <Route path="/signup" element={<GuestOnlyRoute><SignUp /></GuestOnlyRoute>} />
          <Route path="/login" element={<GuestOnlyRoute><LogIn /></GuestOnlyRoute>} />

          {/* Protected Routes */}
          <Route path="/profiles" element={<ProtectedRoute><Profiles /></ProtectedRoute>} />
          <Route path="/browse" element={<ProtectedRoute><Browse /></ProtectedRoute>} />
          <Route path="/mylist" element={<ProtectedRoute><MyList /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-background text-white text-2xl font-bold">
              404 - Not Found
            </div>
          } />
        </Routes>
      </ProfileProvider>
    </AuthProvider>
  );
}

