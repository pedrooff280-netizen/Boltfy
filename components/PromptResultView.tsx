
import React, { useState, useEffect } from 'react';
import {
  Copy,
  Terminal,
  Rocket,
  Layout,
  MousePointer2,
  Sparkles,
  Check,
  Save,
  Loader2
} from 'lucide-react';
import { supabase } from '../src/lib/supabase';

interface PromptResultViewProps {
  data: any;
  onReset: () => void;
  onGoHome: () => void;
}

// Banco de Dados Master do Boltfy
const BOLTFY_MODELS_DB: Record<string, any> = {
  'Pizzaria Delivery': {
    task: 'Oferecer um cardápio digital completo onde o cliente pode montar pizzas (tamanhos, múltiplos sabores incluindo meio a meio, borda recheada, adicionais e observações), além de pedir bebidas, sobremesas e combos. O sistema deve permitir pagamento online (Cartão de Crédito, Pix), ou na entrega (dinheiro com troco, maquininha), rastreio do pedido em tempo real e ter um programa de fidelidade.',
    pain: 'Aumentar a margem de lucro em cada pedido ao eliminar taxas de apps de terceiros, fidelizar clientes com um programa de pontos próprio e ter controle total sobre a experiência do cliente, desde o pedido até a entrega. Inclui um painel de administrador para gerenciar o cardápio, pedidos e ver relatórios de produtos mais vendidos.',
    audience: 'Donos de pizzarias que desejam automatizar o recebimento de pedidos e construir um canal de vendas direto. Clientes finais que buscam facilidade e a equipe da cozinha para gestão interna.',
    pages: 'Cardápio com categorias, Tela de Montagem da Pizza (Meio a Meio), Carrinho de Compras, Checkout (Endereço e Pagamento), Meus Pedidos (Status em Tempo Real), Perfil (Programa de Fidelidade/Pontos) e Painel do Administrador (Gestão de Pedidos e Relatórios).',
    design: {
      primary: '#8000FF',
      secondary: '#1F1F1F',
      bg: '#171717',
      text: '#FFFFFF',
      font: 'Roboto'
    }
  }
};

const PromptResultView: React.FC<PromptResultViewProps> = ({ data, onReset, onGoHome }) => {
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  useEffect(() => {
    if (!data) return;

    const {
      projectName, appDescription, primaryLanguage, selectedDevPlatform,
      primaryColor, secondaryColor, bgColor, textColor, selectedFont,
      category, appAudienceDetail
    } = data;

    // Detectar se é um modelo pré-definido
    const isPizzaria = projectName?.toLowerCase().includes('pizzaria') || appDescription?.toLowerCase().includes('pizzaria');
    const modelData = isPizzaria ? BOLTFY_MODELS_DB['Pizzaria Delivery'] : null;

    // Variáveis Finais (Prioriza Modelo -> Se não, usa Formulário)
    const finalTask = modelData?.task || appDescription || 'Create a high-fidelity application.';
    const finalPain = modelData?.pain || data.appPain || 'Optimize business processes.';
    const finalAudience = modelData?.audience ||
      (data.selectedAudienceType && appAudienceDetail ? `${data.selectedAudienceType} (${appAudienceDetail})` : data.selectedAudienceType || 'General Public');
    const finalPages = modelData?.pages || (data.selectedPages?.length > 0 ? data.selectedPages.join(', ') : 'Landing Page, Dashboard, Settings');
    const fPrimary = modelData?.design.primary || primaryColor;
    const fSecondary = modelData?.design.secondary || secondaryColor;
    const fBg = modelData?.design.bg || bgColor;
    const fText = modelData?.design.text || textColor;
    const fFont = modelData?.design.font || (selectedFont === 'Outra...' ? 'Inter' : selectedFont);
    const fCategory = category || 'SaaS / Web App';

    // Dicionário de Tradução Boltfy
    const translations: Record<string, any> = {
      'English': {
        header: 'Boltfy 1.0 AI Master Prompt 🚀',
        context: 'Context: Create the complete frontend for the application',
        overview: '1. Overview & Strategy',
        category: 'Category:',
        task: 'Main Task:',
        pain: 'Problem Solved:',
        audience: 'Target Audience:',
        stories: '2. User Stories & Requirements',
        storyItems: [
          `As a user, I want a modern and intuitive interface for ${projectName}.`,
          `As a user, I want to easily navigate between ${finalPages}.`,
          `As an admin, I want the system to solve the problem of ${finalPain}.`
        ],
        design: '3. Design Guidelines (High Fidelity)',
        aesthetics: 'Aesthetics: Modern SaaS, glassmorphism effects, 20px rounded corners, smooth shadows, and high accessibility.',
        arch: '4. Architecture and Flow (Clickability Guaranteed)',
        pages: 'Main Screens (Menu):',
        interactivity: 'Interactivity: Every mentioned element must be a clickable section or screen with state transitions.',
        impl: '5. Final Implementation Instruction',
        platform: 'Target Platform:',
        tech: 'Tech Stack: React, TailwindCSS, Lucide Icons.',
        colors: {
          primary: 'Primary Color',
          secondary: 'Secondary Color',
          bg: 'Background Color',
          text: 'Text Color'
        },
        footer: 'Generate the complete code. All interactive elements (buttons, links, menu items) MUST be clickable, simulating real navigation or state changes. The user experience must be fluid, premium, and completely interactive.'
      },
      'Español': {
        header: 'Boltfy 1.0 IA Maestro de Prompts 🚀',
        context: 'Contexto: Crea el frontend completo para la aplicación',
        overview: '1. Visión General y Estrategia',
        category: 'Categoría:',
        task: 'Tarea Principal:',
        pain: 'Problema Resuelto:',
        audience: 'Público Objetivo:',
        stories: '2. Historias de Usuario y Requisitos',
        storyItems: [
          `Como usuario, quiero una interfaz moderna e intuitiva para ${projectName}.`,
          `Como usuario, quiero navegar fácilmente entre ${finalPages}.`,
          `Como administrador, quiero que el sistema resuelva el problema de ${finalPain}.`
        ],
        design: '3. Directrices de Diseño (Alta Fidelidad)',
        aesthetics: 'Estética: SaaS moderno, efectos de glassmorphism, esquinas redondeadas de 20px, sombras suaves y alta accesibilidad.',
        arch: '4. Arquitectura y Flujo (Clicabilidad Garantizada)',
        pages: 'Pantallas Principales (Menú):',
        interactivity: 'Interactividad: Cada elemento mencionado debe ser una sección o pantalla clicable con transiciones de estado.',
        impl: '5. Instrucción Final de Implementación',
        platform: 'Plataforma de Destino:',
        tech: 'Tech Stack: React, TailwindCSS, Lucide Icons.',
        colors: {
          primary: 'Color Primario',
          secondary: 'Color Secundario',
          bg: 'Color de Fondo',
          text: 'Color de Texto'
        },
        footer: 'Genera el código completo. Todos los elementos interactivos (botones, enlaces, elementos de menú) DEBEN ser clicables, simulando una navegación real o cambios de estado. La experiencia del usuario debe ser fluida, premium y completamente interactiva.'
      },
      'Português (Brasil)': {
        header: 'Boltfy 1.0 IA Master de Prompts 🚀',
        context: 'Contexto: Crie o frontend completo para o aplicativo',
        overview: '1. Visão Geral e Estratégia',
        category: 'Categoria:',
        task: 'Tarefa Principal:',
        pain: 'Problema Resolvido:',
        audience: 'Público-Alvo:',
        stories: '2. Histórias de Usuário e Requisitos',
        storyItems: [
          `Como usuário, quero uma interface moderna e intuitiva para ${projectName}.`,
          `Como usuário, quero navegar facilmente entre as telas de ${finalPages}.`,
          `Como administrador, quero que o sistema resolva a dor de ${finalPain}.`
        ],
        design: '3. Diretrizes de Design (Alta Fidelidade)',
        aesthetics: 'Estética: SaaS moderno, efeitos de glassmorphism, cantos arredondados (20px), sombras suaves e foco em usabilidade.',
        arch: '4. Estrutura e Fluxo Essencial (Com Clicabilidade Garantida)',
        pages: 'Telas Principais (Menu):',
        interactivity: 'Interatividade: Cada item mencionado deve ser uma seção ou tela clicável com transições de estado.',
        impl: '5. Instrução Final para a IA de Código',
        platform: 'Plataforma de Destino:',
        tech: 'Tech Stack: React, TailwindCSS, Lucide Icons.',
        colors: {
          primary: 'Cor Primária',
          secondary: 'Cor Secundária',
          bg: 'Cor de Fundo',
          text: 'Cor do Texto'
        },
        footer: 'Gere o código completo. Todos os elementos interativos (botões, links, itens de menu) DEVEM ser clicáveis, simulando navegação ou mudança de estado. A experiência do usuário deve ser fluida, prêmium e completamente interativa.'
      }
    };

    const t = translations[primaryLanguage] || translations['Português (Brasil)'];

    // Construção do Prompt Mestre
    const prompt = `## ${t.header}

**${t.context} "${projectName}"**

### ${t.overview}
*   **${t.category}** ${fCategory}
*   **${t.task}** ${finalTask}
*   **${t.pain}** ${finalPain}
*   **${t.audience}** ${finalAudience}

### ${t.stories}
${t.storyItems.map((item: string) => `*   ${item}`).join('\n')}

### ${t.design}
*   **🎨 ${t.colors.primary}:** \`${fPrimary}\`
*   **🎨 ${t.colors.secondary}:** \`${fSecondary}\`
*   **🎨 ${t.colors.bg}:** \`${fBg}\`
*   **🎨 ${t.colors.text}:** \`${fText}\`
*   **Tipo de Fonte:** \`${fFont}\`
*   **${t.aesthetics}**

### ${t.arch}
*   **${t.pages}** ${finalPages}.
*   **${t.interactivity}**

### ${t.impl}
*   **${t.platform}** ${selectedDevPlatform}
*   **${t.tech}**
*   **Regra de Ouro:** ${t.footer}`;

    setGeneratedPrompt(prompt);
  }, [data]);

  const handleSave = async () => {
    if (!data) return;
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Você precisa estar logado para salvar projetos.');
        setIsSaving(false);
        return;
      }

      const { error } = await supabase
        .from('projects')
        .insert([
          {
            user_id: user.id,
            name: data.projectName,
            segment: data.category || 'MVP',
            project_type: 'mvp',
            project_data: data
          }
        ]);

      if (error) throw error;

      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Erro ao salvar projeto:', error);
      setSaveStatus('error');
      alert('Erro ao salvar projeto na biblioteca.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPlatformUrl = (platform: string) => {
    const urls: Record<string, string> = {
      'IA Creator': 'https://lovable.dev',
      'Lovable': 'https://lovable.dev',
      'v0.dev': 'https://v0.dev',
      'Bolt': 'https://bolt.new'
    };
    return urls[platform] || 'https://lovable.dev';
  };

  return (
    <div className="min-h-screen pb-24 animate-in fade-in duration-700 font-sans">
      <div className="w-full bg-slate-950/80 border-b border-slate-800/30 py-4 px-8 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-wine-600/20 flex items-center justify-center border border-wine-500/20">
            <Terminal className="w-4 h-4 text-wine-400" />
          </div>
          <span className="text-[10px] font-black text-wine-500 tracking-[0.3em] uppercase">
            {`> BOLTFY 1.0: ESTRATÉGIA MASTER`}
          </span>
        </div>
        <div className="px-3 py-1 bg-slate-800/20 rounded-full border border-wine-500/20">
          <span className="text-[9px] font-bold text-wine-300 uppercase tracking-widest">IA: {data?.selectedDevPlatform}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { step: 1, title: 'DNA do Prompt', desc: 'Sua ideia foi transformada em estratégia técnica mestre.', icon: Rocket },
            { step: 2, title: 'Injetar Variáveis', desc: 'Identidade visual e fluxos aplicados dinamicamente.', icon: Sparkles },
            { step: 3, title: 'Construir', desc: 'Cole o prompt mestre na IA de destino.', icon: MousePointer2 }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-950/50 border border-slate-800/30 rounded-[24px] p-6 flex items-start gap-5">
              <div className="w-10 h-10 rounded-xl bg-slate-900/40 flex items-center justify-center text-wine-400 font-bold border border-wine-500/20">{item.step}</div>
              <div>
                <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-slate-400/60 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative bg-black/80 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">
          <div className="bg-slate-950 border-b border-white/5 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
              <span className="text-[10px] font-mono text-wine-400/60 ml-2">boltfy_v1_prompt.md</span>
            </div>
            <button onClick={handleCopy} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-bold text-wine-400 transition-colors">
              {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copiado' : 'Copiar'}
            </button>
          </div>
          <div className="p-8 font-mono text-[13px] leading-relaxed text-slate-300 overflow-y-auto max-h-[500px] no-scrollbar">
            <pre className="whitespace-pre-wrap">{generatedPrompt}</pre>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4 mt-12">
          <button onClick={handleCopy} className="px-10 py-5 bg-transparent border border-white/10 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold text-white hover:bg-white/5 transition-all">
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Conteúdo Copiado!' : 'Copiar Prompt Master'}
          </button>
          <button onClick={() => window.open(getPlatformUrl(data?.selectedDevPlatform), '_blank')} className="px-10 py-5 bg-gradient-to-r from-wine-600 to-rose-600 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold text-white hover:shadow-2xl transition-all">
            <Sparkles className="w-5 h-5" /> Abrir {data?.selectedDevPlatform}
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-10 py-5 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold transition-all border ${saveStatus === 'success'
              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500'
              : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
              }`}
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : saveStatus === 'success' ? (
              <Check className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saveStatus === 'success' ? 'Projeto Salvo!' : 'Salvar na Biblioteca'}
          </button>
        </div>

        <div className="mt-20 pt-10 border-t border-white/5 flex justify-center gap-10">
          <button onClick={onReset} className="text-xs font-bold text-wine-400/60 hover:text-white flex items-center gap-2"><Rocket className="w-4 h-4" /> Novo Aplicativo</button>
          <button onClick={onGoHome} className="text-xs font-bold text-wine-400/60 hover:text-white flex items-center gap-2"><Layout className="w-4 h-4" /> Dashboard</button>
        </div>
      </div>
    </div>
  );
};

export default PromptResultView;
