
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-6 px-8 pt-0 pb-6 mb-2">
      <div className="flex flex-col items-center md:items-start">
        <h1 className="text-2xl font-bold text-white mb-1">Bem-vindo, Builder</h1>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[10px] font-bold text-wine-400 tracking-widest uppercase">Online</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
