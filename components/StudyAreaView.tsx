import React from 'react';
import { Users, Play, ExternalLink, Trophy } from 'lucide-react';

interface StudyAreaViewProps {
    onNavigateToCourse?: () => void;
}

const StudyAreaView: React.FC<StudyAreaViewProps> = ({ onNavigateToCourse }) => {
    // Smooth scroll handler
    const scrollToModules = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const modulesSection = document.getElementById('modulos-formacao');
        if (modulesSection) {
            modulesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="flex flex-col max-w-7xl mx-auto pt-10 pb-20 px-6">
            {/* Header Section */}
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Área de Estudos</h1>
                <p className="text-slate-400 text-sm md:text-base">Sua central de conhecimento estratégico e domínio técnico.</p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Course Card - Takes 2 columns on large screens */}
                <div className="lg:col-span-2 bg-gradient-to-br from-slate-900/40 to-slate-800/20 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                    {/* Decorative gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-wine-900/5 via-transparent to-transparent pointer-events-none" />

                    <div className="relative z-10">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-wine-500/10 border border-wine-500/20 px-4 py-1.5 rounded-full mb-6">
                            <div className="w-2 h-2 bg-wine-500 rounded-full" />
                            <span className="text-wine-400 text-[10px] font-bold uppercase tracking-wider">CURSO PRINCIPAL</span>
                        </div>

                        {/* Title and Description */}
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                            Formação Boltfy: O<br />Novo Mercado de IA
                        </h2>
                        <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
                            Domine a prática da criação de Apps com Inteligência Artificial. O conteúdo completo já está liberado. Aprenda a criar, vender e escalar seus projetos de software agora mesmo.
                        </p>

                        {/* Status Badge */}
                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                            <span className="text-emerald-400 text-xs font-medium uppercase tracking-wider">STATUS: CONTEÚDO DISPONÍVEL</span>
                        </div>

                        {/* CTA Button */}
                        <button
                            onClick={scrollToModules}
                            className="bg-gradient-to-r from-wine-600 to-wine-700 hover:from-wine-500 hover:to-wine-600 text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center gap-3 transition-all shadow-lg shadow-wine-900/20 hover:shadow-wine-900/40 hover:scale-[1.02]"
                        >
                            ACESSAR ÁREA DE MEMBROS
                            <ExternalLink className="w-4 h-4" />
                        </button>

                        {/* Completion Badge */}
                        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full mt-6">
                            <span className="text-amber-400 text-[10px] font-bold uppercase tracking-wider">🎓 CURSO COMPLETO</span>
                        </div>
                    </div>
                </div>

                {/* Sidebar with Community and Video */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    {/* Community VIP Card */}
                    <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col">
                        <div className="w-12 h-12 bg-wine-500/10 rounded-xl flex items-center justify-center text-wine-500 mb-4">
                            <Users className="w-6 h-6" />
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">Comunidade VIP</h3>
                        <p className="text-slate-400 text-xs mb-6 leading-relaxed">
                            Networking com outros fundadores e troca de experiências.
                        </p>
                        <button className="bg-slate-800/50 hover:bg-slate-700/50 border border-white/5 text-white px-4 py-3 rounded-xl font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                            Acessar Discord
                            <ExternalLink className="w-3 h-3" />
                        </button>
                    </div>

                    {/* YouTube Video Card */}
                    <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col relative overflow-hidden">
                        {/* Video Thumbnail */}
                        <div className="relative rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-slate-800 to-slate-900 aspect-video flex items-center justify-center group cursor-pointer">
                            <div className="absolute inset-0 bg-black/20" />
                            <div className="relative z-10 w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Play className="w-8 h-8 text-slate-900 fill-slate-900 ml-1" />
                            </div>
                            <div className="absolute top-3 right-3">
                                <div className="bg-wine-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    CANAL RECOMENDADO
                                </div>
                            </div>
                        </div>

                        {/* Video Title */}
                        <div className="flex items-center gap-2 mb-3">
                            <Play className="w-4 h-4 text-wine-500" />
                            <h3 className="text-white font-bold text-base">Domine o Jogo</h3>
                        </div>

                        {/* YouTube Button */}
                        <button className="bg-slate-800/50 hover:bg-slate-700/50 border border-white/5 text-white px-4 py-3 rounded-xl font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                            Assistir no YouTube
                            <ExternalLink className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modules Section - Anchor for smooth scroll */}
            <div id="modulos-formacao" className="mt-16 scroll-mt-24">
                <h2 className="text-3xl font-bold text-white mb-8">Módulos Disponíveis</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Module 1 */}
                    <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-wine-500/30 transition-all cursor-pointer">
                        <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">MÓDULO 1</div>
                        <h3 className="text-white font-bold text-xl mb-4">Introdução ao Ecossistema</h3>
                        <div className="flex items-center gap-4 text-slate-400 text-sm">
                            <div className="flex items-center gap-1">
                                <Play className="w-3 h-3" />
                                <span>15 min</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span>📚 2 Aulas</span>
                            </div>
                        </div>
                    </div>

                    {/* Module 2 */}
                    <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-wine-500/30 transition-all cursor-pointer">
                        <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">MÓDULO 2</div>
                        <h3 className="text-white font-bold text-xl mb-4">Fundamentos Técnicos</h3>
                        <div className="flex items-center gap-4 text-slate-400 text-sm">
                            <div className="flex items-center gap-1">
                                <Play className="w-3 h-3" />
                                <span>40 min</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span>📚 4 Aulas</span>
                            </div>
                        </div>
                    </div>

                    {/* Module 3 */}
                    <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-wine-500/30 transition-all cursor-pointer">
                        <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">MÓDULO 3</div>
                        <h3 className="text-white font-bold text-xl mb-4">Mão na Massa</h3>
                        <div className="flex items-center gap-4 text-slate-400 text-sm">
                            <div className="flex items-center gap-1">
                                <Play className="w-3 h-3" />
                                <span>2h</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span>📚 7 Aulas</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Protocol 8 Days - Full Width */}
            <div className="mt-8 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex items-center justify-between group hover:border-wine-500/30 transition-all">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
                        <Trophy className="w-8 h-8" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-white font-bold text-xl">Protocolo 8 Dias</h3>
                            <div className="bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                                <span className="text-amber-400 text-[9px] font-bold uppercase tracking-wider">CERTIFICADO OFICIAL</span>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm">
                            O desafio definitivo. Complete 8 missões práticas e consecutivas para desbloquear seu <span className="text-white font-semibold">Certificado de Especialista Boltfy</span>.
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">SEU PROGRESSO</div>
                        <div className="text-wine-500 text-2xl font-bold">0%</div>
                    </div>
                    <button className="bg-slate-800 hover:bg-slate-700 text-white p-4 rounded-xl transition-all group-hover:bg-wine-600">
                        <Play className="w-5 h-5 fill-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudyAreaView;
