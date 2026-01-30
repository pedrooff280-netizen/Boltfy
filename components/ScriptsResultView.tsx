import React, { useState } from 'react';
import {
    MessageSquare,
    Instagram,
    Mail,
    Phone,
    Copy,
    Check,
    ChevronDown,
    ChevronUp,
    ArrowLeft,
    Shield,
    Zap,
    Clock,
    UserCheck,
    Target,
    Save,
    Loader2
} from 'lucide-react';
import { supabase } from '../src/lib/supabase';

interface ScriptsResultViewProps {
    leadData: {
        name: string;
        contactName: string;
        segment: string;
    };
    scripts: {
        whatsapp: string;
        instagram: string;
        email: string;
        cold_call: string;
    };
    strategy: any; // Receives strategy to save
    onBack: () => void;
}

const ScriptsResultView: React.FC<ScriptsResultViewProps> = ({ leadData, scripts, strategy, onBack }) => {
    const [activeTab, setActiveTab] = useState<'whatsapp' | 'instagram' | 'email' | 'cold_call'>('whatsapp');
    const [copied, setCopied] = useState(false);
    const [openSection, setOpenSection] = useState<string | null>('prep');
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleCopy = () => {
        navigator.clipboard.writeText(scripts[activeTab]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            const { error } = await supabase
                .from('projects')
                .insert({
                    user_id: user.id,
                    name: leadData.name || 'Novo Projeto',
                    segment: leadData.segment,
                    strategy: strategy,
                    scripts: scripts
                });

            if (error) throw error;

            setSaveStatus('success');
            setTimeout(() => setSaveStatus('idle'), 3000);
        } catch (error) {
            console.error('Erro ao salvar:', error);
            setSaveStatus('error');
        } finally {
            setIsSaving(false);
        }
    };

    const toggleSection = (id: string) => {
        setOpenSection(openSection === id ? null : id);
    };

    const tabs = [
        { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
        { id: 'instagram', label: 'Instagram', icon: Instagram, color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
        { id: 'email', label: 'E-mail', icon: Mail, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
        { id: 'cold_call', label: 'Cold Call', icon: Phone, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' }
    ];

    const manualSections = [
        {
            id: 'prep',
            title: 'FASE 01: PREPARAÇÃO (Antes de Ligar)',
            items: [
                { title: 'Como passar confiança imediata', content: 'Pesquise 3 fatos rápidos sobre a empresa antes. Mencione um logo nos primeiros segundos.' },
                { title: 'Controlando a ansiedade de vender', content: 'Lembre-se: você não está pedindo um favor, está oferecendo uma solução valiosa. Fale de igual para igual.' },
                { title: 'Agindo como um consultor especialista', content: 'Seja diagnóstico. "Vi X, isso causa Y?" em vez de "Quer comprar Z?".' }
            ]
        },
        {
            id: 'contact',
            title: 'FASE 02: O PRIMEIRO CONTATO',
            content: 'Dicas para quebrar gelo...'
        },
        {
            id: 'objections',
            title: 'FASE 03: CONTORNANDO OBJEÇÕES',
            items: [
                { title: 'O que falar quando dizem: "Tô sem tempo"', content: '"Entendo. Só preciso de 30 segundos para te dizer por que te liguei, depois você decide se continuamos. Pode ser?"' },
                { title: 'O que falar quando dizem: "Manda por e-mail"', content: '"Posso mandar sim. Mas para mandar algo que realmente sirva, só preciso de uma informação rápida..."' },
                { title: 'O que falar quando dizem: "Já tenho agência"', content: '"Ótimo! Não quero que troque. Só quero mostrar uma tecnologia que pode ajudar eles (ou vocês) a venderem mais."' }
            ]
        },
        {
            id: 'closing',
            title: 'FASE 04: FECHAMENTO',
            content: 'Técnicas de fechamento...'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto py-4 animate-in fade-in duration-500 min-h-[calc(100vh-100px)] flex flex-col text-slate-200">

            {/* Header Protocolo */}
            <div className="mb-8">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 text-xs font-bold uppercase tracking-widest"
                >
                    <ArrowLeft className="w-4 h-4" /> Voltar
                </button>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-6">
                    <div>
                        <h1 className="text-3xl font-black text-white mb-2">Protocolo de Conversão: <span className="text-wine-400">{leadData.name || 'Lead'}</span></h1>
                        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                            <span className="flex items-center gap-2"><Target className="w-3.5 h-3.5" /> ALVO: <span className="text-slate-300">{leadData.contactName || 'Geral'}</span></span>
                            <span className="w-px h-3 bg-white/10" />
                            <span className="flex items-center gap-2"><Shield className="w-3.5 h-3.5" /> NICHO: <span className="text-slate-300">{leadData.segment || 'Geral'}</span></span>
                            <span className="w-px h-3 bg-white/10" />
                            <span className="flex items-center gap-2 text-emerald-400"><Check className="w-3.5 h-3.5" /> STATUS: Otimizado</span>
                        </div>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={isSaving || saveStatus === 'success'}
                        className={`px-4 py-2 border rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${saveStatus === 'success'
                            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                            : saveStatus === 'error'
                                ? 'bg-red-500/20 border-red-500/50 text-red-400'
                                : 'bg-slate-900 border-white/10 text-slate-300 hover:bg-white/5'
                            }`}
                    >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> :
                            saveStatus === 'success' ? <Check className="w-4 h-4" /> :
                                <Save className="w-4 h-4" />
                        }
                        {isSaving ? 'Salvando...' :
                            saveStatus === 'success' ? 'Salvo na Biblioteca' :
                                saveStatus === 'error' ? 'Erro ao Salvar' :
                                    'Salvar Projeto'
                        }
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Main Content - Scripts */}
                <div className="lg:col-span-8 space-y-6">

                    {/* Channel Tabs */}
                    <div className="flex flex-wrap gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all ${activeTab === tab.id
                                    ? `${tab.bg} ${tab.border} text-white shadow-lg`
                                    : 'bg-slate-950/60 border-transparent text-slate-500 hover:bg-slate-800/40 hover:text-slate-300'
                                    }`}
                            >
                                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? tab.color : 'text-current'}`} />
                                <span className="text-xs font-bold uppercase tracking-wide">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Script Display */}
                    <div className="bg-slate-950/60 border border-slate-800/20 rounded-3xl p-8 relative min-h-[400px] shadow-2xl">
                        <div className="absolute top-0 right-0 p-4">
                            <button
                                onClick={handleCopy}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${copied
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copied ? 'Copiado' : 'Copiar'}
                            </button>
                        </div>

                        <div className="prose prose-invert max-w-none">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                {tabs.find(t => t.id === activeTab)?.icon && React.createElement(tabs.find(t => t.id === activeTab)!.icon, { className: "w-5 h-5 text-wine-400" })}
                                Script Otimizado
                            </h3>
                            <div className="whitespace-pre-wrap text-base leading-relaxed text-slate-300 font-medium">
                                {scripts[activeTab] || "Gerando script..."}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Sidebar - Manual de Operações */}
                <div className="lg:col-span-4">
                    <div className="sticky top-8 space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Manual de Operações</h4>
                            <span className="text-[10px] text-wine-500 font-bold">Estratégias de Conversão</span>
                        </div>

                        <div className="space-y-2">
                            {manualSections.map((section) => (
                                <div key={section.id} className="bg-slate-950/60 border border-slate-800/10 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => toggleSection(section.id)}
                                        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                                    >
                                        <span className="text-[10px] font-bold text-wine-300 uppercase tracking-wider">{section.title}</span>
                                        {openSection === section.id ? <ChevronUp className="w-3 h-3 text-slate-500" /> : <ChevronDown className="w-3 h-3 text-slate-500" />}
                                    </button>

                                    {openSection === section.id && (
                                        <div className="px-4 pb-4 pt-1 bg-[#0a101f]">
                                            {section.items ? (
                                                <div className="space-y-3">
                                                    {section.items.map((item, idx) => (
                                                        <div key={idx} className="border-l-2 border-wine-500/20 pl-3">
                                                            <p className="text-xs font-bold text-white mb-1">{item.title}</p>
                                                            <p className="text-[11px] text-slate-400 leading-relaxed">{item.content}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-xs text-slate-500 italic">Conteúdo em breve...</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ScriptsResultView;
