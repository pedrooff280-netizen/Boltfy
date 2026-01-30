import React from 'react';
import { Plus, ChevronRight } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { supabase } from '../src/lib/supabase';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="fixed top-2 md:top-6 left-0 right-0 flex justify-center z-[100] px-2 md:px-4">
      <aside className="bg-slate-950/90 backdrop-blur-xl h-14 md:h-16 flex items-center px-2 md:px-4 rounded-xl md:rounded-2xl border border-slate-800/40 shadow-2xl shadow-black/50">
        <div className="flex items-center gap-4">
          {/* Logo Section */}
          <div className="relative group cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 bg-transparent">
              <svg
                viewBox="0 0 24 24"
                className="w-full h-full drop-shadow-[0_0_12px_rgba(239,68,68,0.6)]"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Main Bolt Body */}
                <path
                  d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                  fill="#ef4444"
                />
                {/* Tech Highlight for futuristic feel */}
                <path
                  d="M13 3L12 11H20L13 3Z"
                  fill="white"
                  fillOpacity="0.15"
                />
                {/* Dark accents for depth */}
                <path
                  d="M11 21L12 13H4L11 21Z"
                  fill="black"
                  fillOpacity="0.2"
                />
              </svg>
            </div>
            <div className="absolute top-14 left-1/2 -translate-x-1/2 px-3 py-2 bg-wine-600 border border-wine-500 rounded-lg text-[11px] font-bold text-white opacity-0 scale-95 -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-200 z-[100] shadow-xl">
              Boltfy OS
            </div>
          </div>

          {/* Botão Novo App */}
          <div className="relative group mr-1">
            <button
              onClick={() => setActiveTab('create-app')}
              className="w-8 h-8 md:w-10 md:h-10 bg-slate-900/30 border border-slate-800/30 rounded-lg md:rounded-xl text-wine-500 flex items-center justify-center hover:bg-slate-800/60 hover:border-wine-500/50 transition-all"
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <div className="absolute top-14 left-1/2 -translate-x-1/2 px-3 py-2 bg-slate-950 border border-slate-800/50 rounded-lg text-[11px] font-semibold text-white whitespace-nowrap opacity-0 scale-95 -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-200 z-[100] shadow-2xl backdrop-blur-md">
              Novo Aplicativo
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 border-l border-t border-slate-800/50 rotate-45" />
            </div>
          </div>

          <div className="h-8 w-[1px] bg-slate-800/50 mx-1" />

          {/* Itens Principais de Navegação */}
          <nav className="flex items-center gap-1.5">
            {NAV_ITEMS.map((item, index) => {
              const isActive = activeTab === item.id;
              const showSeparator = index === 2 || index === 5;

              return (
                <React.Fragment key={item.id}>
                  {showSeparator && <div className="h-6 w-[1px] bg-slate-800/40 mx-1.5" />}
                  <div className="relative group flex flex-col items-center">
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg md:rounded-xl transition-all duration-200 ${isActive
                        ? 'text-wine-400 bg-wine-500/10 border border-wine-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]'
                        : 'text-slate-400/60 hover:text-wine-100 hover:bg-slate-800/40'
                        }`}
                    >
                      <item.icon className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-wine-500' : ''}`} />
                    </button>

                    {/* Tooltip */}
                    <div className="absolute top-14 px-3 py-2 bg-slate-950 border border-slate-800/50 rounded-lg text-[11px] font-semibold text-white whitespace-nowrap opacity-0 scale-95 -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-200 z-[100] shadow-2xl backdrop-blur-md">
                      {item.label}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 border-l border-t border-slate-800/50 rotate-45" />
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </nav>

          <div className="h-8 w-[1px] bg-slate-800/50 mx-1" />

          {/* Perfil do Usuário */}
          <div className="relative group">
            <button
              data-testid="logout-button"
              className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-slate-900 overflow-hidden border border-slate-800/50 hover:border-wine-500 transition-colors"
            >
              <img src="https://picsum.photos/seed/user/40/40" alt="Avatar" className="w-full h-full object-cover" />
            </button>

            <div className="absolute top-14 right-0 px-4 py-3 bg-slate-950 border border-slate-800/50 rounded-xl min-w-[160px] opacity-0 scale-95 -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-[100] shadow-2xl backdrop-blur-md">
              <p className="text-sm font-semibold text-white">Builder</p>
              <p className="text-[10px] font-bold text-wine-500 tracking-wider mb-2 uppercase">Boltfy Pro</p>
              <button
                onClick={() => setActiveTab('settings')}
                className="text-[10px] text-slate-300 hover:text-wine-100 flex items-center justify-between w-full uppercase tracking-widest font-bold transition-colors mb-2"
              >
                Configurações <ChevronRight className="w-3 h-3" />
              </button>
              <div className="h-[1px] bg-slate-800/50 mb-2 opacity-50" />
              <button
                onClick={() => supabase.auth.signOut()}
                className="text-[10px] text-red-400 hover:text-red-300 flex items-center justify-between w-full uppercase tracking-widest font-bold transition-colors"
                id="logout-btn"
              >
                Sair <ChevronRight className="w-3 h-3" />
              </button>
              <div className="absolute -top-1 right-4 w-2 h-2 bg-slate-950 border-l border-t border-slate-800/50 rotate-45" />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
