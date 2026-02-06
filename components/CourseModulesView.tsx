import React from 'react';
import { Clock, BookOpen, ArrowLeft } from 'lucide-react';

interface CourseModulesViewProps {
    onBack?: () => void;
}

const CourseModulesView: React.FC<CourseModulesViewProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />

            {/* Red gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-wine-950/20 via-transparent to-wine-950/10 pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                {/* Back Button */}
                {onBack && (
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">Voltar</span>
                    </button>
                )}

                {/* Header */}
                <div className="mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                        Formação Boltfy:<br />
                        <span className="text-wine-500">Automação Inteligente</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-3xl leading-relaxed">
                        Domine a prática do uso de automações avançadas com IA para otimizar processos.<br />
                        Aprenda a integrar inteligência e automação aos seus projetos de forma prática agora mesmo.
                    </p>
                </div>

                {/* Modules Section */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-6 bg-wine-500" />
                            <div className="w-1 h-6 bg-wine-500" />
                            <div className="w-1 h-6 bg-wine-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-white uppercase tracking-wider">MÓDULOS DISPONÍVEIS</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Module 1 */}
                        <div className="bg-gradient-to-br from-slate-900/60 to-slate-950/40 backdrop-blur-md border border-wine-500/30 rounded-3xl p-8 hover:border-wine-500/60 transition-all cursor-pointer group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-wine-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10">
                                <div className="text-wine-500 text-xs font-bold uppercase tracking-wider mb-4">MÓDULO 1</div>
                                <h3 className="text-white font-bold text-2xl mb-6 leading-tight">
                                    Introdução ao<br />Ecossistema
                                </h3>

                                {/* Icon/Visual */}
                                <div className="mb-8 h-32 flex items-center justify-center">
                                    <div className="grid grid-cols-4 gap-2 opacity-30 group-hover:opacity-50 transition-opacity">
                                        {[...Array(12)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="w-6 h-6 border border-wine-500/40 rounded"
                                                style={{
                                                    transform: `translateY(${Math.sin(i) * 10}px)`,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 text-slate-400 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>15 MIN</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="w-4 h-4" />
                                        <span>2 Aulas</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Module 2 */}
                        <div className="bg-gradient-to-br from-slate-900/60 to-slate-950/40 backdrop-blur-md border border-wine-500/30 rounded-3xl p-8 hover:border-wine-500/60 transition-all cursor-pointer group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-wine-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10">
                                <div className="text-wine-500 text-xs font-bold uppercase tracking-wider mb-4">MÓDULO 2</div>
                                <h3 className="text-white font-bold text-2xl mb-6 leading-tight">
                                    Fundamentos<br />Técnicos
                                </h3>

                                {/* Background Image Placeholder */}
                                <div className="mb-8 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                                    <div className="text-slate-600 text-xs uppercase tracking-wider">Workshop Scene</div>
                                </div>

                                <div className="flex items-center gap-6 text-slate-400 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>40 MIN</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="w-4 h-4" />
                                        <span>4 Aulas</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Module 3 */}
                        <div className="bg-gradient-to-br from-slate-900/60 to-slate-950/40 backdrop-blur-md border border-wine-500/30 rounded-3xl p-8 hover:border-wine-500/60 transition-all cursor-pointer group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-wine-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10">
                                <div className="text-wine-500 text-xs font-bold uppercase tracking-wider mb-4">MÓDULO 3</div>
                                <h3 className="text-white font-bold text-2xl mb-6 leading-tight">
                                    Mão na Massa
                                </h3>

                                {/* Code Visual */}
                                <div className="mb-8 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-slate-950 to-black p-4 font-mono text-[10px] leading-relaxed">
                                    <div className="text-wine-400">{'<script>'}</div>
                                    <div className="text-slate-500 ml-4">const ai = <span className="text-wine-300">new</span> <span className="text-wine-400">AutomationAI</span>();</div>
                                    <div className="text-slate-500 ml-4">ai.<span className="text-wine-300">optimize</span>();</div>
                                    <div className="text-wine-400">{'</script>'}</div>
                                </div>

                                <div className="flex items-center gap-6 text-slate-400 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>2h</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="w-4 h-4" />
                                        <span>7 Aulas</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseModulesView;
