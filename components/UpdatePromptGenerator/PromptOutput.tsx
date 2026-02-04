import React, { useState } from 'react';
import { Copy, Check, ArrowLeft } from 'lucide-react';

interface PromptOutputProps {
    prompt: string;
    onBack: () => void;
}

const PromptOutput: React.FC<PromptOutputProps> = ({ prompt, onBack }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col h-full animate-in zoom-in-95 fade-in duration-300">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Prompt Gerado</h3>
                <span className="text-xs text-slate-500 font-medium bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                    Pronto para Copiar
                </span>
            </div>

            <div className="relative flex-1 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden mb-6 group">
                <div className="absolute top-0 left-0 right-0 h-8 bg-slate-900/50 border-b border-white/5 flex items-center px-4 gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                <pre className="p-6 pt-12 h-full overflow-auto text-sm text-slate-300 font-mono whitespace-pre-wrap selection:bg-wine-500/30">
                    {prompt}
                </pre>

                <button
                    onClick={handleCopy}
                    className="absolute top-10 right-4 p-2 bg-slate-800/80 hover:bg-wine-600 text-slate-400 hover:text-white rounded-lg transition-all backdrop-blur-sm border border-white/5 shadow-xl opacity-0 group-hover:opacity-100"
                    title="Copiar Código"
                >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={onBack}
                    className="px-6 py-3 rounded-xl border border-slate-800 text-slate-400 font-bold text-sm hover:text-white hover:bg-slate-900 transition-colors flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Voltar e Editar
                </button>

                <button
                    onClick={handleCopy}
                    className="flex-1 px-6 py-3 rounded-xl bg-wine-600 hover:bg-wine-500 text-white font-bold text-sm shadow-lg shadow-wine-900/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                    {copied ? (
                        <>
                            <Check className="w-5 h-5" />
                            Copiado com Sucesso!
                        </>
                    ) : (
                        <>
                            <Copy className="w-5 h-5" />
                            Copiar Prompt
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default PromptOutput;
