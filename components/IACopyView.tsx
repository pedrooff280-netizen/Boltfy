import React, { useState } from 'react';
import {
    MessageSquare,
    Instagram,
    Mail,
    Sparkles,
    ChevronLeft,
    Video,
    Phone,
    Copy,
    Check,
    RefreshCw,
    Info,
    ArrowLeft,
    ArrowRight,
    Mic
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ScriptsResultView from './ScriptsResultView';

interface IACopyViewProps {
    // Props se necessário
}

const IACopyView: React.FC<IACopyViewProps> = () => {
    // Estados do Formulário
    const [myData, setMyData] = useState({ name: 'Pedro', company: 'Boltfy' });
    const [leadData, setLeadData] = useState({
        name: '',
        company: '',
        contactName: '',
        segment: ''
    });

    // Estados Estratégicos
    const [strategy, setStrategy] = useState({
        hook: '',
        pain: '',
        promise: '',
        solution: ''
    });

    const [channel, setChannel] = useState<'whatsapp' | 'instagram' | 'email'>('whatsapp');
    const [showResult, setShowResult] = useState(false);

    // Estados da IA
    const [generatedScripts, setGeneratedScripts] = useState({
        whatsapp: '',
        instagram: '',
        email: '',
        cold_call: ''
    });

    // Legacy single-script state (mantido compatibilidade visual do simulador enquanto digita)
    const [scripts, setScripts] = useState<string[]>([]);
    const [currentScriptIdx, setCurrentScriptIdx] = useState(0);

    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);

    // Live Preview
    const targetName = leadData.contactName || leadData.name || 'Contato';
    const livePreview = strategy.hook || strategy.pain || strategy.promise
        ? `${strategy.hook ? strategy.hook + ' ' : ''}${strategy.pain ? 'Isso deve ser frustrante. ' + strategy.pain + ' ' : ''}${strategy.promise ? 'Imagine ' + strategy.promise + '. ' : ''}${strategy.solution ? 'Nós podemos ajudar com ' + strategy.solution + '.' : ''}`
        : `Olá ${targetName}, vi algo interessante sobre a ${leadData.company || '[Empresa]'}...`;

    const activeScript = scripts.length > 0 ? scripts[currentScriptIdx] : livePreview;

    const handleGenerate = async () => {
        if (!strategy.hook && !strategy.pain && !strategy.solution) return;

        setIsGenerating(true);
        setScripts([]); // Clear previous

        // Simulação de delay para "Glassmorphism" effect
        await new Promise(resolve => setTimeout(resolve, 2000));

        const apiKey = process.env.API_KEY;

        // MOCK MODE: Fallback sem chave
        if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
            const mockScripts = {
                whatsapp: `Oi ${targetName}, tudo bem? Me chamo ${myData.name}.\n\nAcompanho o trabalho da ${leadData.company} e notei que ${strategy.hook}. \n\nMuitas empresas no segmento de ${leadData.segment}, ao lidarem com isso, acabam enfrentando o desafio de ${strategy.pain}. \n\nNós ajudamos negócios a resolver exatamente essa questão através de ${strategy.solution}, permitindo que alcancem ${strategy.promise}. \n\nFaz sentido conversarmos por 10 minutos para eu entender se nossa abordagem pode ser útil para a ${leadData.company} também?`,
                instagram: `Fala ${targetName}! 👋 Vi aqui o perfil da ${leadData.company} e notei uma oportunidade em ${strategy.hook}.\n\nSei que isso pode gerar ${strategy.pain}, mas existe um jeito de virar o jogo para ${strategy.promise}.\n\nMe avisa se quiser trocar uma ideia rápida sobre isso!`,
                email: `Assunto: Sobre a operação da ${leadData.company}\n\nOlá ${targetName},\n\nEstava analisando a ${leadData.company} e notei que ${strategy.hook}.\n\nNormalmente, empresas do segmento ${leadData.segment} enfrentam ${strategy.pain} por conta disso.\n\nA ${myData.company} desenvolveu ${strategy.solution} justamente para garantir ${strategy.promise}.\n\nVocê teria 10 minutos na quinta-feira para eu te mostrar como isso funcionaria para vocês?\n\nAbs,\n${myData.name}`,
                cold_call: `(Intro)\nOi ${targetName}, aqui é ${myData.name} da ${myData.company}. Tudo bem?\n\n(Motivo)\nTe liguei porque vi que ${strategy.hook} na ${leadData.company} e queria validar se ${strategy.pain} é uma prioridade hoje.\n\n(Valor)\nA gente ajuda empresas a ${strategy.promise} com ${strategy.solution}.\n\n(Fechamento)\nFaz sentido agendarmos uma demo rápida?`
            };

            setGeneratedScripts(mockScripts);
            setShowResult(true);
            setIsGenerating(false);
            return;
        }

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Aja como um Engenheiro de Vendas e Copywriter Expert.
            Crie um "Protocolo de Conversão" completo com 4 scripts distintos baseados nesta estratégia.

            DADOS:
            - Remetente: ${myData.name} (${myData.company})
            - Lead: ${targetName} (${leadData.company}) - Segmento: ${leadData.segment}

            ESTRATÉGIA:
            1. Gancho: "${strategy.hook}"
            2. Dor: "${strategy.pain}"
            3. Solução: "${strategy.solution}"
            4. Promessa: "${strategy.promise}"

            Gere um JSON com as chaves: "whatsapp", "instagram", "email", "cold_call".
            - WhatsApp: Tom conversacional, direto, quebras de linha curtas.
            - Instagram: Casual, uso de emojis moderado, focado em resposta rápida.
            - Email: Estrutura Pain-Agitate-Solution, tom profissional mas humano.
            - Cold Call: Estrutura de roteiro (Intro -> Motivo -> Valor -> Fechamento).
            
            Retorne APENAS o JSON.
            `;

            const result = await ai.models.generateContent({
                model: "gemini-2.0-flash-exp",
                contents: prompt,
                config: { responseMimeType: "application/json" }
            });

            const responseText = result.text || '{}';
            const parsed = JSON.parse(responseText);

            setGeneratedScripts({
                whatsapp: parsed.whatsapp || 'Erro ao gerar WhatsApp',
                instagram: parsed.instagram || 'Erro ao gerar Instagram',
                email: parsed.email || 'Erro ao gerar Email',
                cold_call: parsed.cold_call || 'Erro ao gerar Call'
            });

            setShowResult(true);

        } catch (error) {
            console.error("Erro ao gerar copy:", error);
            // Fallback erro
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(activeScript);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const nextScript = () => {
        if (currentScriptIdx < scripts.length - 1) setCurrentScriptIdx(prev => prev + 1);
    };

    const prevScript = () => {
        if (currentScriptIdx > 0) setCurrentScriptIdx(prev => prev - 1);
    };

    // Renderiza a Nova Tela de Resultados se tiver gerado
    if (showResult) {
        return (
            <ScriptsResultView
                leadData={{ ...leadData, contactName: targetName }}
                scripts={generatedScripts}
                strategy={strategy}
                onBack={() => setShowResult(false)}
            />
        );
    }

    // Renderiza a Tela Principal de Input (Padrão)
    return (
        <div className="max-w-7xl mx-auto py-4 animate-in fade-in duration-700 min-h-[calc(100vh-100px)] flex flex-col">

            {/* Header */}
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wine-500/10 border border-wine-500/20 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-wine-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-wine-400 uppercase tracking-widest">Boltfy Strategy 2.0</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
                    Engenharia de Copy
                </h1>
                <p className="text-slate-400 text-lg font-medium max-w-2xl mx-auto">
                    Transforme observações em reuniões agendadas com nossa estratégia deep-dive.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-1">

                {/* Coluna Esquerda - Formulário Estratégico */}
                <div className="lg:col-span-7 space-y-8">

                    {/* SEÇÃO 1: DADOS ESSENCIAIS */}
                    <div className="bg-slate-950/60 border border-slate-800/30 rounded-3xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-wine-600/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-wine-500/20 flex items-center justify-center text-wine-400 text-sm">01</span>
                            Dados Essenciais
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Seu Nome (ou Marca)</label>
                                <input
                                    type="text"
                                    value={myData.name}
                                    onChange={e => setMyData({ ...myData, name: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800/30 rounded-xl px-4 py-3 text-sm text-slate-300 focus:border-wine-500/50 outline-none transition-all placeholder:text-slate-600"
                                    placeholder="Ex: Pedro da Boltfy"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Nome da Empresa (Lead)</label>
                                <input
                                    type="text"
                                    value={leadData.company}
                                    onChange={e => setLeadData({ ...leadData, company: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800/30 rounded-xl px-4 py-3 text-sm text-slate-300 focus:border-wine-500/50 outline-none transition-all placeholder:text-slate-600"
                                    placeholder="Ex: Barbearia Vip"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Nome do Contato <span className="text-slate-600 normal-case tracking-normal">(Opcional)</span></label>
                                <input
                                    type="text"
                                    value={leadData.contactName}
                                    onChange={e => setLeadData({ ...leadData, contactName: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800/30 rounded-xl px-4 py-3 text-sm text-slate-300 focus:border-wine-500/50 outline-none transition-all placeholder:text-slate-600"
                                    placeholder="Ex: João Silva"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Segmento da Empresa</label>
                                <input
                                    type="text"
                                    value={leadData.segment}
                                    onChange={e => setLeadData({ ...leadData, segment: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800/30 rounded-xl px-4 py-3 text-sm text-slate-300 focus:border-wine-500/50 outline-none transition-all placeholder:text-slate-600"
                                    placeholder="Ex: Restaurante, Academia..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* SEÇÃO 2: ESTRATÉGIA DA MENSAGEM */}
                    <div className="bg-slate-950/60 border border-slate-800/30 rounded-3xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm">02</span>
                                Estratégia da Mensagem
                            </h3>
                            <p className="text-xs text-slate-500 font-medium ml-10 mt-1">O coração da sua copy. Preencha com atenção.</p>
                        </div>

                        <div className="space-y-6">

                            {/* 1. O Gancho */}
                            <div className="relative group/input">
                                <label className="flex items-center gap-2 text-[11px] font-bold text-wine-400 uppercase tracking-widest mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-wine-500"></span>
                                    O 'Gancho' (Observação)
                                    <Info className="w-3 h-3 text-slate-600 ml-auto" />
                                </label>
                                <textarea
                                    className="w-full bg-slate-950 border border-slate-800/30 rounded-2xl p-4 text-sm text-slate-300 focus:border-wine-500 focus:bg-slate-900 outline-none transition-all placeholder:text-slate-700 resize-none h-24"
                                    placeholder="O que você notou sobre a empresa que prova que sua mensagem não é spam?"
                                    value={strategy.hook}
                                    onChange={e => setStrategy({ ...strategy, hook: e.target.value })}
                                />
                            </div>

                            {/* 2. A Dor */}
                            <div className="relative group/input">
                                <label className="flex items-center gap-2 text-[11px] font-bold text-red-400 uppercase tracking-widest mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                    A 'Dor' (Problema Percebido)
                                </label>
                                <textarea
                                    className="w-full bg-slate-950 border border-red-900/30 rounded-2xl p-4 text-sm text-slate-300 focus:border-red-500 focus:bg-slate-900 outline-none transition-all placeholder:text-slate-700 resize-none h-24"
                                    placeholder="Como sua observação se conecta a um problema que a empresa enfrenta?"
                                    value={strategy.pain}
                                    onChange={e => setStrategy({ ...strategy, pain: e.target.value })}
                                />
                            </div>

                            {/* 3. A Promessa */}
                            <div className="relative group/input">
                                <label className="flex items-center gap-2 text-[11px] font-bold text-emerald-400 uppercase tracking-widest mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    A 'Promessa' (Oportunidade)
                                </label>
                                <textarea
                                    className="w-full bg-slate-950 border border-emerald-900/30 rounded-2xl p-4 text-sm text-slate-300 focus:border-emerald-500 focus:bg-slate-900 outline-none transition-all placeholder:text-slate-700 resize-none h-24"
                                    placeholder="Qual o cenário ideal ou benefício que eles alcançariam com sua solução?"
                                    value={strategy.promise}
                                    onChange={e => setStrategy({ ...strategy, promise: e.target.value })}
                                />
                            </div>

                            {/* 4. A Solução */}
                            <div className="relative group/input">
                                <label className="flex items-center gap-2 text-[11px] font-bold text-purple-400 uppercase tracking-widest mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                    Sua Solução
                                </label>
                                <textarea
                                    className="w-full bg-slate-950 border border-purple-900/30 rounded-2xl p-4 text-sm text-slate-300 focus:border-purple-500 focus:bg-slate-900 outline-none transition-all placeholder:text-slate-700 resize-none h-24"
                                    placeholder="Descreva o que você faz, conectando o problema à oportunidade."
                                    value={strategy.solution}
                                    onChange={e => setStrategy({ ...strategy, solution: e.target.value })}
                                />
                            </div>

                            <button
                                onClick={handleGenerate}
                                disabled={isGenerating}
                                className="w-full mt-4 bg-gradient-to-r from-wine-600 via-rose-600 to-pink-600 text-white font-bold py-4 rounded-2xl shadow-[0_0_20px_rgba(136,19,55,0.3)] hover:shadow-[0_0_30px_rgba(136,19,55,0.5)] hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase tracking-wide text-xs disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                {isGenerating ? (
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Sparkles className="w-4 h-4 group-hover:text-yellow-300 transition-colors" />
                                )}
                                {isGenerating ? 'Processando Estratégia...' : 'Gerar Scripts'}
                            </button>

                        </div>
                    </div>
                </div>

                {/* Coluna Direita - Simulador Glassmorphism */}
                <div className="lg:col-span-5 flex justify-center sticky top-8">
                    <div className="relative w-[340px] h-[700px] bg-[#121212] rounded-[50px] border-[8px] border-[#2a2a2a] shadow-2xl flex flex-col overflow-hidden ring-4 ring-black/20">
                        {/* Dynamic Island */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-30 flex items-center justify-center">
                            <div className="w-16 h-4 bg-black rounded-full" />
                        </div>

                        {/* Phone Header */}
                        <div className="bg-[#1f2c34]/90 backdrop-blur-md px-5 pt-12 pb-4 flex items-center gap-3 shadow-lg z-20 border-b border-white/5">
                            <ChevronLeft className="w-6 h-6 text-wine-400" />
                            <div className="flex items-center gap-3 flex-1">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-wine-500 to-rose-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-[#1f2c34]">
                                    {targetName ? targetName.substring(0, 2).toUpperCase() : 'LD'}
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="text-white text-sm font-bold leading-tight line-clamp-1">{targetName}</h4>
                                    <span className="text-emerald-500 text-[10px] font-medium animate-pulse">Online</span>
                                </div>
                            </div>
                            <Video className="w-5 h-5 text-wine-500" />
                            <Phone className="w-5 h-5 text-wine-500" />
                        </div>

                        {/* Phone Body with Wallpaper */}
                        <div className="flex-1 bg-[#0b141a] relative overflow-hidden flex flex-col">
                            {/* WhatsApp Doodle Wallpaper */}
                            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat z-0" />

                            <div className="relative z-10 p-4 flex-1 overflow-y-auto flex flex-col justify-end space-y-4 pb-20">

                                <div className="flex justify-center mb-6">
                                    <span className="bg-[#1f2c34] text-[#8696a0] text-[10px] px-3 py-1 rounded-full border border-white/5 font-medium shadow-lg">
                                        Hoje
                                    </span>
                                </div>

                                {/* Balão Glassmorphism Dinâmico */}
                                <div className="flex justify-end animate-in slide-in-from-right-10 duration-500">
                                    <div className={`relative max-w-[90%] p-4 rounded-2xl rounded-tr-sm shadow-xl backdrop-blur-md border transition-all duration-300
                                        ${scripts.length > 0
                                            ? 'bg-wine-600/30 border-wine-500/30'
                                            : 'bg-[#005c4b]/80 border-[#005c4b]/50'
                                        }`}
                                    >
                                        {/* Typing Indicator if generating */}
                                        {isGenerating ? (
                                            <div className="flex gap-1 py-1">
                                                <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </div>
                                        ) : (
                                            <p className="text-white text-sm leading-relaxed whitespace-pre-line font-medium drop-shadow-sm">
                                                {activeScript}
                                            </p>
                                        )}

                                        <div className="flex justify-end items-end gap-1 mt-2">
                                            <span className="text-[9px] text-white/60 font-medium">
                                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                            <Check className="w-3.5 h-3.5 text-wine-300" />
                                        </div>
                                    </div>
                                </div>

                                {/* Navegação de Scripts (Só aparece se tiver scripts e NÃO estiver mostrando resultado final ainda) */}
                                {scripts.length > 0 && !showResult && (
                                    <div className="absolute bottom-4 left-0 right-0 px-4 flex justify-between items-end z-30">

                                        {/* Controls Container */}
                                        <div className="bg-[#1f2c34]/90 backdrop-blur-xl border border-white/10 p-2 rounded-2xl flex items-center gap-4 shadow-2xl mx-auto">

                                            <button
                                                onClick={prevScript}
                                                disabled={currentScriptIdx === 0}
                                                className="p-2 rounded-xl hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-white"
                                            >
                                                <ArrowLeft className="w-4 h-4" />
                                            </button>

                                            <div className="flex flex-col items-center min-w-[80px]">
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Variação</span>
                                                <div className="flex gap-1 mt-1">
                                                    {scripts.map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentScriptIdx ? 'bg-wine-500 w-3' : 'bg-slate-600'}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            <button
                                                onClick={nextScript}
                                                disabled={currentScriptIdx === scripts.length - 1}
                                                className="p-2 rounded-xl hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-white"
                                            >
                                                <ArrowRight className="w-4 h-4" />
                                            </button>

                                            <div className="w-px h-8 bg-white/10 mx-1" />

                                            <button
                                                onClick={copyToClipboard}
                                                className="flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-wine-600 hover:bg-wine-500 text-white shadow-lg transition-all active:scale-95"
                                            >
                                                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                            </button>

                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>

                        {/* Phone Input Area (Visual Only) */}
                        <div className="bg-[#1f2c34] p-3 flex items-center gap-3 z-20 border-t border-white/5">
                            <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-slate-400" />
                            </div>
                            <div className="h-9 bg-[#2a3942] rounded-full flex-1" />
                            <div className="w-9 h-9 bg-teal-600 rounded-full flex items-center justify-center shadow-lg">
                                <Mic className="w-4 h-4 text-white" />
                            </div>
                        </div>

                    </div>

                    {/* Badge */}
                    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full text-center">
                        <span className="px-4 py-2 bg-slate-950 border border-wine-500/30 rounded-full text-[10px] text-wine-400 font-bold uppercase tracking-widest shadow-xl">
                            Simulador em Tempo Real
                        </span>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default IACopyView;
