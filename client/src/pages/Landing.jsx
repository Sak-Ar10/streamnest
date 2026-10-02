import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Monitor, Download, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FaqAccordion from '../components/FaqAccordion';
import { APP_NAME, APP_TAGLINE } from '../config';

function EmailCapture() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      navigate(`/signup?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <div className="mt-8">
      <p className="text-lg md:text-xl text-gray-200 mb-4 font-medium text-center">
        Ready to watch? Enter your email to create or restart your membership.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center max-w-2xl mx-auto space-y-3 sm:space-y-0 sm:space-x-3">
        <input
          type="email"
          placeholder="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full sm:flex-1 px-5 py-4 bg-black/60 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand backdrop-blur-sm transition-all text-lg"
        />
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-4 bg-brand hover:bg-brand-hover text-white rounded-lg font-bold text-xl flex items-center justify-center transition-colors shadow-lg shadow-brand/20 group"
        >
          Get Started
          <ChevronRight className="w-6 h-6 ml-1 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
}

function FeatureSection({ title, desc, icon: Icon, reversed }) {
  return (
    <div className="border-b-8 border-surface py-20 px-6">
      <div className={`max-w-6xl mx-auto flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">{title}</h2>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">{desc}</p>
        </div>
        <div className="flex-1 flex justify-center relative">
          <div className="absolute inset-0 bg-brand/10 blur-3xl rounded-full" />
          <div className="relative bg-surface-elevated p-12 rounded-3xl border border-surface-border shadow-2xl">
            <Icon className="w-32 h-32 text-brand" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative border-b-8 border-surface">
          {/* Background Image & Gradient overlay */}
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&q=80&w=2000" 
              alt="Cinematic background" 
              className="w-full h-full object-cover opacity-30 scale-105 transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50" />
          </div>

          <div className="relative z-10 pt-48 pb-32 px-6 flex flex-col items-center justify-center text-center min-h-[80vh]">
            <h1 className="text-5xl md:text-7xl font-black max-w-4xl tracking-tight mb-6 leading-tight drop-shadow-2xl">
              Unlimited movies, TV shows, and more
            </h1>
            <p className="text-2xl md:text-3xl text-gray-200 font-medium mb-8 drop-shadow-lg">
              {APP_TAGLINE}
            </p>
            <div className="w-full">
              <EmailCapture />
            </div>
          </div>
        </div>

        {/* Feature Sections */}
        <FeatureSection
          title="Watch everywhere"
          desc="Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more."
          icon={Monitor}
        />
        
        <FeatureSection
          title="Create profiles for everyone"
          desc="Send kids on adventures with their favorite characters in a space made just for them—free with your membership."
          icon={Users}
          reversed
        />
        
        <FeatureSection
          title="Download your shows"
          desc="Save your favorites easily and always have something to watch, even when you're offline."
          icon={Download}
        />

        {/* FAQ Section */}
        <div className="border-b-8 border-surface">
          <FaqAccordion />
          <div className="pb-20 px-6 text-center">
            <EmailCapture />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
