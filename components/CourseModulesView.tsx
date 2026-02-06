import React from 'react';
import { Clock, BookOpen, ArrowLeft } from 'lucide-react';

interface CourseModulesViewProps {
    onBack?: () => void;
}

const CourseModulesView: React.FC<CourseModulesViewProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* Background Image - Circuit Board Pattern */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23444' stroke-width='0.5'/%3E%3Cpath d='M20 20h60v60H20z' fill='none' stroke='%23333' stroke-width='0.5'/%3E%3C/svg%3E")`,
                    backgroundSize: '100px 100px'
                }}
            />

            {/* Red gradient overlay - stronger on the right */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-wine-950/20 to-wine-900/40 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-wine-900/30 blur-[120px] pointer-events-none" />

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
                        {/* Module 1 - Cubes */}
                        <div className="bg-black border border-wine-500/30 rounded-3xl overflow-hidden hover:border-wine-500/60 transition-all cursor-pointer group relative h-[400px]">
                            {/* Background with cubes pattern */}
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-black">
                                {/* Wireframe cubes grid */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-40 transition-opacity">
                                    <div className="grid grid-cols-4 gap-4 p-8">
                                        {[...Array(12)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="w-12 h-12 border-2 border-wine-500/40 rounded-sm transform rotate-45"
                                                style={{
                                                    transform: `rotate(45deg) translateY(${Math.sin(i * 0.5) * 10}px)`,
                                                    borderColor: i % 3 === 0 ? 'rgba(157, 23, 77, 0.6)' : 'rgba(157, 23, 77, 0.3)'
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                                <div>
                                    <div className="text-wine-500 text-xs font-bold uppercase tracking-wider mb-4">MÓDULO 1</div>
                                    <h3 className="text-white font-bold text-2xl mb-6 leading-tight">
                                        Introdução ao<br />Ecossistema
                                    </h3>
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

                        {/* Module 2 - Workshop */}
                        <div className="bg-black border border-wine-500/30 rounded-3xl overflow-hidden hover:border-wine-500/60 transition-all cursor-pointer group relative h-[400px]">
                            {/* Workshop background simulation */}
                            <div className="absolute inset-0">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-950/20 via-slate-900 to-black" />
                                {/* Simulating wooden beams and workspace */}
                                <div className="absolute inset-0 opacity-20">
                                    <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-amber-900/40 to-transparent" />
                                    <div className="absolute bottom-1/3 left-1/4 w-1/2 h-1/3 bg-slate-700/20 rounded-lg" />
                                </div>
                            </div>

                            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                                <div>
                                    <div className="text-wine-500 text-xs font-bold uppercase tracking-wider mb-4">MÓDULO 2</div>
                                    <h3 className="text-white font-bold text-2xl mb-6 leading-tight">
                                        Fundamentos<br />Técnicos
                                    </h3>
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

                        {/* Module 3 - Code */}
                        <div className="bg-black border border-wine-500/30 rounded-3xl overflow-hidden hover:border-wine-500/60 transition-all cursor-pointer group relative h-[400px]">
                            {/* Code background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-black">
                                <div className="absolute inset-0 p-6 font-mono text-[10px] leading-relaxed opacity-30 overflow-hidden">
                                    <div className="text-wine-400">{'<script>'}</div>
                                    <div className="text-blue-400 ml-4">const <span className="text-wine-300">automation</span> = {'{'};</div>
                                    <div className="text-slate-500 ml-8">init: <span className="text-green-400">function</span>() {'{'}</div>
                                    <div className="text-slate-500 ml-12">console.<span className="text-wine-300">log</span>(<span className="text-amber-400">'Starting AI...'</span>);</div>
                                    <div className="text-slate-500 ml-8">{'}'}</div>
                                    <div className="text-blue-400 ml-4">{'};'}</div>
                                    <div className="text-wine-400">{'</script>'}</div>
                                    <div className="mt-2 text-purple-400">{'<style>'}</div>
                                    <div className="text-slate-500 ml-4">.ai-module {'{'}</div>
                                    <div className="text-slate-500 ml-8">display: <span className="text-green-400">flex</span>;</div>
                                    <div className="text-slate-500 ml-8">color: <span className="text-wine-300">#ff0066</span>;</div>
                                    <div className="text-slate-500 ml-4">{'}'}</div>
                                    <div className="text-purple-400">{'</style>'}</div>
                                </div>
                            </div>

                            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                                <div>
                                    <div className="text-wine-500 text-xs font-bold uppercase tracking-wider mb-4">MÓDULO 3</div>
                                    <h3 className="text-white font-bold text-2xl mb-6 leading-tight">
                                        Mão na Massa
                                    </h3>
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
