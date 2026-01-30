
import React from 'react';
import { Rocket, Box } from 'lucide-react';

interface HeroCardProps {
  onCreateApp: () => void;
}

const HeroCard: React.FC<HeroCardProps> = ({ onCreateApp }) => {
  return (
    <div className="bg-slate-950/40 border border-wine-500/30 rounded-3xl p-10 flex-[2] relative overflow-hidden group hover:border-wine-400/50 hover:shadow-[0_0_40px_rgba(136,19,55,0.15)] transition-all duration-500 backdrop-blur-md">
      <div className="relative z-10 max-w-lg">
        <div className="flex items-center gap-3 mb-6">
          <span className="px-2.5 py-1 rounded bg-wine-500/20 text-wine-300 text-[10px] font-bold tracking-widest uppercase border border-wine-500/20">
            Novidade
          </span>
          <span className="text-xs text-slate-400/80 font-medium">Workshop de Design UI/UX</span>
        </div>

        <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
          O que vamos criar hoje?
        </h2>

        <p className="text-slate-300/70 text-sm leading-relaxed mb-8">
          Acesse as ferramentas e tutoriais exclusivos da nossa biblioteca e comece a escalar seus projetos de design com eficiência.
        </p>

        {/* Botão estilizado conforme a imagem do usuário, com o texto alterado para 'Novo Aplicativo' */}
        <button
          onClick={onCreateApp}
          className="flex items-center gap-4 bg-wine-600 hover:bg-wine-500 border border-wine-400/30 rounded-[20px] p-3 pr-8 transition-all active:scale-95 shadow-[0_10px_30px_rgba(136,19,55,0.3)] group/btn"
        >
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 group-hover/btn:bg-white/20 transition-colors">
            <Box className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-bold text-white tracking-tight">
            Novo Aplicativo
          </span>
        </button>
      </div>

      {/* Decorative Rocket Illustration */}
      <div className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700 ease-out pointer-events-none">
        <div className="relative w-[300px] h-[300px] flex items-center justify-center rotate-[-15deg]">
          <Rocket className="w-full h-full text-wine-400 fill-current" />
          <div className="absolute inset-0 bg-wine-500/20 blur-[80px] rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
