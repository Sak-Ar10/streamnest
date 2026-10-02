import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { authApi } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';

export default function SignUp() {
  const [searchParams] = useSearchParams();
  const initialEmail = searchParams.get('email') || '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    const errors = {};
    if (name.length < 2) errors.name = 'Name must be at least 2 characters';
    if (!email.includes('@')) errors.email = 'Please enter a valid email';
    if (password.length < 8) errors.password = 'Password must be at least 8 characters';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const data = await authApi.signup({ name, email, password });
      login(data.user);
      navigate('/profiles', { replace: true });
    } catch (err) {
      if (err.data?.error?.fields) {
        const errors = {};
        err.data.error.fields.forEach(f => { errors[f.path] = f.message });
        setFieldErrors(errors);
      } else {
        setError(err.message || 'Failed to create account.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-6 py-6 border-b border-surface">
        <Logo size="lg" />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2">Create your account</h1>
          <p className="text-gray-400 mb-8">Join StreamNest and start watching today.</p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start space-x-3 text-red-200">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-3.5 bg-surface border ${fieldErrors.name ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:border-brand`}
              />
              {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
            </div>
            
            <div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3.5 bg-surface border ${fieldErrors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:border-brand`}
              />
              {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password (min 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3.5 bg-surface border ${fieldErrors.password ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:border-brand`}
              />
              {fieldErrors.password && <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-brand hover:bg-brand-hover text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand disabled:opacity-70"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-8 text-gray-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-white hover:underline font-medium">
              Sign in.
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
