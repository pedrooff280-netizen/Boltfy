
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
  },
  'Personal Trainer': {
    task: 'Digitalizar a ficha de treino do aluno e facilitar o controle de acesso e pagamentos, permitindo que o usuário acompanhe sua evolução de carga e medidas.',
    pain: 'Perda de fichas de papel, falta de orientação na execução dos exercícios e inadimplência escolar.',
    audience: 'Alunos de musculação que buscam autonomia e donos de academias que precisam profissionalizar o atendimento.',
    dailyUsers: 'Pacientes; Recepcionistas; Médicos.',
    pages: 'Login/Bioimpedância, Dashboard do Aluno, Grade de Treinos (A, B, C), Biblioteca de Exercícios em Vídeo, Calendário de Frequência, Loja de Suplementos, Área de Pagamento/Mensalidade.',
    features: 'Cronômetro de descanso integrado, sistema de \'Check-in\' por QR Code, ranking de frequência dos alunos e notificações de renovação de plano.',
    design: {
      primary: '#8A4DFF',
      secondary: '#64748B',
      bg: '#FFFFFF',
      text: '#0F172A',
      font: 'Plus Jakarta Sans'
    }
  },
  'Cafeteria': {
    task: 'Permitir que o cliente visualize o cardápio completo, faça pedidos personalizados (tipo de leite, extras) e acumule pontos em um programa de fidelidade.',
    pain: 'Filas longas, erros em pedidos anotados à mão e falta de um canal direto para promoções e fidelização.',
    audience: 'Amantes de café que buscam conveniência e donos de cafeterias que querem digitalizar o atendimento.',
    dailyUsers: 'Clientes; Baristas; Gerentes.',
    pages: 'Cardápio Digital (Bebidas, Doces, Salgados), Página de Personalização do Pedido, Carrinho, Checkout (Retirada/Delivery), Meus Pedidos, Perfil com Programa de Fidelidade.',
    features: 'Sistema de pontos por compra, cupons de desconto para aniversariantes, notificações de novas bebidas sazonais e integração com pagamento via Pix.',
    design: {
      primary: '#8A4DFF',
      secondary: '#64748B',
      bg: '#FFFFFF',
      text: '#0F172A',
      font: 'Plus Jakarta Sans'
    }
  },
  'Loja de Roupas': {
    task: 'Proporcionar uma experiência de compra visual e fluida, permitindo a seleção de variações (cor/tamanho) e finalização rápida com cálculo de frete.',
    pain: 'Baixa conversão por falta de detalhes, abandono de carrinho e dificuldade em gerenciar grades de produtos complexas.',
    audience: 'Consumidores de moda que buscam tendências e lojistas que precisam de uma vitrine profissional e automatizada.',
    dailyUsers: 'Compradores online; Gestores de Estoque.',
    pages: 'Vitrine de Lançamentos, Categorias (Masc/Fem/Acessórios), Página de Produto com Guia de Medidas, Provador Virtual Simples, Carrinho, Checkout, Área de Pedidos.',
    features: 'Cálculo de frete (Correios/Melhor Envio), sistema de cupons de desconto, integração com Instagram Shopping e lista de desejos (Wishlist).',
    design: {
      primary: '#8A4DFF',
      secondary: '#64748B',
      bg: '#FFFFFF',
      text: '#0F172A',
      font: 'Plus Jakarta Sans'
    }
  },
  'Hamburgueria Artesanal': {
    task: 'Oferecer um cardápio digital para montagem de hambúrgueres personalizados (tipo de pão, blend, queijo, extras) com pedidos para delivery ou retirada.',
    pain: 'Erros em pedidos complexos, demora no atendimento telefônico e falta de visibilidade dos ingredientes artesanais.',
    audience: 'Amantes de hambúrgueres gourmet e donos de hamburguerias que querem profissionalizar o delivery.',
    dailyUsers: 'Clientes; Cozinheiros; Entregadores.',
    pages: 'Cardápio com Combos, Montagem do Hambúrguer, Acompanhamentos e Bebidas, Carrinho, Checkout (Delivery/Retirada), Meus Pedidos, Programa de Fidelidade.',
    features: 'Sistema de avaliação de pedidos, rastreio de delivery em tempo real, promoções de combo e integração com iFood/Rappi.',
    design: {
      primary: '#D97706',
      secondary: '#78350F',
      bg: '#1C1917',
      text: '#FAFAF9',
      font: 'Plus Jakarta Sans'
    }
  },
  'Sushi & Japonesa': {
    task: 'Apresentar um cardápio visual de culinária japonesa com opções de rodízio, combos e pratos à la carte, facilitando pedidos online.',
    pain: 'Dificuldade em mostrar a variedade de peixes e combinações, pedidos confusos por telefone e falta de controle de reservas.',
    audience: 'Apreciadores de culinária japonesa e donos de restaurantes que buscam digitalizar o atendimento.',
    dailyUsers: 'Clientes; Sushiman; Gerentes.',
    pages: 'Cardápio (Sashimis, Temakis, Hot Rolls, Pratos Quentes), Combos, Carrinho, Checkout, Reserva de Mesa, Meus Pedidos.',
    features: 'Sistema de reserva de mesa online, opção de rodízio com tempo controlado, fotos de alta qualidade dos pratos e sugestões de harmonização com bebidas.',
    design: {
      primary: '#DC2626',
      secondary: '#1E3A5F',
      bg: '#0F172A',
      text: '#F8FAFC',
      font: 'Plus Jakarta Sans'
    }
  },
  'Açaiteria & Sorveteria': {
    task: 'Permitir a montagem personalizada de açaís e sorvetes (tamanho, frutas, caldas, granola) com visualização do preço em tempo real.',
    pain: 'Filas no balcão, dificuldade em precificar combinações personalizadas e falta de um programa de fidelidade digital.',
    audience: 'Jovens e famílias que buscam opções refrescantes e donos de açaiterias que querem agilizar o atendimento.',
    dailyUsers: 'Clientes; Atendentes; Proprietários.',
    pages: 'Monte seu Açaí/Sorvete, Tamanhos e Bases, Adicionais (Frutas, Caldas, Granola), Carrinho, Checkout, Meus Pedidos, Fidelidade.',
    features: 'Calculadora de preço dinâmica por adicional, programa de pontos, cupons de desconto e integração com delivery.',
    design: {
      primary: '#7C3AED',
      secondary: '#DB2777',
      bg: '#FAFAFA',
      text: '#18181B',
      font: 'Plus Jakarta Sans'
    }
  },
  'Confeitaria & Doces': {
    task: 'Exibir um catálogo de bolos, doces e sobremesas com opção de encomenda personalizada (sabor, tamanho, decoração) e agendamento de entrega.',
    pain: 'Dificuldade em gerenciar encomendas por WhatsApp, falta de portfólio visual e erros na comunicação de detalhes personalizados.',
    audience: 'Clientes que buscam doces para eventos e confeiteiros que precisam organizar sua produção.',
    dailyUsers: 'Clientes; Confeiteiros; Ajudantes.',
    pages: 'Catálogo (Bolos, Doces Finos, Tortas, Cupcakes), Página de Encomenda Personalizada, Carrinho, Checkout com Agendamento, Meus Pedidos, Galeria de Trabalhos.',
    features: 'Calendário de disponibilidade, upload de referência de decoração, sinal de pagamento antecipado e notificações de status da encomenda.',
    design: {
      primary: '#EC4899',
      secondary: '#A855F7',
      bg: '#FFF1F2',
      text: '#1F2937',
      font: 'Playfair Display'
    }
  },
  'Distribuidora de Bebidas': {
    task: 'Oferecer um catálogo completo de bebidas (cervejas, destilados, refrigerantes, água) com preços por atacado e varejo, e entrega rápida.',
    pain: 'Pedidos por telefone demorados, falta de controle de estoque visível para o cliente e dificuldade em gerenciar rotas de entrega.',
    audience: 'Bares, restaurantes e consumidores finais que buscam conveniência e preço.',
    dailyUsers: 'Clientes B2B; Clientes B2C; Motoristas.',
    pages: 'Catálogo por Categoria (Cervejas, Destilados, Sem Álcool), Ofertas do Dia, Carrinho, Checkout (Atacado/Varejo), Meus Pedidos, Rastreio de Entrega.',
    features: 'Preços diferenciados por quantidade, rastreio de entrega em tempo real, programa de recompensas para clientes frequentes e integração com estoque.',
    design: {
      primary: '#2563EB',
      secondary: '#F59E0B',
      bg: '#111827',
      text: '#F9FAFB',
      font: 'Plus Jakarta Sans'
    }
  },
  'Barbearia Premium': {
    task: 'Permitir que clientes escolham o serviço (corte, barba, combo), selecionem seu barbeiro preferido, visualizem a agenda com horários disponíveis e agendem com um clique. O sistema deve suportar pagamento online (cartão/Pix) como sinal para garantir a reserva, enviar lembretes automáticos via WhatsApp e permitir cancelamento ou reagendamento seguindo as regras da barbearia.',
    pain: 'Acabar com a confusão de agendamentos manuais, reduzir drasticamente o número de faltas (no-shows) com lembretes e pagamento de sinal, e organizar a agenda de múltiplos profissionais em um painel centralizado, fornecendo relatórios de faturamento, serviços mais populares e desempenho de cada barbeiro. O cliente pode favoritar serviços e ver seu histórico.',
    audience: 'Donos de barbearias e barbeiros autônomos que estão cansados de gerenciar agendamentos manualmente por WhatsApp e querem profissionalizar o atendimento, reduzir faltas e otimizar a agenda de múltiplos profissionais.',
    dailyUsers: 'Clientes para agendar e gerenciar seus horários; os barbeiros para consultar e gerenciar suas agendas pessoais, visualizar suas comissões e avaliações; o dono/gerente para ter uma visão geral de todos os agendamentos, gerenciar serviços, profissionais, horários de funcionamento, bloquear horários e analisar relatórios de desempenho da equipe.',
    pages: 'Agendamento (Serviços > Barbeiro > Horários), Meus Agendamentos (com opção de reagendar/cancelar), Perfil do Cliente (com histórico e serviços favoritos), Perfil do Barbeiro (com portfólio e avaliações), Painel do Barbeiro (agenda e ganhos), Painel do Gerente (visão geral, gestão de serviços, relatórios).',
    features: 'Design 100% Responsivo (com clicabilidade e fluxo simulado)'
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
      primaryColor, secondaryColor, bgColor, textColor,
      appAudienceDetail
    } = data;

    // Detectar se é um modelo pré-definido
    const isPizzaria = projectName?.toLowerCase().includes('pizzaria') || appDescription?.toLowerCase().includes('pizzaria');
    const isGym = projectName?.toLowerCase().includes('personal') || appDescription?.toLowerCase().includes('personal') || projectName?.toLowerCase().includes('academia');
    const isCafeteria = projectName?.toLowerCase().includes('cafeteria') || appDescription?.toLowerCase().includes('cafeteria') || projectName?.toLowerCase().includes('café');
    const isLojaRoupas = projectName?.toLowerCase().includes('loja de roupas') || appDescription?.toLowerCase().includes('roupas') || projectName?.toLowerCase().includes('moda');
    const isHamburgueria = projectName?.toLowerCase().includes('hamburgueria') || appDescription?.toLowerCase().includes('hambúrguer') || appDescription?.toLowerCase().includes('burger');
    const isSushi = projectName?.toLowerCase().includes('sushi') || appDescription?.toLowerCase().includes('japonesa') || appDescription?.toLowerCase().includes('sashimi');
    const isAcai = projectName?.toLowerCase().includes('açaí') || projectName?.toLowerCase().includes('acai') || appDescription?.toLowerCase().includes('sorveteria');
    const isConfeitaria = projectName?.toLowerCase().includes('confeitaria') || appDescription?.toLowerCase().includes('doces') || appDescription?.toLowerCase().includes('bolo');
    const isDistribuidora = projectName?.toLowerCase().includes('distribuidora') || appDescription?.toLowerCase().includes('bebidas') || appDescription?.toLowerCase().includes('cerveja');
    const isBarbearia = projectName?.toLowerCase().includes('barbearia') || appDescription?.toLowerCase().includes('barbearia') || appDescription?.toLowerCase().includes('corte');

    let modelData = null;
    if (isPizzaria) modelData = BOLTFY_MODELS_DB['Pizzaria Delivery'];
    else if (isGym) modelData = BOLTFY_MODELS_DB['Personal Trainer'];
    else if (isCafeteria) modelData = BOLTFY_MODELS_DB['Cafeteria'];
    else if (isLojaRoupas) modelData = BOLTFY_MODELS_DB['Loja de Roupas'];
    else if (isHamburgueria) modelData = BOLTFY_MODELS_DB['Hamburgueria Artesanal'];
    else if (isSushi) modelData = BOLTFY_MODELS_DB['Sushi & Japonesa'];
    else if (isAcai) modelData = BOLTFY_MODELS_DB['Açaiteria & Sorveteria'];
    else if (isConfeitaria) modelData = BOLTFY_MODELS_DB['Confeitaria & Doces'];
    else if (isDistribuidora) modelData = BOLTFY_MODELS_DB['Distribuidora de Bebidas'];
    else if (isBarbearia) modelData = BOLTFY_MODELS_DB['Barbearia Premium'];

    // Variáveis Finais (Prioriza Modelo -> Se não, usa Formulário)
    const finalTask = modelData?.task || appDescription || 'Oferecer uma experiência fluida e intuitiva para o usuário final.';
    const finalPain = modelData?.pain || data.appPain || 'Eliminar processos manuais e automatizar a rotina do usuário.';
    const finalAudience = modelData?.audience ||
      (data.selectedAudienceType && appAudienceDetail ? `${data.selectedAudienceType} (${appAudienceDetail})` : data.selectedAudienceType || 'Público Geral');
    const finalPages = modelData?.pages || (data.selectedPages?.length > 0 ? data.selectedPages.join(', ') : 'Landing Page, Dashboard, Perfil, Configurações');
    const fPrimary = modelData?.design.primary || primaryColor;
    const fSecondary = modelData?.design.secondary || secondaryColor;
    const fBg = modelData?.design.bg || bgColor;
    const fText = modelData?.design.text || textColor;
    const fFont = data.selectedFont || 'Plus Jakarta Sans'; // Use selected font or default to premium font

    // Construção do Prompt Estilo Boltfy Intelligence
    let prompt = `Boltfy Intelligence Prompts 🚀

Contexto: Crie o frontend completo para o aplicativo "${projectName}". A tarefa principal do aplicativo é: ${finalTask}. O foco é em interatividade total e design de ponta, resolvendo o seguinte problema principal para o usuário: ${finalPain}. IA de Destino: Este prompt foi otimizado para a plataforma ${selectedDevPlatform}.

1. Visão Geral e Conceito Central:

Nome do Projeto: ${projectName}

Função Principal (A Grande Tarefa): ${finalTask}

Problema Resolvido (O Maior Benefício/Alívio): ${finalPain}

2. Público-Alvo e Persona:

Usuário Principal (Para quem é o app): ${finalAudience}.`;

    if (modelData?.dailyUsers) {
      prompt += `\n\nQuem Vai Usar no Dia a Dia: ${modelData.dailyUsers}`;
    }

    prompt += `\n\n3. Estrutura e Fluxo Essencial (Com Clicabilidade Garantida):

Telas Principais (Menu): ${finalPages}. Cada item mencionado deve ser uma tela ou seção clicável no menu de navegação.

Autenticação: Se o app gerencia dados de usuários, inclua telas de Login e Cadastro clicáveis.`;

    if (modelData?.features) {
      prompt += `\n\nFuncionalidades Adicionais (Opcional): ${modelData.features}.`;
    }

    prompt += `\n\nFuncionalidades Complementares (Sugeridas): - Design 100% Responsivo (com clicabilidade e fluxo simulado).

4. Design e Experiência do Usuário (UI/UX):

Idioma: ${primaryLanguage}

Tipo de Fonte: ${fFont}

Animações: Transições de página suaves (fade-in/slide-in).

Responsividade: Design adaptativo para desktop, tablet e mobile.

Aesthetics: Force o uso de Glassmorphism, Soft Shadows, 8pt Grid System e Micro-interações.

Paleta de Cores (Instruções para a IA):

🎨 Cor Primária (Primary): ${fPrimary}. Use esta cor como a cor principal da marca. Ela deve ser aplicada nos botões de ação principal (CTAs), ícones importantes, links ativos e qualquer elemento que precise guiar o usuário para uma ação importante. É a cor mais proeminente e que define a identidade visual.

🎨 Cor Secundária (Secondary): ${fSecondary}. Use para destacar seções, fundos de cards ou elementos que precisam se diferenciar do fundo principal, mas sem competir com a cor primária. Ela deve complementar a cor primária.

🎨 Cor de Fundo (Background): ${fBg}. Cor de base para o fundo de toda a aplicação.

🎨 Cor do Texto (Foreground): ${fText}. Cor para todos os textos principais e ícones, garantindo um bom contraste com a Cor de Fundo.

🎨 Cores de Feedback Semânticas: Além das cores da marca, implemente um sistema de cores semânticas padrão:
- Sucesso: Verde vibrante para confirmações.
- Aviso: Amarelo/Laranja para alertas.
- Erro: Vermelho para ações destrutivas ou erros.
- Info: Azul para mensagens informativas.

Detalhes Adicionais de Design: Siga as melhores práticas de design moderno, com cantos arredondados, espaçamento consistente e sombras suaves para criar uma sensação de profundidade.

Instrução Final para a IA de Código: Gere o código completo (HTML, TailwindCSS, e React/Next.js) para este frontend. Todos os elementos interativos (botões, links, itens de menu) DEVEM ser clicáveis, simulando navegação ou mudança de estado. Não use placeholders como "página em construção". A experiência do usuário deve ser fluida e completamente interativa desde o início.`;

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
            {`> BOLTFY: INTELLIGENCE ENGINE`}
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
              <span className="text-[10px] font-mono text-wine-400/60 ml-2">boltfy_intelligence_prompt.md</span>
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
