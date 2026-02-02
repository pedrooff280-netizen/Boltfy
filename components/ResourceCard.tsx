
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ResourceCardProps } from '../types';

const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, badge, status, icon: Icon }) => {
  return (
    <div className="bg-slate-950/40 border border-wine-500/30 rounded-3xl p-8 hover:border-wine-400/50 hover:shadow-[0_0_40px_rgba(136,19,55,0.15)] transition-all cursor-pointer group flex flex-col h-full backdrop-blur-md">
      <div className="w-12 h-12 bg-slate-900/40 rounded-2xl flex items-center justify-center text-wine-400 mb-6 group-hover:text-white group-hover:bg-wine-600 transition-colors">
        <Icon className="w-5 h-5" />
      </div>

      <h3 className="text-lg font-bold text-white mb-2 leading-tight">
        {title}
      </h3>

      <p className="text-slate-400/60 text-sm leading-relaxed mb-8 flex-1">
        {description}
      </p>

      <div className="flex items-center justify-between mt-auto">
        {badge && (
          <span className="text-[10px] font-bold text-wine-400/70 tracking-widest uppercase">
            {badge}
          </span>
        )}
        {status && (
          <span className="text-[10px] font-bold text-emerald-500 tracking-widest uppercase">
            {status}
          </span>
        )}
        <ArrowRight className="w-4 h-4 text-wine-500/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
};

export default ResourceCard;
