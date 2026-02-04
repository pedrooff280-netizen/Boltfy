import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface PromptOptionCardProps {
    icon: LucideIcon;
    title: string;
    className?: string;
    onClick: () => void;
    isActive: boolean;
}

const PromptOptionCard: React.FC<PromptOptionCardProps> = ({ icon: Icon, title, className, onClick, isActive }) => {
    return (
        <div
            onClick={onClick}
            className={`
        relative overflow-hidden
        flex flex-col items-center justify-center gap-3
        p-6 rounded-2xl cursor-pointer transition-all duration-300
        border-2
        group
        ${isActive
                    ? 'bg-wine-950/20 border-wine-500 shadow-[0_0_30px_-5px_rgba(217,70,239,0.3)]'
                    : 'bg-slate-950 border-slate-800/50 hover:border-wine-500/50 hover:bg-slate-900'
                }
        ${className}
      `}
        >
            <div className={`
        p-3 rounded-xl transition-all duration-300
        ${isActive ? 'bg-wine-500 text-white' : 'bg-slate-900 text-slate-400 group-hover:text-wine-400 group-hover:bg-wine-950/30'}
      `}>
                <Icon className="w-6 h-6" />
            </div>

            <span className={`
        text-sm font-bold text-center transition-colors
        ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}
      `}>
                {title}
            </span>

            {isActive && (
                <div className="absolute inset-0 bg-wine-500/5 pointer-events-none" />
            )}
        </div>
    );
};

export default PromptOptionCard;
