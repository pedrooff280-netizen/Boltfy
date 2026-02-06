import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Globe,
  Link as LinkIcon,
  Instagram,
  Phone,
  Mail,
  Star,
  ChevronDown,
  Zap,
  Loader2,
  CheckCircle2,
  MapPin,
  ExternalLink,
  ArrowRight,
  Clock,
  Navigation,
  Cpu
} from 'lucide-react';

declare global {
  interface Window {
    google: any;
  }
}

interface Lead {
  id: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  rating: number | 'N/A';
  user_ratings_total: number;
  maps_url: string;
  isOpen: boolean | null;
  location: {
    lat: number;
    lng: number;
  };
}

const ProspectorView: React.FC = () => {
  // Estados do Formulário
  const [niche, setNiche] = useState('');
  const [location, setLocation] = useState('');
  const [stars, setStars] = useState(3);
  const [maxReviews, setMaxReviews] = useState('Qualquer');
  const [searchMode, setSearchMode] = useState<'all' | 'no-site'>('all');
  const [channels, setChannels] = useState({
    instagram: false,
    phone: true,
    email: false
  });

  // Estados de UI e Resultados
  const [isSearching, setIsSearching] = useState(false);
  const [showMaxReviewsDropdown, setShowMaxReviewsDropdown] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const toggleChannel = (channel: keyof typeof channels) => {
    setChannels(prev => ({ ...prev, [channel]: !prev[channel] }));
  };

  const selectAllChannels = () => {
    setChannels({
      instagram: true,
      phone: true,
      email: true
    });
  };

  const handleSearch = async (simulated: boolean = false) => {
    console.log(`>>> [DIAGNÓSTICO] Iniciando busca (Simulado: ${simulated})...`);

    if (!niche || !location) {
      alert("Certifique-se de preencher Nicho e Localização.");
      return;
    }

    setIsSearching(true);
    setLeads([]);
    setHasSearched(true);
    setSelectedLead(null);

    // MODO SIMULADO
    if (simulated) {
      setTimeout(() => {
        const mockLeads: Lead[] = [
          {
            id: `mock-1-${niche}`,
            name: `${niche} Premium - ${location}`,
            address: `Rua Augusta, 1234, ${location}`,
            phone: '(11) 98888-7777',
            website: 'https://exemplo.com/premium',
            rating: 4.9,
            user_ratings_total: 856,
            maps_url: 'https://maps.google.com',
            isOpen: true,
            location: { lat: -23.5594, lng: -46.6583 }
          },
          {
            id: `mock-2-${niche}`,
            name: `${niche} Central`,
            address: `Av. Paulista, 500, ${location}`,
            phone: '(11) 97777-6666',
            website: 'Sem Site',
            rating: 4.2,
            user_ratings_total: 120,
            maps_url: 'https://maps.google.com',
            isOpen: false,
            location: { lat: -23.5615, lng: -46.6559 }
          },
          {
            id: `mock-3-${niche}`,
            name: `Elite ${niche} & Co`,
            address: `Alameda Santos, 1000, ${location}`,
            phone: '(11) 96666-5555',
            website: 'https://exemplo.com/elite',
            rating: 3.9,
            user_ratings_total: 45,
            maps_url: 'https://maps.google.com',
            isOpen: true,
            location: { lat: -23.5641, lng: -46.6521 }
          }
        ];
        setLeads(mockLeads);
        setSelectedLead(mockLeads[0]);
        setIsSearching(false);
      }, 1000);
      return;
    }

    const safetyTimeout = setTimeout(() => {
      if (isSearching) {
        setIsSearching(false);
        alert("O Google não respondeu (Timeout). Verifique se o seu projeto tem um Cartão de Crédito válido no Faturamento do Google Cloud!");
      }
    }, 25000);

    try {
      console.log(">>> [STP 1] Carregando Biblioteca Places v3...");
      const { Place, SearchByTextRankPreference } = await window.google.maps.importLibrary("places") as any;
      console.log(">>> [STP 2] Biblioteca carregada.");

      const request = {
        textQuery: `${niche} em ${location}`,
        fields: ['id', 'displayName', 'formattedAddress', 'rating', 'userRatingCount', 'websiteUri', 'nationalPhoneNumber', 'googleMapsUri', 'location'],
        maxResultCount: 15,
        rankPreference: SearchByTextRankPreference.RELEVANCE
      };

      try {
        console.log(">>> [STP 3] Disparando searchByText...");
        const { places } = await Place.searchByText(request);
        console.log(">>> [STP 4] Resultados:", places?.length || 0);

        if (!places || places.length === 0) {
          clearTimeout(safetyTimeout);
          setIsSearching(false);
          alert("Nenhum resultado real encontrado para essa busca.");
          return;
        }

        const processedLeads: Lead[] = places.map((place: any) => ({
          id: place.id,
          name: place.displayName?.text || place.displayName || '',
          address: place.formattedAddress || '',
          phone: place.nationalPhoneNumber || 'Sem Telefone',
          website: place.websiteUri || 'Sem Site',
          rating: place.rating || 'N/A',
          user_ratings_total: place.userRatingCount || 0,
          maps_url: place.googleMapsUri,
          isOpen: null,
          location: {
            lat: place.location?.lat() || 0,
            lng: place.location?.lng() || 0
          }
        }));

        const filtered = processedLeads.filter(lead => {
          const ratingNum = typeof lead.rating === 'number' ? lead.rating : 0;
          const meetsRating = ratingNum >= stars;
          let meetsMaxReviews = true;
          if (maxReviews !== 'Qualquer') {
            const max = parseInt(maxReviews.replace('Até ', ''));
            meetsMaxReviews = (lead.user_ratings_total || 0) <= max;
          }
          const meetsSiteMode = searchMode === 'no-site' ? lead.website === 'Sem Site' : true;
          return meetsRating && meetsMaxReviews && meetsSiteMode;
        });

        clearTimeout(safetyTimeout);
        setLeads(filtered);
        if (filtered.length > 0) {
          setSelectedLead(filtered[0]);
        } else {
          alert("Empresas encontradas no Google, mas filtradas por estrelas/avaliações.");
        }
        setIsSearching(false);

      } catch (searchError: any) {
        clearTimeout(safetyTimeout);
        setIsSearching(false);
        console.error(">>> [ERRO V3]", searchError);

        // Mensagem definitiva para o usuário
        alert(`ALERTA GOOGLE: ${searchError.message || 'Ativação Pendente'}\n\nVocê precisa ativar especificamente a "PLACES API (NEW)" no seu projeto atual do Google Cloud.\n\nAtive aqui: https://console.cloud.google.com/google/maps-apis/library/places.googleapis.com`);
      }
    } catch (error: any) {
      clearTimeout(safetyTimeout);
      setIsSearching(false);
      console.error(">>> [EXCEÇÃO CRÍTICA]", error);
      alert("Erro ao carregar o SDK do Google: " + error.message);
    }
  };

  const reviewOptions = ['Qualquer', 'Até 10', 'Até 50', 'Até 100', 'Até 500'];

  return (
    <div className="max-w-7xl mx-auto py-4 md:py-6 animate-in fade-in duration-700 space-y-6 md:space-y-8">
      {/* Header & Formulário */}
      <div className="bg-slate-950/80 backdrop-blur-2xl border border-slate-800/40 rounded-[24px] md:rounded-[40px] p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <span className="text-[10px] font-bold text-slate-500 tracking-[0.3em] uppercase block mb-1">Boltfy intelligence</span>
            <h1 className="text-3xl font-black text-white tracking-tight">Prospecção Premium</h1>
          </div>

          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="Nicho (ex: Pizzaria)"
                className="w-full bg-black/40 border border-slate-800/40 rounded-2xl py-3 px-5 text-white outline-none focus:border-wine-500/50 transition-all text-sm pl-12"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            </div>

            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Localização (ex: Lisboa)"
                className="w-full bg-[#040822] border border-blue-800/40 rounded-2xl py-3 px-5 text-white outline-none focus:border-wine-500/50 transition-all text-sm pl-12"
              />
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            </div>

            <div className="flex gap-2">
              <button
                disabled={isSearching}
                onClick={() => handleSearch(false)}
                className={`bg-wine-600 hover:bg-wine-500 text-white px-8 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(225,29,72,0.3)] ${isSearching ? 'opacity-50 cursor-not-allowed' : ''}`}
                title="Buscar dados REAIS do Google (Requer API ativada)"
              >
                {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 fill-current" />}
                {isSearching ? 'Buscando...' : 'Prospectar'}
              </button>

              <button
                disabled={isSearching}
                onClick={() => handleSearch(true)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-6 py-3 rounded-2xl font-medium text-sm transition-all flex items-center gap-2 border border-white/5"
                title="Modo Simulação (Para testar o sistema agora)"
              >
                <Cpu className="w-4 h-4" />
                <span>Simular</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filtros compactos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/5">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Estrelas Mínimas</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-3.5 h-3.5 cursor-pointer transition-all ${s <= stars ? 'text-wine-500 fill-wine-500' : 'text-slate-800'}`}
                  onClick={() => setStars(s)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Máx Avaliações</span>
            <div className="relative">
              <div
                onClick={() => setShowMaxReviewsDropdown(!showMaxReviewsDropdown)}
                className="flex items-center justify-between text-xs text-slate-300 cursor-pointer hover:text-white transition-colors"
              >
                {maxReviews} <ChevronDown className="w-3 h-3" />
              </div>
              {showMaxReviewsDropdown && (
                <div className="absolute top-full left-0 mt-2 w-32 bg-[#0c0f1d] border border-white/10 rounded-xl overflow-hidden z-50">
                  {reviewOptions.map(opt => (
                    <div
                      key={opt}
                      onClick={() => { setMaxReviews(opt); setShowMaxReviewsDropdown(false); }}
                      className="px-4 py-2 text-[10px] hover:bg-white/5 cursor-pointer"
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Modo</span>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="radio" checked={searchMode === 'all'} onChange={() => setSearchMode('all')} className="hidden" />
                <div className={`w-3 h-3 rounded-full border border-slate-800 flex items-center justify-center ${searchMode === 'all' ? 'bg-wine-500' : ''}`} />
                <span className="text-[10px] text-slate-400 group-hover:text-white">Qualquer</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="radio" checked={searchMode === 'no-site'} onChange={() => setSearchMode('no-site')} className="hidden" />
                <div className={`w-3 h-3 rounded-full border border-slate-800 flex items-center justify-center ${searchMode === 'no-site' ? 'bg-wine-400' : ''}`} />
                <span className="text-[10px] text-slate-400 group-hover:text-white">Sem Site</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Canais</span>
            <div className="flex gap-3">
              <Instagram className={`w-3.5 h-3.5 cursor-pointer ${channels.instagram ? 'text-pink-500' : 'text-slate-800'}`} onClick={() => toggleChannel('instagram')} />
              <Phone className={`w-3.5 h-3.5 cursor-pointer ${channels.phone ? 'text-cyan-400' : 'text-slate-800'}`} onClick={() => toggleChannel('phone')} />
              <Mail className={`w-3.5 h-3.5 cursor-pointer ${channels.email ? 'text-blue-500' : 'text-slate-800'}`} onClick={() => toggleChannel('email')} />
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Resultados & Mapa */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 overflow-visible">
        {/* Lado Esquerdo: Cards */}
        <div className="lg:col-span-8 space-y-4 md:space-y-6 order-2 lg:order-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leads.length > 0 ? (
              leads.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`bg-slate-950/60 border rounded-3xl p-6 transition-all cursor-pointer group relative overflow-hidden ${selectedLead?.id === lead.id ? 'border-wine-500 ring-1 ring-wine-500' : 'border-slate-800/40 hover:border-wine-500/30'}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-slate-800 rounded-xl text-slate-400">
                      <Navigation className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-white text-sm line-clamp-1">{lead.name}</h4>
                        <div className={`text-[8px] font-black px-1.5 py-0.5 rounded ${lead.isOpen ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                          {lead.isOpen === null ? 'DESCONHECIDO' : (lead.isOpen ? 'ABERTO' : 'FECHADO')}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className={`w-3 h-3 ${s <= (typeof lead.rating === 'number' ? lead.rating : 0) ? 'text-wine-500 fill-wine-500' : 'text-slate-800'}`} />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold">({lead.user_ratings_total} reviews)</span>
                  </div>

                  <p className="text-[10px] text-slate-400 mb-6 group-hover:text-slate-300 transition-colors">Clique para ver mais detalhes</p>

                  <div className="flex gap-2">
                    <div className="p-2 bg-white/5 rounded-lg text-slate-500 hover:text-pink-500 transition-colors">
                      <Instagram className="w-3.5 h-3.5" />
                    </div>
                    <div className="p-2 bg-white/5 rounded-lg text-slate-500 hover:text-cyan-400 transition-colors">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div className="p-2 bg-white/5 rounded-lg text-slate-500 hover:text-blue-500 transition-colors">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <a href={lead.maps_url} target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-lg text-slate-500 hover:text-white transition-colors">
                      <MapPin className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))
            ) : isSearching ? (
              [1, 2, 3, 4].map(i => (
                <div key={i} className="bg-slate-950/60 border border-slate-800/40 rounded-3xl p-6 h-40 animate-pulse" />
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-[#050a18]/40 border border-white/5 rounded-[40px]">
                <Search className="w-12 h-12 text-slate-800 mx-auto mb-4" />
                <h3 className="text-white font-bold">Nenhum lead encontrado</h3>
                <p className="text-slate-500 text-xs">Ajuste os filtros e clique em Prospectar.</p>
              </div>
            )}
          </div>
        </div>

        {/* Lado Direito: Detalhe & Mapa */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit order-1 lg:order-2">
          <div className="bg-slate-950/80 backdrop-blur-2xl border border-slate-800/40 rounded-2xl md:rounded-[32px] overflow-hidden shadow-2xl flex flex-col">
            {selectedLead ? (
              <>
                <div className="h-64 relative bg-slate-900">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={selectedLead.id.startsWith('mock-')
                      ? `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(selectedLead.name + ' ' + selectedLead.address)}`
                      : `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=place_id:${selectedLead.id}`
                    }
                  />
                  <div className="absolute top-4 left-4">
                    <div className={`px-3 py-1 rounded-full text-[10px] font-black border ${selectedLead.isOpen ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-rose-500/10 border-rose-500/20 text-rose-500'}`}>
                      {selectedLead.isOpen === null ? 'STATUS INDISPONÍVEL' : (selectedLead.isOpen ? 'ABERTO AGORA' : 'FECHADO NO MOMENTO')}
                    </div>
                  </div>
                </div>
                <div className="p-8 space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">{selectedLead.name}</h2>
                    <p className="text-xs text-slate-400 leading-relaxed">{selectedLead.address}</p>
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="flex-1 bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-white/10 transition-all text-slate-400 hover:text-white"
                    >
                      <Phone className="w-5 h-5" />
                      <span className="text-[10px] font-bold">Ligar</span>
                    </a>
                    <a
                      href={selectedLead.website !== 'Sem Site' ? (selectedLead.website.startsWith('http') ? selectedLead.website : `https://${selectedLead.website}`) : '#'}
                      target={selectedLead.website !== 'Sem Site' ? "_blank" : "_self"}
                      rel="noreferrer"
                      className={`flex-1 bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-white/10 transition-all text-slate-400 hover:text-white ${selectedLead.website === 'Sem Site' ? 'opacity-30 cursor-not-allowed' : ''}`}
                    >
                      <Globe className="w-5 h-5" />
                      <span className="text-[10px] font-bold">Site</span>
                    </a>
                  </div>

                  <button className="w-full bg-wine-600 hover:bg-wine-500 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg">
                    Adicionar aos Favoritos
                  </button>
                </div>
              </>
            ) : (
              <div className="p-20 text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-slate-800 rounded-3xl flex items-center justify-center text-slate-600">
                  <MapPin className="w-8 h-8" />
                </div>
                <p className="text-slate-500 text-xs font-medium">Selecione uma empresa para<br />visualizar o mapa e detalhes.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProspectorView;
