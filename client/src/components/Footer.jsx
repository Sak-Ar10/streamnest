import React from 'react';
import { APP_NAME } from '../config';

export default function Footer() {
  return (
    <footer className="border-t border-surface-border bg-surface mt-auto py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
        <div className="mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Cookie Preferences</a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 text-center text-xs text-gray-600">
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </div>
    </footer>
  );
}
