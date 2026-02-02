import React, { useState, useRef, useEffect } from 'react';
import {
    Target, Globe, ChevronDown, Check, Utensils,
    Scissors, Pill, Home, Dog, Dumbbell,
    Store, Building2, GraduationCap, MousePointer2,
    Search, MessageSquare, Plus, Flame, ArrowLeft, Users, ExternalLink, TrendingUp, X, Zap, Copy
} from 'lucide-react';

interface GroupData {
    name: string;
    members: string;
    link: string;
    demand?: 'alta' | 'media';
    description?: string;
    postsPerDay?: string;
}

const RadarView: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState('BR');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedNiche, setSelectedNiche] = useState<string | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [displayGroups, setDisplayGroups] = useState<GroupData[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<GroupData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showApproaches, setShowApproaches] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Coringa Approaches
    const approaches = [
        {
            title: "O 'Fim das Taxas e Comissões' (Apelo Financeiro)",
            content: "Fala, pessoal! Notei que muitos aqui no grupo têm negócios excelentes, mas ainda ficam presos a taxas de plataformas de terceiros ou processos manuais que tomam tempo. Eu trabalho desenvolvendo softwares e apps personalizados (SaaS) para empresas. Seja para gerir agendamentos, pedidos ou clientes, eu crio a sua própria tecnologia para você parar de pagar comissão e ter o controle total. Alguém aqui precisando digitalizar o negócio? Me chama!"
        },
        {
            title: "O 'Escala e Profissionalismo' (Apelo de Autoridade)",
            content: "Bom dia, empresários! Estava analisando o engajamento deste nicho e vejo uma oportunidade gigante para quem quer escalar. Eu ajudo donos de negócios a transformarem seus serviços em um aplicativo próprio. Se você quer profissionalizar o atendimento e ter um sistema que trabalha por você 24h (estilo SaaS), eu posso desenvolver isso. Quem tiver interesse em modernizar a operação, só me dar um toque no privado!"
        },
        {
            title: "A 'Solução de Problemas Operacionais' (Apelo de Eficiência)",
            content: "Olá, pessoal! Tudo bem? Trabalho com desenvolvimento de soluções tecnológicas e estou focado em ajudar empresas deste setor a automatizarem processos chatos. Se você gasta muito tempo em planilhas ou no WhatsApp para organizar o dia a dia, eu crio o software que resolve isso. É tecnologia sob medida para o seu negócio crescer sem bagunça. Se quiser ver como um app personalizado se aplica ao seu caso, bora conversar!"
        }
    ];

    // Expanded Database
    const GROUPS_DATABASE: Record<string, GroupData[]> = {
        BR: [
            { name: "Empresários e Comerciantes de SP", members: "21,2 mil", link: "https://www.facebook.com/share/g/1C4d9Wt57n/", demand: 'alta', description: "Grupo focado em comércio, empresários e networking profissional em SP.", postsPerDay: "82" },
            { name: "Grupo de Empreendedorismo e Comerciantesc", members: "5,6 mil", link: "https://www.facebook.com/share/g/1AL9YTLc2j/", demand: 'alta', description: "Networking para comerciantes e novos empreendedores.", postsPerDay: "45" },
            { name: "GRUPO PRESTADORES DE SERVIÇOS, COMERCIANTES E AUTÔNOMOS", members: "12,9 mil", link: "https://www.facebook.com/share/g/1HoDTp9v8e/", demand: 'alta', description: "Focado em prestação de serviços e autonomia comercial.", postsPerDay: "61" },
            { name: "Comerciantes e Pequenos Empresários", members: "2,8 mil", link: "https://www.facebook.com/share/g/1Bo4xzuWd9/", demand: 'alta', description: "Pequenos negócios com alta taxa de engajamento local.", postsPerDay: "12" },
            { name: "Empresários e comerciantes de Atibaia", members: "16,5 mil", link: "https://www.facebook.com/share/g/1HG2mpmhVj/", demand: 'alta', description: "Focado no mercado regional de Atibaia e arredores.", postsPerDay: "74" },
            { name: "Grupo de comerciantes, adegas e distribuidores em geral", members: "5,9 mil", link: "https://www.facebook.com/share/g/1bJddgTqfU/", demand: 'alta', description: "Distribuição e varejo especializado.", postsPerDay: "38" },
            { name: "CAJURU, GUABIROTUBA, UBERABA e JD. DAS AMÉRICAS", members: "23,9 mil", link: "https://www.facebook.com/share/g/1BvWoSoeWW/", demand: 'alta', description: "Comerciantes e moradores com foco em negócios locais.", postsPerDay: "95" },
            { name: "COMERCIANTES DA ZONA LESTE DE SÃO PAULO", members: "11,3 mil", link: "https://www.facebook.com/share/g/1BwvYKLGB1/", demand: 'alta', description: "Rede de negócios exclusiva para a Zona Leste de SP.", postsPerDay: "52" },
            { name: "Moradores e Comerciantes da Praia da Costa", members: "7,3 mil", link: "https://www.facebook.com/share/g/182665p55J/", demand: 'alta', description: "Oportunidades locais em Vila Velha-ES.", postsPerDay: "28" },
            { name: "Comerciantes de balneario pinhal", members: "4,9 mil", link: "https://www.facebook.com/share/g/1CL5PNY4ZM/", demand: 'alta', description: "Focado em comércio de litoral e turismo.", postsPerDay: "15" },
            { name: "Comércio Local de Cajamar e Região", members: "5,3 mil", link: "https://www.facebook.com/share/g/1847dyGWZq/", demand: 'alta', description: "Cajamar e regiões próximas com forte atividade de vendas.", postsPerDay: "33" },
            { name: "Comerciantes de jundiaí e região", members: "5,5 mil", link: "https://www.facebook.com/share/g/1FCA8Sbevp/", demand: 'alta', description: "Networking comercial para a região de Jundiaí.", postsPerDay: "40" },
            { name: "Negócios e Oportunidades", members: "67,7 mil", link: "https://www.facebook.com/share/g/1AJijnMpmE/", demand: 'alta', description: "Grande volume de tráfego para divulgações e B2B.", postsPerDay: "420" },
            { name: "NEGOCIOS", members: "29,7 mil", link: "https://www.facebook.com/share/g/1aEg4Mpn4U/", demand: 'alta', description: "Espaço aberto para comércio e parcerias empresariais.", postsPerDay: "110" },
            { name: "Negócios Online", members: "5,1 mil", link: "https://www.facebook.com/share/g/185PVTGsiM/", demand: 'alta', description: "E-commerce, infoprodutos e soluções digitais.", postsPerDay: "65" },
            { name: "GRUPO DE VENDAS ANUNCIOS E DIVULGAÇÃO", members: "21,1 mil", link: "https://www.facebook.com/share/g/14NaqCQ9UL1/", demand: 'alta', description: "Divulgação de serviços com alta recorrência.", postsPerDay: "140" },
            { name: "\"GRUPO DIVULGAÇÃO MARKETING\"", members: "22,4 mil", link: "https://www.facebook.com/share/g/1HAQwALHQ1/", demand: 'alta', description: "Estratégias de marketing e networking direto.", postsPerDay: "88" },
            { name: "Marketing Digital Divulgação", members: "18,3 mil", link: "https://www.facebook.com/share/g/186JNdc5Aa/", demand: 'alta', description: "Focado em profissionais de marketing e agências.", postsPerDay: "76" },
            { name: "JOVENS DE NEGÓCIOS MARKETING DIGITAL", members: "22,9 mil", link: "https://www.facebook.com/share/g/1ASVGjgovL/", demand: 'alta', description: "Nova geração de empreendedores digitais.", postsPerDay: "92" },
            { name: "EMPREENDEDORES DE MARKETING DIGITAL", members: "10,4 mil", link: "https://www.facebook.com/share/g/1Cvh2f718t/", demand: 'alta', description: "Empreendedorismo focado em performance online.", postsPerDay: "48" },
            { name: "Donos de Negócios, Empresários - NETWORKING BRASIL", members: "15,9 mil", link: "https://www.facebook.com/share/g/1DP1MsfCKp/", demand: 'alta', description: "Networking qualificado para donos de empresas.", postsPerDay: "55" },
            { name: "Grupo de Iniciantes Empreendedores", members: "57,4 mil", link: "https://www.facebook.com/share/g/1a5EkyaoXT/", demand: 'alta', description: "Audência em fase de crescimento e consumo de serviços.", postsPerDay: "210" },
            { name: "Empresários e comerciantes de SP (Global)", members: "21,2 mil", link: "https://www.facebook.com/share/g/1CFtsF58wB/", demand: 'alta', description: "Expansão de negócios em solo paulista.", postsPerDay: "85" },
            { name: "Empresários Brasileiros & Negócios", members: "11,7 mil", link: "https://www.facebook.com/share/g/17kCpSGU7n/", demand: 'alta', description: "Divulgação de produtos e serviços nacionais.", postsPerDay: "42" },
            { name: "empreendedores e empresários de sucesso.", members: "19,6 mil", link: "https://www.facebook.com/share/g/1HZKwHdXky/", demand: 'alta', description: "Networking focado em alta conversão.", postsPerDay: "77" },
            { name: "Empreendedor Espaço de Insights ✨", members: "133,3 mil", link: "https://www.facebook.com/share/g/171rGKcUxV/", demand: 'alta', description: "Maior comunidade de troca de insights de negócios.", postsPerDay: "560" },
            { name: "EMPRESÁRIOS EM AÇÃO", members: "39,1 mil", link: "https://www.facebook.com/share/g/18GcbCK9bR/", demand: 'alta', description: "Focado em ação imediata e fechamento de contratos.", postsPerDay: "125" },
            { name: "Empresários de Sucesso", members: "26,9 mil", link: "https://www.facebook.com/share/g/1HFNhUhW2r/", demand: 'alta', description: "Comunidade de elite para troca de experiências.", postsPerDay: "68" },
            { name: "Pequenos empresários", members: "21,0 mil", link: "https://www.facebook.com/share/g/16PMJN6Rt1/", demand: 'alta', description: "Focado na dor e solução para MPEs.", postsPerDay: "54" },
            { name: "Empresarios", members: "5,2 mil", link: "https://www.facebook.com/share/g/1NH7FWob4h/", demand: 'alta', description: "Direto ao ponto: parcerias e vendas.", postsPerDay: "31" }
        ],
        PT: [
            { name: "Empresas e Empresários de Portugal", members: "68,8 mil", link: "https://www.facebook.com/share/g/1GBrfV5m9t/", demand: 'alta', description: "Grupo de Portugal focado em comércio, empregos e networking profissional.", postsPerDay: "110" },
            { name: "Oportunidades e empregos em Portugal", members: "33,9 mil", link: "https://www.facebook.com/share/g/1BG52dpFxv/", demand: 'alta', description: "Conexão direta para serviços e contratação em solo luso.", postsPerDay: "85" },
            { name: "Divulga Negócios e Serviços em Portugal", members: "5,5 mil", link: "https://www.facebook.com/share/g/186JNdc5Aa/", demand: 'alta', description: "Espaço para PMEs e autônomos portugueses.", postsPerDay: "25" },
            { name: "Portugal Negócios & Serviços", members: "15,7 mil", link: "https://www.facebook.com/share/g/1ASVGjgovL/", demand: 'alta', description: "Networking focado em vendas e visibilidade local.", postsPerDay: "42" },
            { name: "Negócios em Portugal", members: "27,7 mil", link: "https://facebook.com/groups/negociospt", demand: 'alta', description: "Marketplace e conexões de negócios em Portugal.", postsPerDay: "76" },
            { name: "Empreendedores em Portugal", members: "15,9 mil", link: "https://www.facebook.com/share/g/1DWuqc...", demand: 'alta', description: "Focado inovações e novas empresas em Portugal.", postsPerDay: "34" }
        ]
    };

    const countries = [
        { id: 'BR', name: 'Brasil' },
        { id: 'PT', name: 'Portugal' },
        { id: 'US', name: 'Estados Unidos' },
        { id: 'GB', name: 'Reino Unido' },
        { id: 'CO', name: 'Colômbia' },
        { id: 'IT', name: 'Itália' },
        { id: 'MX', name: 'México' },
        { id: 'AR', name: 'Argentina' },
        { id: 'TR', name: 'Turquia' },
    ];

    const niches = [
        { name: 'Alimentação', icon: <Utensils size={24} /> },
        { name: 'Beleza e Estética', icon: <Scissors size={24} /> },
        { name: 'Saúde', icon: <Pill size={24} /> },
        { name: 'Casa & Serviços', icon: <Home size={24} /> },
        { name: 'Pet', icon: <Dog size={24} /> },
        { name: 'Esporte & Bem-Estar', icon: <Dumbbell size={24} /> },
        { name: 'Varejo Local', icon: <Store size={24} /> },
        { name: 'Imobiliário', icon: <Building2 size={24} /> },
        { name: 'Educação', icon: <GraduationCap size={24} /> }
    ];

    const handleSearch = () => {
        if (!selectedNiche) return;
        setIsSearching(true);
        setTimeout(() => {
            const db = GROUPS_DATABASE[selectedCountry] || GROUPS_DATABASE['BR'];
            const shuffled = [...db].sort(() => 0.5 - Math.random());
            setDisplayGroups(shuffled.slice(0, 5));
            setIsSearching(false);
            setShowResults(true);
        }, 2000);
    };

    const openAnalysis = (group: GroupData) => {
        setSelectedGroup(group);
        setIsModalOpen(true);
        setShowApproaches(false);
    };

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const currentCountry = countries.find(c => c.id === selectedCountry) || countries[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen text-white font-sans selection:bg-red-600/40 p-1 md:p-4 flex flex-col items-center overflow-x-hidden" style={{ background: 'radial-gradient(circle at 50% 0%, #150505 0%, #050505 100%)', backgroundAttachment: 'fixed' }}>

            {/* Load Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&family=Rajdhani:wght@400;500;600;700&family=Inter:wght@300;400;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <style>
                {`
          .font-tech { font-family: 'Rajdhani', sans-serif; }
          .font-body { font-family: 'Inter', sans-serif; }
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
          .font-poppins { font-family: 'Poppins', sans-serif; }

          body {
            background: radial-gradient(circle at 50% 0%, #150505 0%, #050505 100%) !important;
            background-attachment: fixed;
            margin: 0;
            padding: 0;
          }

          @keyframes pulse-blue {
            0% { text-shadow: 0 0 0px rgba(59, 130, 246, 0); opacity: 0.8; }
            50% { text-shadow: 0 0 15px rgba(59, 130, 246, 0.8); opacity: 1; }
            100% { text-shadow: 0 0 0px rgba(59, 130, 246, 0); opacity: 0.8; }
          }
          .facebook-pulse {
            color: #3b82f6;
            font-family: 'Poppins', sans-serif;
            font-weight: bold;
            display: flex;
            align-items: center;
            animation: pulse-blue 2s infinite ease-in-out;
          }

          .bolt-text {
            font-family: 'Poppins', sans-serif;
            font-weight: 800;
            font-style: italic;
            letter-spacing: 1px;
            background: linear-gradient(90deg, #fff 0%, #ff3b3b 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .badge-container {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 9999px;
            padding: 6px 20px;
            display: flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
          }

          .step-card {
            background: #111111;
            border: 1px solid #222;
            border-radius: 20px;
            padding: 30px;
            transition: all 0.3s ease;
          }

          .step-card:hover {
            transform: translateY(-5px);
            border-color: #333;
            background: #141414;
          }

          .icon-box {
            width: 50px;
            height: 50px;
            background: rgba(255, 0, 0, 0.05);
            border: 1px solid rgba(255, 0, 0, 0.2);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            color: #ff3b3b;
            box-shadow: 0 0 15px rgba(255, 59, 59, 0.1);
          }

          .step-label {
            font-family: 'Poppins', sans-serif;
            font-size: 10px;
            letter-spacing: 2px;
            color: #555;
            text-transform: uppercase;
            font-weight: 600;
          }

          .main-title-poppins {
            font-family: 'Poppins', sans-serif;
          }

          @keyframes pulse-green {
            0% { opacity: 0.7; filter: brightness(0.9); }
            50% { opacity: 1; filter: brightness(1.2); }
            100% { opacity: 0.7; filter: brightness(0.9); }
          }
          .pulse-green {
            animation: pulse-green 3s infinite ease-in-out;
          }
          .red-glow-card {
            box-shadow: 0 0 20px -5px rgba(255, 30, 30, 0.2);
          }
          .red-glow-strong {
            box-shadow: 0 0 30px -5px rgba(255, 30, 30, 0.5);
          }
          .loading-bar {
            width: 100%;
            height: 4px;
            background: #1A1A1A;
            position: relative;
            overflow: hidden;
            border-radius: 10px;
          }
          .loading-bar::after {
            content: '';
            position: absolute;
            width: 40%;
            height: 100%;
            background: #FF1E1E;
            box-shadow: 0 0 10px #FF1E1E;
            animation: loading 1.5s infinite ease-in-out;
          }
          @keyframes loading {
            0% { left: -40%; }
            100% { left: 100%; }
          }
          .animate-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          /* V2 Modal Styles */
          .boltfy-card-v2 {
            background: #12121a;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 32px;
            padding: 40px;
            width: 100%;
            max-width: 560px;
            font-family: 'Plus Jakarta Sans', sans-serif;
            color: #ffffff;
            box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.8);
            position: relative;
            animation: boltfy-zoom-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          @keyframes boltfy-zoom-in {
            from { opacity: 0; transform: scale(0.95) translateY(10px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }

          .boltfy-tag {
            font-size: 10px;
            font-weight: 700;
            color: #ff2e63;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            margin-bottom: 12px;
            display: block;
          }

          .boltfy-title {
            font-size: 32px;
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 8px;
            letter-spacing: -0.02em;
          }

          .boltfy-subtitle {
            font-size: 15px;
            color: rgba(255, 255, 255, 0.4);
            margin-bottom: 32px;
            font-weight: 500;
          }

          .boltfy-stats {
            display: grid;
            grid-template-cols: 1fr 1fr 1.2fr;
            gap: 16px;
            margin-bottom: 32px;
            padding-bottom: 24px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          }

          .stat-box {
            display: flex;
            align-items: center;
            gap: 8px;
            justify-content: center;
          }

          .stat-box:not(:last-child) {
            border-right: 1px solid rgba(255, 255, 255, 0.05);
          }

          .stat-label {
            font-size: 9px;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.3);
            font-weight: 800;
            letter-spacing: 0.1em;
            white-space: nowrap;
          }

          .stat-value {
            font-size: 18px;
            font-weight: 800;
            white-space: nowrap;
          }

          .text-green { color: #10b981; }
          .text-orange { color: #f59e0b; }

          .boltfy-ai-panel {
            background: rgba(255, 46, 99, 0.06);
            border-left: 3px solid #ff2e63;
            border-radius: 4px 20px 20px 4px;
            padding: 20px 24px;
            margin-bottom: 32px;
            display: flex;
            align-items: center;
            gap: 16px;
          }

          .radar-v2 {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 1px solid rgba(255, 46, 99, 0.2);
            position: relative;
            flex-shrink: 0;
          }

          .radar-v2::after {
            content: '';
            position: absolute;
            inset: -1px;
            border-radius: 50%;
            background: conic-gradient(from 0deg, #ff2e63 0%, transparent 40%);
            animation: sweep-v2 3s linear infinite;
            -webkit-mask-image: radial-gradient(circle, transparent 45%, black 46%);
          }

          @keyframes sweep-v2 {
            to { transform: rotate(360deg); }
          }

          .radar-center {
            position: absolute;
            width: 5px;
            height: 5px;
            background: #ff2e63;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 10px #ff2e63;
          }

          .ai-label-v2 {
            font-size: 10px;
            font-weight: 800;
            color: #ff2e63;
            text-transform: uppercase;
            margin-bottom: 4px;
            display: block;
          }

          .ai-msg-v2 {
            font-size: 13px;
            color: rgba(255, 255, 255, 0.85);
            font-style: italic;
            line-height: 1.4;
            font-weight: 500;
          }

          .boltfy-actions {
            display: flex;
            gap: 12px;
          }

          .btn-boltfy {
            cursor: pointer;
            padding: 16px 20px;
            border-radius: 16px;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.2s ease;
            flex: 1;
            font-family: 'Plus Jakarta Sans', sans-serif;
          }

          .btn-primary-v2 {
            background: #ff2e63;
            color: white;
            border: none;
            box-shadow: 0 10px 20px -5px rgba(255, 46, 99, 0.4);
          }

          .btn-primary-v2:hover {
            transform: translateY(-2px);
            filter: brightness(1.1);
          }

          .btn-outline-v2 {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: white;
          }

          .btn-outline-v2:hover {
            background: rgba(255, 255, 255, 0.1);
          }

          .close-icon-v2 {
            position: absolute;
            top: 24px;
            right: 24px;
            color: rgba(255, 255, 255, 0.3);
            cursor: pointer;
            transition: color 0.2s;
          }
          .close-icon-v2:hover { color: white; }

          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        `}
            </style>


            {!showResults ? (
                <>
                    {/* Hero Section Redesign */}
                    <div className="max-w-4xl text-center mb-8 mx-auto">
                        <h1 className="main-title-poppins text-zinc-400 text-xl md:text-2xl leading-relaxed font-light tracking-tight">
                            Unidades ocultas e extraia oportunidades reais de negócio. <br />
                            <span className="text-zinc-200 font-normal">Onde há conversa, há conversão.</span>
                        </h1>
                    </div>

                    {/* BADGES */}
                    <div className="flex justify-center mb-16">
                        <div className="badge-container">
                            <div className="flex items-center gap-2">
                                <span className="bolt-text">BOLTFY</span>
                                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest main-title-poppins">Radar</span>
                            </div>
                            <div className="w-[1px] h-4 bg-zinc-800"></div>
                            <div className="facebook-pulse">
                                <span className="text-xs tracking-[0.2em] uppercase font-black">Facebook</span>
                            </div>
                        </div>
                    </div>

                    {/* Grid de Cards de Etapas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto mb-16">
                        <div className="step-card">
                            <div className="flex justify-between items-start">
                                <div className="icon-box">
                                    <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /></svg>
                                </div>
                                <span className="step-label">Etapa 01</span>
                            </div>
                            <h2 className="main-title-poppins text-xl font-bold mb-4">Defina o Nicho</h2>
                            <p className="text-zinc-500 text-sm leading-relaxed">
                                Escolha o segmento ideal para sua atuação. Restaurantes, estética, saúde ou qualquer mercado B2B.
                            </p>
                        </div>

                        <div className="step-card">
                            <div className="flex justify-between items-start">
                                <div className="icon-box">
                                    <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                </div>
                                <span className="step-label">Etapa 02</span>
                            </div>
                            <h2 className="main-title-poppins text-xl font-bold mb-4">Mapeie Grupos</h2>
                            <p className="text-zinc-500 text-sm leading-relaxed">
                                O Radar identifica automaticamente onde empresários e tomadores de decisão trocam indicações.
                            </p>
                        </div>

                        <div className="step-card">
                            <div className="flex justify-between items-start">
                                <div className="icon-box">
                                    <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
                                </div>
                                <span className="step-label">Etapa 03</span>
                            </div>
                            <h2 className="main-title-poppins text-xl font-bold mb-4">Inicie a Oferta</h2>
                            <p className="text-zinc-500 text-sm leading-relaxed">
                                Participe das conversas de forma estratégica e posicione sua solução com alta autoridade.
                            </p>
                        </div>
                    </div>

                    <main className="w-full max-w-5xl bg-[#161616] border border-[#262626] p-8 md:p-12 rounded-[32px] red-glow-card relative mb-20">
                        <section className="mb-12">
                            <div className="flex items-center gap-2 mb-4 text-zinc-500 font-tech">
                                <Globe size={14} />
                                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em]">Localização Alvo</h2>
                            </div>
                            <div className="relative inline-block" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center gap-4 bg-[#0F0F0F] border border-[#262626] p-4 rounded-xl hover:border-red-600 transition-all font-tech"
                                >
                                    <div className="w-10 h-6 bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-white rounded">
                                        {currentCountry.id}
                                    </div>
                                    <div className="flex flex-col text-left pr-8">
                                        <span className="text-lg font-bold text-white tracking-tighter uppercase italic">{currentCountry.name}</span>
                                        <span className="text-[9px] uppercase font-semibold text-zinc-500">MERCADO SELECIONADO</span>
                                    </div>
                                    <ChevronDown size={20} className={`text-zinc-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-full bg-[#1A1A1A] border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl p-1">
                                        <div className="max-h-60 overflow-y-auto custom-scrollbar">
                                            {countries.map(c => (
                                                <button
                                                    key={c.id}
                                                    onClick={() => { setSelectedCountry(c.id); setIsDropdownOpen(false); }}
                                                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-600/10 hover:text-red-500 transition-all text-sm font-bold text-zinc-400 font-tech"
                                                >
                                                    <span className="uppercase italic tracking-tighter">{c.name}</span>
                                                    {selectedCountry === c.id && <Check size={14} />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                        <section className="mb-12">
                            <div className="flex items-center gap-2 mb-6 text-zinc-500 font-tech">
                                <Target size={14} />
                                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em]">Selecione o Nicho</h2>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {niches.map((niche) => (
                                    <button
                                        key={niche.name}
                                        onClick={() => setSelectedNiche(niche.name)}
                                        className={`group flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 border ${selectedNiche === niche.name ? 'bg-red-600/10 border-red-600 border shadow-[0_0_20px_rgba(255,30,30,0.1)]' : 'bg-[#1A1A1A] border-[#262626] hover:border-red-600/50'}`}
                                    >
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all ${selectedNiche === niche.name ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(255,30,30,0.4)]' : 'bg-zinc-800 text-zinc-500 group-hover:text-red-500'}`}>
                                            {niche.icon}
                                        </div>
                                        <span className={`text-[11px] font-bold text-center leading-tight transition-colors uppercase italic font-tech ${selectedNiche === niche.name ? 'text-white' : 'text-zinc-400'}`}>
                                            {niche.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </section>

                        <button
                            disabled={!selectedNiche || isSearching}
                            onClick={handleSearch}
                            className={`w-full py-5 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all transform active:scale-[0.98] uppercase italic tracking-tighter font-tech ${!selectedNiche ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50' : 'bg-red-600 text-white font-black text-lg hover:bg-red-500 red-glow-strong'}`}
                        >
                            {isSearching ? (
                                <div className="w-full px-12 space-y-3">
                                    <span className="text-sm font-black animate-pulse">SOCIAL SEARCH: MAPEANDO GRUPOS...</span>
                                    <div className="loading-bar"></div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Search size={22} className="stroke-[3]" />
                                    <span>Extrair Grupos Alvo</span>
                                </div>
                            )}
                        </button>
                    </main>
                </>
            ) : (
                <div className="w-full max-w-5xl animate-in font-body">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex flex-col font-jakarta">
                            <h2 className="text-3xl font-semibold uppercase tracking-tight text-white">Resultados <span className="text-red-600">Premium</span></h2>
                            <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-widest mt-1">
                                {displayGroups.length} grupos com <span className="text-emerald-500 font-bold pulse-green inline-block">Alta Demanda</span> encontrados
                            </p>
                        </div>
                        <button onClick={handleSearch} className="text-red-500 hover:text-red-400 font-bold text-[11px] uppercase tracking-widest transition-colors font-jakarta bg-red-500/5 px-4 py-2 rounded-lg border border-red-500/20">
                            Nova Busca
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                        {displayGroups.map((group, idx) => (
                            <div key={idx} className="bg-[#161616] border border-[#262626] p-6 rounded-[28px] hover:border-zinc-700 transition-all group relative overflow-hidden animate-in" style={{ animationDelay: `${idx * 100}ms` }}>
                                <div className="flex gap-4 mb-4">
                                    <div className="shrink-0">
                                        <div className="w-16 h-16 bg-[#1A1A1A] rounded-full border border-white/5 flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
                                            <Users size={28} className="text-zinc-600 group-hover:text-red-500" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <h3 className="font-bold text-lg text-zinc-100 group-hover:text-white truncate leading-tight mb-2">
                                            {group.name}
                                        </h3>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center text-zinc-500 text-[11px] font-bold uppercase tracking-wider">
                                                <Users size={14} className="mr-1.5" />
                                                {group.members}
                                            </div>
                                            <div className="flex items-center text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter pulse-green">
                                                <TrendingUp size={10} className="mr-1" /> ALTA DEMANDA
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-zinc-500 text-xs leading-relaxed mb-6 font-medium italic">
                                    {group.description}
                                </p>
                                <button onClick={() => openAnalysis(group)} className="w-full py-3 bg-[#1F1F1F] hover:bg-zinc-700 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 font-tech uppercase tracking-widest italic">
                                    Analisar Oportunidade
                                    <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col items-center gap-4 text-center">
                        <button onClick={() => setShowResults(false)} className="text-zinc-500 hover:text-white flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors">
                            <ArrowLeft className="w-3 h-3" /> Voltar ao Início
                        </button>
                        <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.3em] font-tech">
                            Sincronizado com Social Search Engine v2.0 • {currentCountry.name}
                        </p>
                    </div>
                </div>
            )}

            {/* V2 Command Center Modal */}
            {isModalOpen && selectedGroup && (
                <div
                    className="fixed inset-0 flex items-center justify-center p-4 backdrop-blur-md"
                    style={{ zIndex: 9999, backgroundColor: 'rgba(5, 5, 8, 0.85)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
                >

                    <div className="boltfy-card-v2 max-h-[95vh] overflow-y-auto custom-scrollbar">
                        <div className="close-icon-v2" onClick={() => setIsModalOpen(false)}>
                            <X size={24} strokeWidth={2.5} />
                        </div>

                        <span className="boltfy-tag">Análise Estratégica Boltfy</span>
                        <h1 className="boltfy-title">Centro de Comando: {selectedGroup.name.split(' ')[0]}</h1>
                        <p className="boltfy-subtitle">Insights em tempo real para expansão comercial.</p>

                        <div className="boltfy-stats">
                            <div className="stat-box">
                                <span className="stat-label">Rede</span>
                                <span className="stat-value">{selectedGroup.members}</span>
                            </div>
                            <div className="stat-box">
                                <span className="stat-label">Volume</span>
                                <span className="stat-value text-green">+{selectedGroup.postsPerDay || '74'}</span>
                            </div>
                            <div className="stat-box">
                                <span className="stat-label">Engajamento</span>
                                <span className="stat-value text-orange">98%</span>
                            </div>
                        </div>

                        <div className="boltfy-ai-panel">
                            <div className="radar-v2">
                                <div className="radar-center"></div>
                            </div>
                            <div>
                                <span className="ai-label-v2">IA Inteligência Ativa</span>
                                <p className="ai-msg-v2">"Alta densidade de leads qualificados detectada no cluster {selectedNiche || 'comercial'}."</p>
                            </div>
                        </div>

                        {showApproaches && (
                            <div className="space-y-4 mb-8 animate-in slide-in-from-top-4 duration-300">
                                <h4 className="text-[10px] font-jakarta font-bold uppercase tracking-widest text-[#ff2e63]">Abordagens Coringa</h4>
                                {approaches.map((app, idx) => (
                                    <div key={idx} className="bg-white/5 border border-white/5 rounded-2xl p-4 group/copy relative">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[9px] font-jakarta font-extrabold text-zinc-500 uppercase tracking-tighter">{app.title.split('(')[1].replace(')', '')}</span>
                                            <button onClick={() => handleCopy(app.content, idx)} className={`p-2 rounded-xl transition-all ${copiedIndex === idx ? 'bg-emerald-500/20 text-emerald-500' : 'hover:bg-white/10 text-zinc-400'}`}>
                                                {copiedIndex === idx ? <Check size={14} /> : <Copy size={14} />}
                                            </button>
                                        </div>
                                        <p className="text-[12px] text-zinc-300 font-jakarta leading-relaxed italic">{app.content}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="boltfy-actions">
                            <button
                                className={`btn-boltfy ${showApproaches ? 'bg-zinc-800 border border-white/10' : 'btn-primary-v2'}`}
                                onClick={() => setShowApproaches(!showApproaches)}
                            >
                                <MessageSquare size={16} strokeWidth={2.5} />
                                {showApproaches ? 'Ocultar Copys' : 'Gerar Abordagem'}
                            </button>
                            <a
                                href={selectedGroup.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-boltfy btn-outline-v2 text-center"
                            >
                                Ir para o grupo
                                <ArrowLeft size={14} strokeWidth={3} className="rotate-180" />
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <div className="text-zinc-800 text-[10px] font-black uppercase tracking-[0.5em] mt-auto py-10 font-tech">
                Boltfy Radar • V2 Command Edition
            </div>
        </div>
    );
};

export default RadarView;
