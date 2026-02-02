
import React from 'react';
import {
    BookOpen,
    Rocket,
    Bell,
    Zap,
    Play,
    ArrowRight
} from 'lucide-react';

const StudyAreaView: React.FC = () => {
    return (
        <div className="flex flex-col items-center max-w-6xl mx-auto pt-10 pb-20 px-4">
            {/* Header Section */}
            <div className="flex flex-col items-center mb-16">
                <span className="text-wine-600 font-bold tracking-[0.4em] text-[10px] md:text-sm uppercase mb-6">
                    BOLTFY HUB
                </span>
                <h1 className="text-2xl md:text-[40px] font-semibold text-white text-center leading-[1.2] mb-6 max-w-4xl mx-auto">
                    Acesse a comunidade, estude o conteúdo ou coloque em prática seu<br className="hidden md:block" /> conhecimento para materializar seu SaaS.
                </h1>
            </div>

            {/* Top Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mb-8">
                {/* Discord Card */}
                <div className="bg-[#0a0a0f]/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex items-center justify-between group hover:border-wine-500/30 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-wine-500/10 rounded-xl flex items-center justify-center text-wine-500">
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1971.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.419-2.157 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-base md:text-xl leading-tight">Network Discord</h3>
                            <p className="text-slate-500 text-xs md:text-sm">Comunidade exclusiva</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-950/60 px-4 py-1.5 rounded-full border border-white/5">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                        <span className="text-slate-300 text-[10px] md:text-xs font-bold uppercase tracking-wider">420 Online</span>
                    </div>
                </div>

                {/* Notices Card */}
                <div className="bg-[#0a0a0f]/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex items-center justify-between group hover:border-wine-500/30 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-wine-500/10 rounded-xl flex items-center justify-center text-wine-500">
                            <Bell className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-base md:text-xl leading-tight">Canal de Avisos</h3>
                            <p className="text-slate-500 text-xs md:text-sm">Fique por dentro</p>
                        </div>
                    </div>
                    <span className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-wider">Há 2 horas</span>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
                {/* Masterclass Card */}
                <div className="bg-[#0a0a0f]/40 backdrop-blur-[20px] border border-white/5 rounded-[40px] p-8 md:p-12 flex flex-col relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-10">
                        <div className="w-16 h-16 bg-wine-500/10 rounded-2xl flex items-center justify-center text-wine-500">
                            <BookOpen className="w-8 h-8" />
                        </div>
                        <div className="bg-wine-500/10 px-5 py-2 rounded-full border border-wine-500/20">
                            <span className="text-wine-500 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap leading-none">AULA SEMANAL</span>
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-[42px] font-bold text-white mb-6 leading-tight">Masterclass & Aulas</h2>
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10">
                        Acesse o conteúdo exclusivo e tutoriais avançados para acelerar sua jornada no ecossistema SaaS.
                    </p>

                    <div className="bg-[#1a0505]/40 border border-wine-900/30 rounded-3xl p-8 mb-12 relative group/item hover:bg-[#1a0505]/60 transition-all cursor-pointer">
                        <div className="flex flex-col gap-3">
                            <span className="text-wine-500 text-[10px] font-bold uppercase tracking-widest">PRÓXIMA AULA:</span>
                            <h4 className="text-white text-xl md:text-2xl font-bold leading-tight">Introdução a ferramenta</h4>
                        </div>
                    </div>

                    <div className="mt-auto pt-8 border-t border-white/5">
                        <div className="flex justify-between items-center mb-5">
                            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">PROGRESSO GERAL</span>
                            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">0% CONCLUÍDO</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-slate-700/50 rounded-full transition-all duration-1000"
                                style={{ width: '0%' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Protocolo Card */}
                <div className="bg-[#0a0a0f]/40 backdrop-blur-[20px] border border-white/5 rounded-[40px] p-8 md:p-12 flex flex-col relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-10">
                        <div className="w-16 h-16 bg-wine-500/10 rounded-2xl flex items-center justify-center text-wine-500">
                            <Rocket className="w-8 h-8" />
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-[42px] font-bold text-white mb-6 leading-tight">Protocolo de 8 Dias</h2>
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10">
                        Painel de ativação e construção do seu SaaS para desbloquear o certificado oficial de conclusão.
                    </p>

                    <div className="flex flex-col gap-0 mb-12 flex-1">
                        <div className="relative pl-8 border-l border-wine-900/30 pb-10">
                            <div className="absolute top-0 left-[-6px] w-3 h-3 bg-wine-600 rounded-full shadow-[0_0_15px_rgba(225,29,72,0.6)]" />
                            <h4 className="text-wine-500 text-sm md:text-base font-bold leading-none mb-3">Inicie sua jornada hoje</h4>
                            <p className="text-slate-500 text-xs md:text-sm leading-none">Siga o passo a passo validado.</p>
                        </div>
                    </div>

                    <button className="w-full bg-[#0a0a0f] border border-white/5 py-6 rounded-2xl flex items-center justify-center gap-3 group/btn hover:bg-slate-900 transition-all relative overflow-hidden shadow-2xl shadow-black/50">
                        <Play className="w-4 h-4 text-white fill-white" />
                        <span className="text-white text-sm md:text-base font-bold uppercase tracking-widest">INICIAR DIA 01</span>

                        {/* Background Bolt Decoration */}
                        <Zap className="absolute right-4 bottom-[-15px] w-24 h-24 text-white/5 -rotate-12 transition-transform group-hover:scale-110" />
                    </button>
                </div>
            </div>

            {/* Footer Decoration */}
            <footer className="mt-24 text-slate-600 text-[10px] md:text-xs">
                © 2024 Boltfy Learning Hub. Todos os direitos reservados.
            </footer>

            {/* Floating Theme Toggle (Visual only, to match screenshot) */}
            <div className="fixed bottom-6 right-6 w-12 h-12 rounded-full border border-white/10 bg-[#0a0a0f]/40 backdrop-blur-md flex items-center justify-center text-wine-500 cursor-pointer hover:bg-wine-500/10 transition-all z-50 shadow-xl">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shadow-wine-500/20 drop-shadow-sm">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
            </div>
        </div>
    );
};

export default StudyAreaView;
