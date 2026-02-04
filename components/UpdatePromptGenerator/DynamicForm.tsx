import React from 'react';

interface DynamicFormProps {
    cardType: string;
    formData: Record<string, string>;
    onChange: (field: string, value: string) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ cardType, formData, onChange }) => {

    const getFields = () => {
        switch (cardType) {
            case 'corrigir-bug':
                return [
                    { key: 'attempt', label: 'O que você estava tentando fazer?', placeholder: 'Ex: salvar meu nome na página de Configurações.' },
                    { key: 'error', label: 'O que aconteceu de errado?', placeholder: 'Ex: o botão Salvar não funcionou e meu nome antigo continuou lá.' },
                    { key: 'expected', label: 'O que deveria ter acontecido?', placeholder: 'Ex: ver uma mensagem de "Sucesso!" e meu novo nome salvo.' }
                ];
            case 'mudanca-visual':
                return [
                    { key: 'change', label: 'O que você quer mudar?', placeholder: 'Um resumo da sua solicitação... (Ex: aumentar o tamanho da fonte)' },
                    { key: 'location', label: 'Onde isso acontece no app? (Opcional)', placeholder: 'Ex: na tela de login, no menu lateral...' },
                    { key: 'example', label: 'Exemplo do que você quer como resultado final (Opcional)', placeholder: 'Descreva ou dê um exemplo visual do resultado esperado.' }
                ];
            case 'integrar-ferramenta':
                return [
                    { key: 'tool', label: 'Qual ferramenta vamos integrar?', placeholder: 'Ex: Stripe, Google Maps, Supabase, Firebase...' },
                    { key: 'purpose', label: 'Para que ela vai servir no app?', placeholder: 'Ex: Quero cobrar assinaturas mensais dos usuários no cartão de crédito.' },
                    { key: 'docs', label: 'Você tem chaves de API ou Documentação? (Opcional)', placeholder: 'Ex: Tenho a chave pública (Public Key) ou o link da doc...' }
                ];
            case 'adicionar-funcao':
                return [
                    { key: 'feature', label: 'Qual funcionalidade vamos adicionar?', placeholder: 'Ex: Sistema de chat, Upload de arquivos...' },
                    { key: 'description', label: 'Como ela deve funcionar?', placeholder: 'Descreva o fluxo: o usuário clica aqui, acontece isso...' },
                    { key: 'location', label: 'Onde ela vai ficar?', placeholder: 'Ex: No dashboard, numa nova página...' }
                ];
            case 'ajustar-funcao':
                return [
                    { key: 'feature', label: 'Qual funcionalidade você quer melhorar?', placeholder: 'Ex: Tela de Login, Dashboard, Menu Principal' },
                    { key: 'idea', label: 'Qual é a sua ideia de melhoria?', placeholder: 'Descreva sua ideia...' },
                    { key: 'benefit', label: 'Qual o principal benefício dessa mudança?', placeholder: 'Ex: tornar o uso mais fácil...' }
                ];
            case 'melhorar-ia':
                return [
                    { key: 'logic', label: 'Qual parte da lógica da IA precisa melhorar?', placeholder: 'Ex: As respostas estão muito curtas...' },
                    { key: 'expectation', label: 'Como você gostaria que ela agisse?', placeholder: 'Ex: Ela deveria dar exemplos práticos...' },
                    { key: 'context', label: 'Tem algum contexto específico?', placeholder: 'Ex: Quando o usuário pergunta sobre vendas...' }
                ];
            case 'refatorar-codigo':
                return [
                    { key: 'file', label: 'Qual arquivo ou componente?', placeholder: 'Ex: LibraryView.tsx, UserContext...' },
                    { key: 'goal', label: 'Qual o objetivo da refatoração?', placeholder: 'Ex: melhorar performance, limpar código...' },
                    { key: 'details', label: 'Detalhes técnicos', placeholder: 'Ex: usar useMemo, remover useEffect desnecessário...' }
                ];
            case 'otimizacao':
                return [
                    { key: 'area', label: 'O que precisa ser otimizado?', placeholder: 'Ex: Carregamento da página, velocidade da busca...' },
                    { key: 'problem', label: 'Onde está o gargalo?', placeholder: 'Ex: Demora muito para abrir a modal...' },
                    { key: 'goal', label: 'Meta de performance', placeholder: 'Ex: Carregar em menos de 1 segundo...' }
                ];
            case 'imagens':
                return [
                    { key: 'action', label: 'O que fazer com as imagens?', placeholder: 'Ex: Trocar logo, adicionar banner...' },
                    { key: 'location', label: 'Onde estão as imagens?', placeholder: 'Ex: Header, Footer, Hero...' },
                    { key: 'specs', label: 'Especificações (se houver)', placeholder: 'Ex: Tamanho, formato, proporção...' }
                ];
            case 'pwa':
                return [
                    { key: 'name', label: 'Nome do App', placeholder: 'Nome que vai aparecer no ícone...' },
                    { key: 'color', label: 'Cor tema', placeholder: 'Ex: #000000...' },
                    { key: 'icon', label: 'Ícone', placeholder: 'Já temos o ícone de 512x512?' }
                ];

            default:
                return [];
        }
    };

    const fields = getFields();

    if (fields.length === 0) return null;

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
            <h3 className="text-lg font-bold text-white mb-4">2. Detalhes da Atualização</h3>
            <p className="text-slate-400 text-sm mb-6">Forneça as informações específicas para a mudança.</p>

            <div className="space-y-4">
                {fields.map((field) => (
                    <div key={field.key} className="space-y-2">
                        <label className="text-sm font-bold text-slate-200">
                            {field.label}
                        </label>
                        <textarea
                            value={formData[field.key] || ''}
                            onChange={(e) => onChange(field.key, e.target.value)}
                            placeholder={field.placeholder}
                            rows={3}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-300 placeholder:text-slate-700 outline-none focus:border-wine-500 transition-colors resize-none"
                        />
                    </div>
                ))}
                {cardType === 'integrar-ferramenta' && (
                    <p className="text-[10px] text-slate-600 mt-2">
                        Nunca cole suas Chaves Secretas (Secret Keys) aqui. O prompt gerado irá te ensinar onde colocá-las com segurança.
                    </p>
                )}
            </div>
        </div>
    );
};

export default DynamicForm;
