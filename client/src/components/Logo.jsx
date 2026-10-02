import React from 'react';
import { Film } from 'lucide-react';
import { APP_NAME } from '../config';
import { Link } from 'react-router-dom';

export default function Logo({ size = 'md' }) {
  const iconSize = size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6';
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-xl';
  const boxSize = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';

  return (
    <Link to="/" className="flex items-center space-x-2.5 group focus:outline-none focus:ring-2 focus:ring-brand rounded-lg">
      <div className={`${boxSize} rounded-lg bg-gradient-to-tr from-brand to-brand-accent flex items-center justify-center shadow-lg shadow-brand/20 group-hover:shadow-brand/40 transition-shadow`}>
        <Film className={`${iconSize} text-white`} />
      </div>
      <span className={`${textSize} font-black tracking-tight text-white`}>
        {APP_NAME}
      </span>
    </Link>
  );
}
