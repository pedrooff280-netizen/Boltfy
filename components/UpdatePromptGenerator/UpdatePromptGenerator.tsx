import React, { useState } from 'react';
import {
    X, PlusCircle, Bug, Palette, Wrench, Link2, BrainCircuit,
    Code2, Zap, Image as ImageIcon, Download,
    Wand2
} from 'lucide-react';
import PromptOptionCard from './PromptOptionCard';
import DynamicForm from './DynamicForm';
import PromptOutput from './PromptOutput';

interface UpdatePromptGeneratorProps {
    isOpen: boolean;
    onClose: () => void;
    projectName?: string;
}

const UpdatePromptGenerator: React.FC<UpdatePromptGeneratorProps> = ({ isOpen, onClose, projectName }) => {
    const [step, setStep] = useState<'selection' | 'form' | 'output'>('selection');
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [generatedPrompt, setGeneratedPrompt] = useState('');

    if (!isOpen) return null;

    const handleCardSelect = (id: string) => {
        if (selectedCard === id) {
            // Deselect if already selected? Or just ignore. Let's allow deselecting or just keep it active.
            // Actually behavior: select puts it in "active" state visually.
            setSelectedCard(id);
        } else {
            setSelectedCard(id);
        }
    };

    const generatePrompt = () => {
        if (!selectedCard) return;

        let prompt = `## ATUALIZAÇÃO SOLICITADA: ${selectedCard.toUpperCase().replace('-', ' ')}\n`;
        prompt += `**Projeto Alvo:** ${projectName || 'Não especificado'}\n\n`;

        prompt += `### Contexto\n`;

        // Add specific fields based on card type
        Object.entries(formData).forEach(([key, value]) => {
            if ((value as string).trim()) {
                prompt += `**${key.charAt(0).toUpperCase() + key.slice(1)}:**\n${value}\n\n`;
            }
        });

        prompt += `### Instrução para a IA\n`;
        prompt += `Por favor, implemente as alterações solicitadas acima seguindo as boas práticas do projeto.\n`;
        prompt += `Mantenha o estilo visual consistente (Dark Mode, Wine/Purple Accents).\n`;
        prompt += `Se for necessário criar novos arquivos, liste-os claramente.\n`;

        setGeneratedPrompt(prompt);
        setStep('output');
    };

    const handleBack = () => {
        setStep('selection');
        // Or 'form' if we want to go back to form step? 
        // The design implies selection and form are kind of on the same screen until generation?
        // "2. Detalhes da Atualização" appears below.
        // So 'output' is the only separate screen or overlay.
        // Let's assume Selection + Form are visible together, Output replaces them.
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="w-full max-w-5xl bg-[#0B0E14] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-slate-800 bg-[#0B0E14] z-10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-wine-500/10 rounded-lg">
                            <Wand2 className="w-5 h-5 text-wine-500" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Gerador de Prompt de Atualização</h2>
                            {projectName && <p className="text-xs text-slate-500">Editando: {projectName}</p>}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">

                    {step === 'output' ? (
                        <PromptOutput prompt={generatedPrompt} onBack={handleBack} />
                    ) : (
                        <div className="space-y-10">

                            {/* Section 1: Build */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">O que vamos construir ou arrumar?</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <PromptOptionCard
                                        icon={PlusCircle}
                                        title="Adicionar Função"
                                        isActive={selectedCard === 'adicionar-funcao'}
                                        onClick={() => handleCardSelect('adicionar-funcao')}
                                    />
                                    <PromptOptionCard
                                        icon={Bug}
                                        title="Corrigir Bug"
                                        isActive={selectedCard === 'corrigir-bug'}
                                        onClick={() => handleCardSelect('corrigir-bug')}
                                    />
                                    <PromptOptionCard
                                        icon={Palette}
                                        title="Mudança Visual / UI"
                                        isActive={selectedCard === 'mudanca-visual'}
                                        onClick={() => handleCardSelect('mudanca-visual')}
                                    />
                                </div>
                            </div>

                            {/* Section 2: Technical */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Ajustes Técnicos e Integrações</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <PromptOptionCard
                                        icon={Wrench}
                                        title="Ajustar Função"
                                        isActive={selectedCard === 'ajustar-funcao'}
                                        onClick={() => handleCardSelect('ajustar-funcao')}
                                    />
                                    <PromptOptionCard
                                        icon={Link2}
                                        title="Integrar Ferramenta"
                                        isActive={selectedCard === 'integrar-ferramenta'}
                                        onClick={() => handleCardSelect('integrar-ferramenta')}
                                    />
                                    <PromptOptionCard
                                        icon={BrainCircuit}
                                        title="Melhorar IA / Lógica"
                                        isActive={selectedCard === 'melhorar-ia'}
                                        onClick={() => handleCardSelect('melhorar-ia')}
                                    />
                                    <PromptOptionCard
                                        icon={Code2}
                                        title="Refatorar Código"
                                        isActive={selectedCard === 'refatorar-codigo'}
                                        onClick={() => handleCardSelect('refatorar-codigo')}
                                        className="md:col-span-1"
                                    />
                                </div>
                            </div>

                            {/* Section 3: Finalization */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Finalização</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <PromptOptionCard
                                        icon={Zap}
                                        title="Otimização"
                                        isActive={selectedCard === 'otimizacao'}
                                        onClick={() => handleCardSelect('otimizacao')}
                                    />
                                    <PromptOptionCard
                                        icon={ImageIcon}
                                        title="Adicionar/Alterar Imagens"
                                        isActive={selectedCard === 'imagens'}
                                        onClick={() => handleCardSelect('imagens')}
                                    />
                                    <PromptOptionCard
                                        icon={Download}
                                        title="Tornar App Baixável (PWA)"
                                        isActive={selectedCard === 'pwa'}
                                        onClick={() => handleCardSelect('pwa')}
                                    />
                                </div>
                            </div>

                            {/* Dynamic Form Area */}
                            {selectedCard && (
                                <div className="pt-8 border-t border-slate-900">
                                    <DynamicForm
                                        cardType={selectedCard}
                                        formData={formData}
                                        onChange={(key, value) => setFormData(prev => ({ ...prev, [key]: value }))}
                                    />
                                </div>
                            )}

                        </div>
                    )}
                </div>

                {/* Footer actions */}
                {step !== 'output' && (
                    <div className="p-6 border-t border-slate-800 bg-[#0B0E14] flex justify-end">
                        <button
                            disabled={!selectedCard}
                            onClick={generatePrompt}
                            className={`
                    px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all
                    flex items-center gap-2
                    ${selectedCard
                                    ? 'bg-gradient-to-r from-wine-600 to-indigo-600 hover:from-wine-500 hover:to-indigo-500 hover:scale-[1.02] shadow-wine-900/20 cursor-pointer'
                                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                }
                `}
                        >
                            <Wand2 className="w-5 h-5" />
                            Gerar Prompt de Atualização
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default UpdatePromptGenerator;
