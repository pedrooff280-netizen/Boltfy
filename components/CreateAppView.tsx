import React, { useState } from 'react';
import {
  FileText,
  PlusCircle,
  ArrowLeft,
  Menu,
  ChevronRight,
  Layout,
  Lightbulb,
  Check,
  Home,
  Utensils,
  Flower2,
  Dumbbell,
  Store,
  HeartPulse,
  Briefcase,
  Palette,
  ShoppingBag,
  Calendar,
  Stethoscope,
  Scale,
  Zap,
  Scissors,
  Box,
  Globe,
  Smartphone,
  Type,
  Code2,
  X,
  Sun,
  Moon,
  Search,
  ClipboardList,
  History,
  RotateCcw,
  Cloud,
  Code,
  ChevronDown,
  User,
  Timer,
  Flame,
  IceCream,
  Star,
  MapPin,
  Map
} from 'lucide-react';

interface CreateAppViewProps {
  onBack: () => void;
  onFinish: (data: any) => void;
}

type CategoryType = 'Gestão' | 'Marketing' | 'Landing Page' | 'Dashboard';
type AudienceType = 'Eu (Admin) e Clientes' | 'Apenas Funcionários' | 'Público Geral';

const CreateAppView: React.FC<CreateAppViewProps> = ({ onBack, onFinish }) => {
  const [step, setStep] = useState<'selection' | 'from-zero' | 'templates' | 'customize-template'>('selection');
  const [activeTemplateCategory, setActiveTemplateCategory] = useState('Todos');
  const [selectedTemplateId, setSelectedTemplateId] = useState('');

  // States do Formulário
  const [projectName, setProjectName] = useState('');
  const [appDescription, setAppDescription] = useState('');
  const [category, setCategory] = useState<CategoryType | ''>('');
  const [appPain, setAppPain] = useState('');
  const [appAudienceDetail, setAppAudienceDetail] = useState('');
  const [selectedAudienceType, setSelectedAudienceType] = useState<AudienceType | ''>('');
  const [selectedPages, setSelectedPages] = useState<string[]>([]);

  // Identidade Visual States (Customization Screen)
  const [theme, setTheme] = useState<'claro' | 'escuro'>('claro');
  const [primaryColor, setPrimaryColor] = useState('#8A4DFF');
  const [secondaryColor, setSecondaryColor] = useState('#64748B');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [textColor, setTextColor] = useState('#0F172A');
  const [selectedFont, setSelectedFont] = useState<string>('Plus Jakarta Sans');

  const [selectedDevPlatform, setSelectedDevPlatform] = useState('Lovable');
  const [selectedLanguage, setSelectedLanguage] = useState('Português (BR)');

  const fontOptions = [
    'Plus Jakarta Sans', 'Inter', 'Roboto', 'Poppins', 'Montserrat',
    'Open Sans', 'Lato', 'Playfair Display', 'Merriweather', 'Oswald', 'Raleway'
  ];

  const languageOptions = ['Português (BR)', 'Inglês (EN)', 'Espanhol (ES)', 'Outro'];

  const aiOptions = [
    'Lovable', 'Firebase Studio', 'Bolt', 'Replit', 'Lazy',
    'Antigravity', 'v0.dev', 'Google AI Studio', 'Base44', 'Mocha', 'Genspark'
  ];

  const devPlatforms = ['IA Creator', 'Lovable', 'Bolt', 'v0.dev', 'Replit', 'Firebase'];
  const languages = ['English', 'Español', 'Português (Brasil)', 'Português (Portugal)', 'Outros'];
  const pagesList = ["Login / Cadastro", "Dashboard", "Perfil", "Configurações", "Feed", "Busca", "Detalhes", "Carrinho", "Checkout", "Pedidos", "Chat", "Favoritos", "Agenda", "Mapa", "Carteira", "Admin", "Relatórios", "Suporte", "Onboarding", "Galeria"];
  const categories: CategoryType[] = ['Gestão', 'Marketing', 'Landing Page', 'Dashboard'];
  const painTags = ['Automação', 'Vendas', 'Organização', 'Fidelização'];
  const audienceTypes: AudienceType[] = ['Eu (Admin) e Clientes', 'Apenas Funcionários', 'Público Geral'];

  const packages = [
    { id: 'ecommerce', label: 'Pacote E-commerce', icon: ShoppingBag, pages: ["Carrinho", "Checkout", "Pedidos", "Busca", "Detalhes"], color: 'text-orange-500' },
    { id: 'agendamento', label: 'Pacote Agendamento', icon: Calendar, pages: ["Agenda", "Perfil", "Configurações"], color: 'text-orange-500' },
    { id: 'institucional', label: 'Pacote Institucional', icon: Layout, pages: ["Onboarding", "Detalhes", "Suporte", "Galeria"], color: 'text-orange-500' },
  ];

  const templateCategories = [
    { id: 'Todos', label: 'Todos', icon: Home },
    { id: 'Alimentação', label: 'Alimentação', icon: Utensils },
    { id: 'Beleza', label: 'Beleza', icon: Flower2 },
    { id: 'Fitness', label: 'Fitness', icon: Dumbbell },
    { id: 'Saúde', label: 'Saúde', icon: HeartPulse },
    { id: 'Serviços', label: 'Serviços', icon: Briefcase },
    { id: 'Varejo', label: 'Varejo', icon: Store },
  ];

  const templates = [
    { id: 'estudio-tatuagem', title: 'Estúdio de Tatuagem', description: 'Tatuadores autônomos e gestão de orçamentos.', category: 'Beleza', image: 'https://images.unsplash.com/photo-1562967914-6c1748332142?q=80&w=2070&auto=format&fit=crop' },
    { id: 'personal-trainer', title: 'Personal Trainer', description: 'Gestão de treinos e progresso de alunos.', category: 'Fitness', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop' },
    { id: 'cafeteria', title: 'Cafeteria', description: 'Pedidos online e programa de fidelização.', category: 'Alimentação', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1974&auto=format&fit=crop' },
    { id: 'loja-roupas', title: 'Loja de Roupas', description: 'Catálogo interativo e venda online.', category: 'Varejo', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop' },
    { id: 'clinica-medica', title: 'Clínica Médica', description: 'Agendamento de consultas e prontuário digital.', category: 'Saúde', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop' },
    { id: 'escritorio-advocacia', title: 'Escritório Jurídico', description: 'Gestão de processos e atendimento ao cliente.', category: 'Serviços', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop' },
    { id: 'barbearia', title: 'Barbearia Premium', description: 'Reserva de horários e venda de produtos.', category: 'Beleza', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop' },
    { id: 'pizzaria-delivery', title: 'Pizzaria Delivery', description: 'Menu digital com sistema de pedidos direto.', category: 'Alimentação', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop' },
    { id: 'app-dieta', title: 'Health & Nutri', description: 'Acompanhamento nutricional e planos de dieta.', category: 'Saúde', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop' },
    { id: 'consultoria-marketing', title: 'Agência Digital', description: 'Dashboard de métricas e CRM de leads.', category: 'Serviços', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop' },
    { id: 'hamburgueria-artesanal', title: 'Hamburgueria Artesanal', description: 'Montagem de hambúrgueres e delivery.', category: 'Alimentação', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1998&auto=format&fit=crop' },
    { id: 'sushi-japonesa', title: 'Sushi & Japonesa', description: 'Cardápio visual e reserva de mesa.', category: 'Alimentação', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop' },
    { id: 'acaiteria-sorveteria', title: 'Açaiteria & Sorveteria', description: 'Monte seu açaí com preço dinâmico.', category: 'Alimentação', image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?q=80&w=1972&auto=format&fit=crop' },
    { id: 'confeitaria-doces', title: 'Confeitaria & Doces', description: 'Encomendas personalizadas e agendamento.', category: 'Alimentação', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1989&auto=format&fit=crop' },
    { id: 'distribuidora-bebidas', title: 'Distribuidora de Bebidas', description: 'Catálogo atacado/varejo e delivery.', category: 'Alimentação', image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=2070&auto=format&fit=crop' }
  ];

  const togglePage = (page: string) => {
    setSelectedPages(prev => prev.includes(page) ? prev.filter(p => p !== page) : [...prev, page]);
  };

  const selectPackage = (pkgPages: string[]) => {
    setSelectedPages(prev => {
      const newPages = [...new Set([...prev, ...pkgPages])];
      return newPages;
    });
  };

  const handleFinish = () => {
    onFinish({
      projectName: projectName || "Meu Novo Aplicativo",
      appDescription,
      category,
      appPain,
      appAudienceDetail,
      selectedAudienceType,
      selectedPages,
      primaryColor,
      secondaryColor,
      bgColor,
      textColor,
      selectedFont,
      selectedDevPlatform,
      primaryLanguage: selectedLanguage
    });
  };

  const handleSelectTemplate = (template: any) => {
    setProjectName(template.title);
    setAppDescription(template.description);
    setCategory('Marketing');
    setSelectedTemplateId(template.id);

    // Apply model-specific colors based on template ID
    switch (template.id) {
      case 'personal-trainer':
        setPrimaryColor('#8A4DFF'); setSecondaryColor('#64748B'); setBgColor('#FFFFFF'); setTextColor('#0F172A'); setSelectedFont('Plus Jakarta Sans');
        break;
      case 'barbearia':
        setPrimaryColor('#8000FF'); setSecondaryColor('#1F1F1F'); setBgColor('#171717'); setTextColor('#FFFFFF'); setSelectedFont('Roboto');
        break;
      case 'hamburgueria-artesanal':
        setPrimaryColor('#D97706'); setSecondaryColor('#78350F'); setBgColor('#1C1917'); setTextColor('#FAFAF9'); setSelectedFont('Plus Jakarta Sans');
        break;
      case 'sushi-japonesa':
        setPrimaryColor('#DC2626'); setSecondaryColor('#1E3A5F'); setBgColor('#0F172A'); setTextColor('#F8FAFC'); setSelectedFont('Plus Jakarta Sans');
        break;
      case 'acaiteria-sorveteria':
        setPrimaryColor('#7C3AED'); setSecondaryColor('#DB2777'); setBgColor('#FAFAFA'); setTextColor('#18181B'); setSelectedFont('Plus Jakarta Sans');
        break;
      case 'confeitaria-doces':
        setPrimaryColor('#EC4899'); setSecondaryColor('#A855F7'); setBgColor('#FFF1F2'); setTextColor('#1F2937'); setSelectedFont('Playfair Display');
        break;
      case 'distribuidora-bebidas':
        setPrimaryColor('#2563EB'); setSecondaryColor('#F59E0B'); setBgColor('#111827'); setTextColor('#F9FAFB'); setSelectedFont('Plus Jakarta Sans');
        break;
      default:
        setPrimaryColor('#8A4DFF'); setSecondaryColor('#64748B'); setBgColor('#FFFFFF'); setTextColor('#0F172A'); setSelectedFont('Plus Jakarta Sans');
    }
    setStep('customize-template');
  };

  if (step === 'selection') {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4 animate-in fade-in zoom-in-95 duration-300">
        <button onClick={onBack} className="absolute top-2 md:top-4 left-0 flex items-center gap-2 text-slate-400/60 hover:text-wine-100 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase">Voltar</span>
        </button>
        <div className="flex flex-col items-center mb-12 md:mb-20">
          <span className="text-wine-500 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-4 bg-wine-500/5 px-4 py-1.5 rounded-full border border-wine-500/10">
            BOLTFY PROJECT ENGINE
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white text-center leading-[1.1] mb-6 max-w-4xl mx-auto tracking-tight">
            Do conceito ao código. <span className="text-slate-500 font-medium">Escolha como dar vida à sua ideia hoje.</span>
          </h1>
          <div className="w-12 h-1 bg-wine-600/30 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          <div onClick={() => setStep('templates')} className="group relative bg-[#0a0a0f]/40 backdrop-blur-xl border border-white/[0.03] rounded-[40px] p-8 md:p-12 cursor-pointer hover:border-wine-500/30 hover:bg-wine-500/[0.02] transition-all duration-500 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-wine-500/0 via-wine-500/[0.02] to-wine-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-wine-500/10 rounded-2xl flex items-center justify-center text-wine-500 mb-10 border border-wine-500/20 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(225,29,72,0.1)]">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-wine-100 transition-colors">Começar com um Modelo</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-[240px]">
                Use um modelo pré-configurado e validado para acelerar seu projeto em até 10x.
              </p>
              <div className="mt-10 flex items-center gap-2 text-wine-500 font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
                Explorar Modelos <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </div>
          <div onClick={() => setStep('from-zero')} className="group relative bg-[#0a0a0f]/40 backdrop-blur-xl border border-white/[0.03] rounded-[40px] p-8 md:p-12 cursor-pointer hover:border-wine-500/30 hover:bg-wine-500/[0.02] transition-all duration-500 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-wine-500/0 via-wine-500/[0.02] to-wine-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-wine-500/10 rounded-2xl flex items-center justify-center text-wine-500 mb-10 border border-wine-500/20 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(225,29,72,0.1)]">
                <PlusCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-wine-100 transition-colors">Criar do Zero</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-[240px]">
                Defina cada detalhe, regra de negócio e fluxo para um prompt sob medida.
              </p>
              <div className="mt-10 flex items-center gap-2 text-wine-500 font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
                Iniciar Criação <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'templates') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="w-full lg:w-72 shrink-0 space-y-8">
            <button onClick={() => setStep('selection')} className="flex items-center gap-2 text-slate-400/60 hover:text-wine-100 mb-6">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase">Voltar</span>
            </button>
            <nav className="flex flex-col gap-2 bg-slate-950/40 border border-wine-500/20 rounded-[32px] p-4">
              {templateCategories.map((cat) => (
                <button key={cat.id} onClick={() => setActiveTemplateCategory(cat.id)} className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTemplateCategory === cat.id ? 'bg-wine-500/10 text-white' : 'text-slate-400 hover:bg-white/5'}`}>
                  <cat.icon className="w-5 h-5" />
                  <span className="text-sm font-bold">{cat.label}</span>
                </button>
              ))}
            </nav>
          </aside>
          <main className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-8">
            {templates.filter(t => activeTemplateCategory === 'Todos' || t.category === activeTemplateCategory).map((template) => (
              <div key={template.id} onClick={() => handleSelectTemplate(template)} className="relative group cursor-pointer overflow-hidden rounded-[40px] border border-white/5 bg-slate-950/60 transition-all hover:border-wine-500/30">
                <img src={template.image} className="w-full h-64 object-cover group-hover:scale-105 transition-transform" />
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{template.title}</h3>
                  <p className="text-wine-400 text-sm">{template.description}</p>
                </div>
              </div>
            ))}
            {templates.filter(t => activeTemplateCategory === 'Todos' || t.category === activeTemplateCategory).length === 0 && (
              <div className="xl:col-span-2 py-20 text-center opacity-40">
                <Box className="w-12 h-12 mx-auto mb-4" />
                <p className="text-sm font-bold uppercase tracking-widest">Nenhum modelo nesta categoria ainda.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    );
  }

  if (step === 'customize-template') {
    const previewStyles = {
      backgroundColor: theme === 'claro' ? bgColor : '#121212',
      color: theme === 'claro' ? textColor : '#FFFFFF',
      fontFamily: selectedFont
    };

    return (
      <div className="max-w-[1400px] mx-auto p-4 md:p-8 grid lg:grid-cols-[400px_1fr] gap-10 items-start animate-in fade-in duration-500">
        <div className="flex flex-col items-center sticky top-28">
          <div className="inline-block px-4 py-1.5 mb-8 bg-[#111] border border-white/10 rounded-full shadow-2xl">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
              Modelo: <span className="text-zinc-200">{projectName || 'Novo Aplicativo'}</span>
            </span>
          </div>
          <div className="relative w-[320px] h-[660px] bg-black rounded-[55px] p-3 shadow-[0_0_100px_rgba(138,77,255,0.15)] ring-1 ring-white/10">
            <div className="relative h-full w-full bg-[#1a1a1a] rounded-[45px] overflow-hidden border border-white/5 shadow-inner">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-end px-4">
                <div className="w-2 h-2 rounded-full bg-blue-500/50"></div>
              </div>
              <div className="h-full overflow-y-auto no-scrollbar flex flex-col" style={previewStyles}>
                <div className="p-6 pt-14 flex-1">
                  <div className="flex justify-between items-center mb-8">
                    <button className="p-2 rounded-xl bg-black/5 dark:bg-white/5">
                      <div className="space-y-1">
                        <div className="w-5 h-0.5 bg-current"></div>
                        <div className="w-3 h-0.5 bg-current"></div>
                      </div>
                    </button>
                    <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-black/5"></div>
                  </div>
                  <h1 className="text-2xl font-extrabold mb-1 tracking-tight">{projectName}</h1>
                  <p className="opacity-60 text-sm mb-8 font-medium">Bem-vindo de volta</p>
                  <div className="p-6 rounded-[32px] mb-8 text-white relative overflow-hidden shadow-xl" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}cc)` }}>
                    <div className="relative z-10">
                      {['personal-trainer', 'estudio-tatuagem', 'barbearia', 'clinica-medica'].includes(selectedTemplateId) || category === 'Saúde' ? (
                        <>
                          <h2 className="text-xl font-bold mb-1">Bem-estar</h2>
                          <p className="text-white/80 text-xs font-medium">Sua saúde em primeiro lugar</p>
                        </>
                      ) : (['cafeteria', 'restaurant-pizzaria', 'hamburgueria-artesanal', 'sushi-japonesa', 'acaiteria-sorveteria', 'confeitaria-doces', 'distribuidora-bebidas'].includes(selectedTemplateId) || category === 'Alimentação') ? (
                        <>
                          <h2 className="text-xl font-bold mb-1">Fome de quê?</h2>
                          <p className="text-white/80 text-xs font-medium">Peça e receba em casa</p>
                        </>
                      ) : (
                        <>
                          <h2 className="text-xl font-bold mb-1">Destaque</h2>
                          <p className="text-white/80 text-xs font-medium">Explore as novidades</p>
                        </>
                      )}
                    </div>
                    <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>
                  </div>
                  <div className="space-y-4">
                    {(() => {
                      // Logic for Context Cards
                      if (['personal-trainer'].includes(selectedTemplateId)) {
                        return [
                          { icon: Flame, label: 'Treino do Dia' },
                          { icon: ClipboardList, label: 'Avaliação Física' },
                          { icon: Utensils, label: 'Plano Alimentar' },
                          { icon: Calendar, label: 'Agendar Sessão' }
                        ];
                      }
                      if (['cafeteria', 'acaiteria-sorveteria', 'confeitaria-doces', 'hamburgueria-artesanal', 'sushi-japonesa'].includes(selectedTemplateId)) {
                        return [
                          { icon: Utensils, label: 'Cardápio de Sabores' },
                          { icon: ShoppingBag, label: 'Fazer Pedido' },
                          { icon: Star, label: 'Meus Pontos' },
                          { icon: MapPin, label: 'Localizar Loja' }
                        ];
                      }
                      // Default Fallback
                      return [
                        { icon: Stethoscope, label: 'Marcar Consulta' },
                        { icon: ClipboardList, label: 'Meus Exames' },
                        { icon: History, label: 'Histórico Médico' }
                      ];
                    })().map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-black/5 dark:border-white/5 rounded-2xl transition-all hover:scale-[1.02] active:scale-95 cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="p-2.5 bg-white dark:bg-zinc-800 rounded-xl shadow-sm">
                            <item.icon size={18} className="text-zinc-600 dark:text-white" />
                          </div>
                          <span className="font-bold text-sm tracking-tight">{item.label}</span>
                        </div>
                        <ChevronRight size={16} className="opacity-30" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 pb-8 flex justify-around items-center bg-white/40 dark:bg-black/40 backdrop-blur-xl border-t border-black/5 dark:border-white/5">
                  <Home size={20} className="text-purple-600" />
                  <Search size={20} className="opacity-30" />
                  <User size={20} className="opacity-30" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#111] border border-white/5 rounded-[40px] p-8 lg:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-[120px] rounded-full"></div>
          <button onClick={() => setStep('templates')} className="absolute top-8 right-8 p-2 text-zinc-600 hover:text-white transition-colors"><X size={24} /></button>
          <header className="mb-12 relative">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">Personalização Rápida</span>
              <div className="h-[1px] flex-1 bg-white/5"></div>
              <span className="text-[10px] font-mono text-wine-500 font-bold uppercase tracking-wider">Boltfy Intelligence</span>
            </div>
            <h2 className="text-5xl font-black text-white mb-4 tracking-tighter">Finalizar Modelo</h2>
            <p className="text-zinc-500 font-medium max-w-md">Refine a identidade visual do seu projeto e deixe que nossa IA cuide do código.</p>
          </header>
          <div className="space-y-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Nome do seu Aplicativo</label>
              <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Ex: Academia do Pedro" className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl p-5 text-white focus:border-wine-500/50 transition-all font-medium" />
            </div>
            <div className="bg-[#161616] rounded-3xl p-8 border border-white/5 space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Palette size={18} className="text-wine-500" />
                  <span className="text-xs font-black uppercase tracking-widest">Cores do Sistema</span>
                </div>
                <div className="flex bg-[#0A0A0A] p-1 rounded-xl border border-white/5">
                  <button onClick={() => setTheme('claro')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${theme === 'claro' ? 'bg-white text-black' : 'text-zinc-600'}`}>Claro</button>
                  <button onClick={() => setTheme('escuro')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${theme === 'escuro' ? 'bg-white text-black' : 'text-zinc-600'}`}>Escuro</button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Primária', value: primaryColor, setter: setPrimaryColor },
                  { label: 'Secundária', value: secondaryColor, setter: setSecondaryColor },
                  { label: 'Fundo', value: bgColor, setter: setBgColor },
                  { label: 'Texto', value: textColor, setter: setTextColor },
                ].map((item, idx) => (
                  <div key={idx}>
                    <label className="block text-[10px] font-black text-zinc-500 uppercase mb-2 tracking-widest">{item.label}</label>
                    <div className="relative flex items-center">
                      <div className="absolute left-4 w-5 h-5 rounded-full border border-white/10" style={{ backgroundColor: item.value }} />
                      <input type="text" value={item.value} onChange={(e) => item.setter(e.target.value)} className="w-full bg-[#0A0A0A] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-xs font-mono" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Tipografia</label>
                <div className="relative group">
                  <select value={selectedFont} onChange={(e) => setSelectedFont(e.target.value)} className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl p-5 text-sm font-bold appearance-none cursor-pointer">
                    {fontOptions.map(font => <option key={font} value={font}>{font}</option>)}
                  </select>
                  <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Idioma</label>
                <div className="relative group">
                  <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)} className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl p-5 text-sm font-bold appearance-none cursor-pointer">
                    {languageOptions.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                  </select>
                  <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">IA Programadora</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {aiOptions.map(ai => (
                  <button key={ai} onClick={() => setSelectedDevPlatform(ai)} className={`px-4 py-4 rounded-2xl border font-bold text-[10px] uppercase transition-all ${selectedDevPlatform === ai ? 'border-wine-500 text-wine-500 ring-1 ring-wine-500/50' : 'bg-[#181818] border-white/5 text-zinc-600 hover:text-zinc-400'}`}>
                    {ai}
                  </button>
                ))}
              </div>
            </div>
            <footer className="pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
              <button onClick={() => setStep('templates')} className="text-zinc-600 hover:text-zinc-300 font-bold text-[11px] uppercase tracking-widest">Voltar</button>
              <button onClick={handleFinish} className="w-full sm:w-auto flex items-center justify-center gap-4 bg-gradient-to-br from-wine-600 to-rose-600 hover:from-wine-500 hover:to-rose-500 px-10 py-5 rounded-[20px] transition-all transform hover:scale-[1.02] shadow-xl">
                <Code2 size={20} className="text-white" />
                <span className="text-white font-black italic uppercase tracking-tighter text-sm">Gerar App ({projectName.toUpperCase()})</span>
              </button>
            </footer>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'from-zero') {
    const ColorCard = ({ number, title, description, value, onChange, id }: any) => (
      <div className="bg-slate-950/60 border border-white/5 rounded-[24px] p-6 space-y-4 hover:border-white/10 transition-all">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white tracking-tight">{number}. {title}</h4>
          <p className="text-[11px] text-slate-400/60 leading-tight">{description}</p>
        </div>
        <div className="relative flex items-center justify-between bg-slate-900/50 border border-white/5 rounded-full p-2 pl-3 cursor-pointer" onClick={() => document.getElementById(id)?.click()}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-white/10" style={{ backgroundColor: value }} />
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">{value}</span>
          </div>
          <input id={id} type="color" value={value} onChange={(e) => onChange(e.target.value)} className="absolute opacity-0 w-full h-full cursor-pointer" />
        </div>
      </div>
    );

    return (
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        <div className="flex flex-col lg:flex-row items-start gap-8 md:gap-12 w-full relative">
          <div className="w-full lg:w-[60%] space-y-8 md:space-y-12 pb-32">
            <button onClick={() => setStep('selection')} className="flex items-center gap-2 text-slate-400/60 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase">Etapa Anterior</span>
            </button>
            <section className="bg-slate-950/40 border border-white/5 backdrop-blur-xl rounded-2xl md:rounded-[32px] p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-wine-500/20 flex items-center justify-center text-wine-400 border border-wine-500/20 font-bold text-sm md:text-base">1</div>
                <h2 className="text-xl md:text-2xl font-bold text-white">Nome do Projeto</h2>
              </div>
              <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Ex: AgendaFácil, MeuSaaS..." className="w-full bg-slate-950 border border-white/10 rounded-xl md:rounded-2xl py-4 md:py-5 px-5 md:px-6 text-white outline-none focus:border-wine-500/50 text-sm md:text-base" />
            </section>
            <section className="bg-slate-950/40 border border-white/5 backdrop-blur-xl rounded-[32px] p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 border border-purple-500/20 font-bold">2</div>
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-white">O que o App vai ser?</h2>
                  <p className="text-slate-400/60 text-sm">Um sistema de agendamento? Uma loja online?</p>
                </div>
              </div>
              <textarea value={appDescription} onChange={(e) => setAppDescription(e.target.value)} placeholder="Ex: Sistema de gestão e agendamento..." className="w-full bg-slate-950 border border-white/10 rounded-2xl py-5 px-6 text-white outline-none focus:border-wine-500/50 min-h-[120px] resize-none" />
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => setCategory(cat)} className={`px-6 py-3 rounded-full text-xs font-bold border transition-all duration-300 ${category === cat ? 'bg-wine-600 border-wine-500 text-white shadow-[0_0_15px_rgba(136,19,55,0.2)]' : 'bg-slate-900/50 border-white/5 text-slate-400/60 hover:border-white/10'}`}>{cat}</button>
                ))}
              </div>
            </section>
            <section className="bg-slate-950/40 border border-white/5 backdrop-blur-xl rounded-[32px] p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 border border-orange-500/20 font-bold">3</div>
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-white">Qual dor ele resolve?</h2>
                  <p className="text-slate-400/60 text-sm">Qual o maior benefício para o usuário?</p>
                </div>
              </div>
              <textarea value={appPain} onChange={(e) => setAppPain(e.target.value)} placeholder="Ex: Organizar a agenda, Vender mais..." className="w-full bg-slate-950 border border-white/10 rounded-2xl py-5 px-6 text-white outline-none focus:border-wine-500/50 min-h-[100px] resize-none" />
              <div className="flex flex-wrap gap-3">
                {painTags.map((tag) => (
                  <button key={tag} onClick={() => setAppPain(prev => prev.includes(tag) ? prev : prev ? `${prev}, ${tag}` : tag)} className="px-6 py-3 rounded-full text-xs font-bold bg-slate-900/50 border border-white/5 text-slate-400/60 hover:text-white hover:border-wine-500/50 transition-all duration-300">{tag}</button>
                ))}
              </div>
            </section>
            <section className="bg-slate-950/40 border border-white/5 backdrop-blur-xl rounded-[32px] p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 border border-pink-500/20 font-bold">4</div>
                <h2 className="text-2xl font-bold text-white">Quem é o público-alvo?</h2>
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  {audienceTypes.map((type) => (
                    <button key={type} onClick={() => setSelectedAudienceType(type)} className={`px-5 py-3 rounded-full text-xs font-bold border transition-all ${selectedAudienceType === type ? 'bg-pink-500 border-pink-500 text-white' : 'bg-slate-900/50 border-white/5 text-slate-400/60'}`}>{type}</button>
                  ))}
                </div>
                <input type="text" value={appAudienceDetail} onChange={(e) => setAppAudienceDetail(e.target.value)} placeholder="Mais detalhes sobre o público..." className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none" />
              </div>
            </section>
            <section className="bg-slate-950/40 border border-white/5 backdrop-blur-xl rounded-[32px] p-8 space-y-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-wine-500/20 flex items-center justify-center text-wine-400 border border-wine-500/20 font-bold">5</div>
                  <h2 className="text-2xl font-bold text-white">Páginas do App</h2>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-full px-4 py-1 flex items-center gap-2">
                  <span className="text-[10px] font-bold text-wine-400 uppercase tracking-widest">{selectedPages.length} Selecionadas</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {packages.map((pkg) => (
                  <button key={pkg.id} onClick={() => selectPackage(pkg.pages)} className="bg-slate-900/50 border border-white/5 rounded-[20px] p-4 flex items-center gap-3 hover:bg-[#111] hover:border-white/10 transition-all active:scale-95 text-left group">
                    <div className={`w-10 h-10 bg-black/40 rounded-xl flex items-center justify-center border border-white/5 group-hover:border-white/10`}><pkg.icon className={`w-5 h-5 ${pkg.color}`} /></div>
                    <span className="text-xs font-bold text-slate-200">{pkg.label}</span>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {pagesList.map((page) => (
                  <button key={page} onClick={() => togglePage(page)} className={`p-5 rounded-2xl text-xs font-bold border text-left transition-all duration-300 ${selectedPages.includes(page) ? 'bg-wine-600/20 border-wine-500 text-white shadow-[0_0_20px_rgba(136,19,55,0.15)]' : 'bg-slate-900/50 border-white/5 text-slate-400/60 hover:border-white/10'}`}>{page}</button>
                ))}
              </div>
            </section>
            <section className="bg-slate-950/20 rounded-[32px] p-2 space-y-8">
              <div className="px-6 pt-6">
                <h2 className="text-2xl font-bold text-white mb-2">Identidade Visual</h2>
                <div className="flex items-center gap-2 text-wine-400/80"><Lightbulb className="w-4 h-4" /><p className="text-xs italic">Personalize sua paleta de cores e tipografia.</p></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
                <ColorCard number="1" title="Cor Primária" description="A cor de destaque da marca." value={primaryColor} onChange={setPrimaryColor} id="c-primary" />
                <ColorCard number="2" title="Cor Secundária" description="Uma cor de apoio." value={secondaryColor} onChange={setSecondaryColor} id="c-secondary" />
                <ColorCard number="3" title="Cor de Fundo" description="A cor de base." value={bgColor} onChange={setBgColor} id="c-bg" />
                <ColorCard number="4" title="Cor do Texto" description="Cor para textos." value={textColor} onChange={setTextColor} id="c-text" />
              </div>
            </section>
            <section className="bg-slate-950/40 border border-white/5 backdrop-blur-xl rounded-[32px] p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/20 font-bold">6</div>
                <h2 className="text-2xl font-bold text-white">IA de Destino</h2>
              </div>
              <p className="text-slate-400/60 text-sm mb-4">Para qual plataforma você vai levar este prompt?</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {aiOptions.map(ai => (
                  <button key={ai} onClick={() => setSelectedDevPlatform(ai)} className={`px-4 py-4 rounded-2xl border font-bold text-[10px] uppercase transition-all ${selectedDevPlatform === ai ? 'border-wine-500 text-wine-500 ring-1 ring-wine-500/50 bg-wine-500/5' : 'bg-slate-900/50 border-white/5 text-slate-400 hover:border-white/10 hover:text-white'}`}>
                    {ai}
                  </button>
                ))}
              </div>
            </section>
            <footer className="py-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
              <button onClick={() => setStep('selection')} className="text-slate-400/60 hover:text-white font-bold text-xs uppercase tracking-widest">Voltar</button>
              <button onClick={handleFinish} className="w-full md:w-auto px-10 py-5 bg-gradient-to-r from-wine-600 to-rose-600 rounded-2xl text-white font-bold text-sm hover:shadow-2xl transition-all">Gerar Aplicativo</button>
            </footer>
          </div>
          <aside className="hidden lg:block lg:w-[40%] sticky top-[20px] h-auto self-start z-10">
            <div className="relative w-full max-w-[320px] mx-auto">
              <div className="absolute inset-0 blur-[80px] opacity-10 pointer-events-none" style={{ backgroundColor: primaryColor }} />
              <div className="relative w-full aspect-[1/2.1] rounded-[54px] p-3 border-[6px] border-[#1e293b] shadow-2xl overflow-hidden" style={{ backgroundColor: secondaryColor }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1e293b] rounded-b-3xl z-20" />
                <div className="w-full h-full rounded-[44px] overflow-hidden flex flex-col pt-10 px-6" style={{ backgroundColor: bgColor }}>
                  <div className="flex justify-between items-center mb-10"><Menu className="w-5 h-5 opacity-60" style={{ color: textColor }} /><div className="w-9 h-9 rounded-full bg-black/20 border border-white/5" /></div>
                  <h3 className="text-2xl font-bold line-clamp-2 leading-tight mb-6" style={{ color: textColor, fontFamily: selectedFont }}>{projectName || "Novo Aplicativo"}</h3>
                  <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 mb-6">
                    {selectedPages.length > 0 ? selectedPages.map((page, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl"><span className="text-[11px] font-medium" style={{ color: textColor }}>{page}</span><ChevronRight className="w-3 h-3 opacity-30" style={{ color: textColor }} /></div>
                    )) : <div className="py-12 flex flex-col items-center justify-center opacity-20 text-center"><Palette className="w-10 h-10 mb-2" style={{ color: textColor }} /><p className="text-[10px] uppercase font-bold tracking-widest" style={{ color: textColor }}>Configure suas telas</p></div>}
                  </div>
                  <div className="mt-auto mb-8"><button onClick={handleFinish} className="w-full py-4 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.2em] shadow-lg transition-all" style={{ backgroundColor: primaryColor }}>Gerar MVP</button></div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  return null;
};

export default CreateAppView;