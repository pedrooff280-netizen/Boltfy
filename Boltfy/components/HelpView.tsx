import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageSquare, Send, HelpCircle, ExternalLink } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "O que é o Boltfy?",
        answer: "A Boltfy é uma plataforma avançada de engenharia de software e vendas turbinada por IA, projetada para ajudar empreendedores a materializarem suas ideias de SaaS e otimizarem suas estratégias de conversão com velocidade e escala."
    },
    {
        question: "Como funciona o 'Materializar SaaS'?",
        answer: "É o nosso motor principal. Você descreve sua ideia em linguagem natural e nossa IA gera um prompt mestre estruturado e detalhado, pronto para ser usado em ferramentas de desenvolvimento (como Lovable ou Replit) para construir seu app completo."
    },
    {
        question: "Qual a diferença entre 'Começar com um Modelo' e 'Criar do Zero'?",
        answer: "'Começar com um Modelo' oferece estruturas pré-testadas para nichos específicos (ex: CRM, Dashboard de Vendas), enquanto 'Criar do Zero' dá liberdade total para descrever qualquer funcionalidade customizada que você desejar."
    },
    {
        question: "O que eu faço com o 'prompt mestre' depois de gerado?",
        answer: "O prompt mestre é a 'planta' do seu app. Você deve copiá-lo e colá-lo em uma ferramenta de codificação por IA. Ele contém todas as instruções de UI/UX, banco de dados e lógica que o desenvolvedor IA precisa."
    },
    {
        question: "Preciso ter conhecimento técnico para usar o Boltfy?",
        answer: "Não! Nossa interface foi feita para que qualquer pessoa consiga estruturar ideias complexas. A IA cuida da parte técnica e da estruturação dos prompts, exigindo apenas clareza no que você quer construir."
    },
    {
        question: "Posso usar um modelo e depois personalizar?",
        answer: "Com certeza. Nossos modelos são apenas o ponto de partida. Após selecionar um, você pode adicionar camadas de personalização ou pedir para a IA modificar partes específicas da lógica ou do design."
    }
];

const HelpView: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-wine-500/20 flex items-center justify-center border border-wine-500/30">
                        <HelpCircle className="w-6 h-6 text-wine-400" />
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tight">Ajuda & Suporte</h1>
                </div>
                <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-2xl">
                    Encontre respostas para as perguntas mais comuns. Se não encontrar o que procura, entre em contato conosco através dos nossos canais oficiais.
                </p>
            </div>

            {/* FAQ Section */}
            <section className="space-y-6">
                <h2 className="text-[10px] font-black text-wine-300 uppercase tracking-[0.25em] mb-4 opacity-70">
                    Perguntas Frequentes
                </h2>

                <div className="space-y-3">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`group bg-slate-950/60 backdrop-blur-xl border transition-all duration-300 rounded-2xl overflow-hidden ${openIndex === index ? 'border-wine-500/50 shadow-[0_0_20px_rgba(136,19,55,0.1)]' : 'border-slate-800/30 hover:border-wine-700/50'
                                }`}
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left"
                            >
                                <span className={`text-sm font-bold transition-colors ${openIndex === index ? 'text-wine-400' : 'text-slate-300 group-hover:text-white'}`}>
                                    {faq.question}
                                </span>
                                {openIndex === index ? (
                                    <div className="w-5 h-5 flex items-center justify-center"><ChevronUp className="w-5 h-5 text-wine-500" /></div>
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-slate-600 group-hover:text-slate-400" />
                                )}
                            </button>

                            {openIndex === index && (
                                <div className="px-6 pb-6 pt-1 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="h-px bg-slate-800/20 mb-4" />
                                    <p className="text-slate-400 text-sm leading-relaxed font-medium">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer Support */}
            <div className="mt-16 pt-10 border-t border-slate-800/20 text-center">
                <p className="text-slate-500 text-sm font-bold mb-6 italic">Ainda tem dúvidas?</p>

                <button
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-wine-600 to-rose-500 hover:from-wine-500 hover:to-rose-400 text-white font-black text-sm uppercase tracking-widest rounded-full transition-all shadow-[0_10px_30px_rgba(136,19,55,0.3)] hover:scale-105 active:scale-95 group"
                >
                    Falar com Suporte
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
            </div>

        </div>
    );
};

export default HelpView;
