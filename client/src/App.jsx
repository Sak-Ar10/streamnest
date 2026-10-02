import React, { useEffect, useState } from 'react';
import { APP_NAME, APP_TAGLINE } from './config';
import { Film, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [healthStatus, setHealthStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/health');
      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }
      const data = await res.json();
      setHealthStatus(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="min-h-screen bg-background text-white flex flex-col items-center justify-center p-6">
      {/* Brand Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand to-brand-accent flex items-center justify-center shadow-lg shadow-brand/20">
          <Film className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-4xl font-black tracking-tight text-white">
          {APP_NAME}
        </h1>
      </div>

      <p className="text-gray-400 text-lg mb-8 max-w-md text-center">
        {APP_TAGLINE}
      </p>

      {/* Health Check Card */}
      <div className="w-full max-w-md bg-surface p-6 rounded-2xl border border-surface-border shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-200">System Status</h2>
          <button
            onClick={checkHealth}
            disabled={loading}
            className="p-2 rounded-lg bg-surface-elevated hover:bg-surface-border text-gray-300 transition-colors"
            title="Refresh Status"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center space-x-3 text-gray-400 py-3">
            <RefreshCw className="w-5 h-5 animate-spin text-brand" />
            <span>Verifying backend connectivity via /api/health...</span>
          </div>
        ) : error ? (
          <div className="flex items-start space-x-3 text-red-400 bg-red-950/30 p-4 rounded-xl border border-red-900/50">
            <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Backend Unreachable</p>
              <p className="text-sm text-red-300/80 mt-1">{error}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-emerald-400 bg-emerald-950/30 p-4 rounded-xl border border-emerald-900/50">
              <CheckCircle className="w-6 h-6 flex-shrink-0" />
              <div>
                <p className="font-semibold text-emerald-300">Phase 0 Scaffolding Ready</p>
                <p className="text-xs text-emerald-400/80 mt-0.5">
                  Vite Proxy ↔ Express API link verified
                </p>
              </div>
            </div>

            <div className="bg-surface-card p-4 rounded-xl border border-surface-border text-xs font-mono space-y-1.5 text-gray-300">
              <div><span className="text-gray-500">API Status:</span> {healthStatus?.ok ? 'Online' : 'Degraded'}</div>
              <div><span className="text-gray-500">App Name:</span> {healthStatus?.app}</div>
              <div><span className="text-gray-500">Environment:</span> {healthStatus?.environment}</div>
              <div><span className="text-gray-500">Server Timestamp:</span> {healthStatus?.timestamp}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
