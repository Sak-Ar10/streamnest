import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Check, X, Trash2 } from 'lucide-react';
import { profileApi } from '../api/profiles';
import { useProfile } from '../context/ProfileContext';
import { AVATAR_OPTIONS, MAX_PROFILES_PER_USER } from '../config';
import Logo from '../components/Logo';
import { useAuth } from '../context/AuthContext';

export default function Profiles() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Edit/Create Mode
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(null);
  
  const { selectProfile } = useProfile();
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const data = await profileApi.getAll();
      setProfiles(data.profiles);
    } catch (err) {
      setError(err.message || 'Failed to load profiles');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProfile = (profile) => {
    if (isEditing) {
      setFormData(profile);
      setShowForm(true);
    } else {
      selectProfile(profile);
      navigate('/browse');
    }
  };

  const handleAddNew = () => {
    setFormData({ name: '', avatar: AVATAR_OPTIONS[0].id, is_kids: false });
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await profileApi.update(formData.id, formData);
      } else {
        await profileApi.create(formData);
      }
      setShowForm(false);
      setFormData(null);
      setIsEditing(false);
      fetchProfiles();
    } catch (err) {
      alert(err.message || 'Error saving profile');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this profile?')) {
      try {
        await profileApi.delete(formData.id);
        setShowForm(false);
        setFormData(null);
        fetchProfiles();
      } catch (err) {
        alert(err.message || 'Error deleting profile');
      }
    }
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="w-12 h-12 border-4 border-surface-border border-t-brand rounded-full animate-spin"></div></div>;

  if (showForm && formData) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center pt-24 px-6">
        <h1 className="text-4xl font-semibold mb-8">{formData.id ? 'Edit Profile' : 'Add Profile'}</h1>
        
        <form onSubmit={handleSave} className="w-full max-w-md bg-surface p-8 rounded-2xl border border-surface-border">
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Avatar</label>
            <div className="flex flex-wrap gap-4">
              {AVATAR_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setFormData({...formData, avatar: opt.id})}
                  className={`w-14 h-14 rounded-xl ${opt.bg} transition-all relative ${formData.avatar === opt.id ? 'ring-4 ring-brand ring-offset-4 ring-offset-background' : 'opacity-70 hover:opacity-100'}`}
                >
                  {formData.avatar === opt.id && <Check className="absolute inset-0 m-auto text-white" />}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <input
              type="text"
              required
              placeholder="Name"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 bg-background border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-brand"
            />
          </div>

          <div className="mb-8 flex items-center">
            <input
              type="checkbox"
              id="kidsMode"
              checked={formData.is_kids}
              onChange={e => setFormData({...formData, is_kids: e.target.checked})}
              className="w-5 h-5 rounded border-gray-600 text-brand focus:ring-brand bg-background"
            />
            <label htmlFor="kidsMode" className="ml-3 text-white font-medium">Kid's Profile?</label>
          </div>

          <div className="flex flex-col space-y-3">
            <button type="submit" className="w-full py-3 bg-brand hover:bg-brand-hover text-white rounded-lg font-medium transition-colors">
              Save
            </button>
            
            {formData.id && profiles.length > 1 && (
              <button type="button" onClick={handleDelete} className="w-full py-3 flex items-center justify-center space-x-2 border border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-lg font-medium transition-colors">
                <Trash2 className="w-4 h-4" /> <span>Delete Profile</span>
              </button>
            )}
            
            <button type="button" onClick={() => setShowForm(false)} className="w-full py-3 border border-gray-600 text-gray-300 hover:bg-surface-elevated rounded-lg font-medium transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-24 px-6 text-center">
      <div className="absolute top-6 left-6">
        <Logo size="sm" />
      </div>
      <button onClick={logout} className="absolute top-6 right-6 text-sm text-gray-400 hover:text-white transition-colors">
        Sign Out
      </button>

      <h1 className="text-4xl md:text-5xl font-semibold mb-12 text-white tracking-tight">
        Who's watching?
      </h1>

      <div className="flex flex-wrap justify-center gap-6 max-w-4xl">
        {profiles.map(p => {
          const avatarDef = AVATAR_OPTIONS.find(a => a.id === p.avatar) || AVATAR_OPTIONS[0];
          return (
            <div key={p.id} className="flex flex-col items-center group cursor-pointer" onClick={() => handleSelectProfile(p)}>
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden transition-transform group-hover:scale-105 border-4 border-transparent group-hover:border-white">
                <div className={`w-full h-full ${avatarDef.bg}`} />
                {isEditing && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
                    <Edit2 className="w-10 h-10 text-white" />
                  </div>
                )}
              </div>
              <span className="mt-4 text-gray-400 group-hover:text-white transition-colors text-xl font-medium">
                {p.name}
              </span>
            </div>
          );
        })}

        {profiles.length < MAX_PROFILES_PER_USER && !isEditing && (
          <div className="flex flex-col items-center group cursor-pointer" onClick={handleAddNew}>
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-2 border-gray-600 flex items-center justify-center transition-transform group-hover:scale-105 group-hover:border-white group-hover:bg-surface">
              <Plus className="w-16 h-16 text-gray-400 group-hover:text-white" />
            </div>
            <span className="mt-4 text-gray-400 group-hover:text-white transition-colors text-xl font-medium">
              Add Profile
            </span>
          </div>
        )}
      </div>

      <button
        onClick={() => setIsEditing(!isEditing)}
        className="mt-16 px-6 py-2 border border-gray-500 text-gray-400 hover:text-white hover:border-white rounded text-lg tracking-wide transition-colors"
      >
        {isEditing ? 'Done' : 'Manage Profiles'}
      </button>
    </div>
  );
}
