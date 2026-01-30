import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, ShieldAlert } from 'lucide-react';
import { supabase } from '../src/lib/supabase';

interface LoginViewProps {
  onLogin: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowError(false);
    setErrorMessage('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        // App.tsx auth state listener will handle the redirect, 
        // but we verify success here.
      }
    } catch (error: any) {
      setShowError(true);
      setErrorMessage(error.message || 'Falha na autenticação. Verifique seus dados.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden font-sans"
      style={{
        background: 'radial-gradient(circle at center, #9f1239 0%, #020617 45%, #000000 100%)'
      }}>

      {/* Detalhes de iluminação sutis para profundidade */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-wine-600/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-rose-500/20 blur-[120px] rounded-full" />
      </div>

      {/* Card Principal */}
      <div className="w-full max-w-4xl h-auto md:h-[560px] flex flex-col md:flex-row bg-slate-950/80 border border-wine-500/30 rounded-[40px] shadow-[0_0_80px_rgba(136,19,55,0.2)] overflow-hidden backdrop-blur-3xl z-10 relative">

        {/* Lado Esquerdo - Branding & Hero (CENTRALIZADO) */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-between items-center relative bg-gradient-to-b from-wine-900/20 via-transparent to-transparent text-center">

          <div className="space-y-10 flex flex-col items-center w-full">
            {/* Bloco de Marca em Destaque Centralizado */}
            <div className="relative group">
              {/* Brilho de Fundo do Logo (Halo) */}
              <div className="absolute -inset-8 bg-wine-500/15 blur-3xl rounded-full group-hover:bg-wine-500/25 transition-all duration-700 animate-pulse" />

              <div className="relative flex flex-col items-center gap-5">
                {/* Logo Icon Grande */}
                <div className="w-24 h-24 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 bg-transparent">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-full h-full drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Main Bolt Body - Vibrant Red */}
                    <path
                      d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                      fill="#ef4444"
                    />
                    {/* Tech Highlight for futuristic feel */}
                    <path
                      d="M13 3L12 11H20L13 3Z"
                      fill="white"
                      fillOpacity="0.2"
                    />
                    {/* Dark accents for depth as seen in the photo */}
                    <path
                      d="M11 21L12 13H4L11 21Z"
                      fill="black"
                      fillOpacity="0.2"
                    />
                  </svg>
                </div>

                {/* Logo Text - Atualizado para Boltfy */}
                <span className="text-4xl font-black text-white tracking-tighter">
                  Boltfy<span className="text-wine-500">.</span>
                </span>
              </div>
            </div>

            {/* Headline e Copy */}
            <div className="space-y-4 max-w-sm mx-auto">
              <h1 className="text-3xl md:text-4xl font-black text-white leading-[1.1] tracking-tight">
                Pare de planejar.<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-wine-400 to-wine-600">Comece a construir.</span>
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                Construa aplicações, automações e sistemas reais com um motor de IA feito para execução, velocidade e escala.
              </p>
            </div>
          </div>

          {/* Badge de Versão Centralizado */}
          <div className="mt-12 md:mt-0">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-wine-500 animate-pulse" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">CORE SYSTEM · V2.6</span>
            </div>
          </div>
        </div>

        {/* Lado Direito - Formulário de Login (COM VISIBILIDADE MELHORADA) */}
        <div className="w-full md:w-[42%] p-8 md:p-12 flex flex-col justify-center bg-black/60 backdrop-blur-2xl relative border-l border-wine-500/20">
          <div className="space-y-8">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white tracking-tight">Acesso ao Terminal</h2>
              <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">Chave de entrada pessoal</p>
            </div>

            {showError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 animate-in slide-in-from-top-2">
                <ShieldAlert className="w-4 h-4 text-red-500" />
                <span className="text-xs font-bold text-red-400">{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-wine-300 uppercase tracking-widest ml-1">E-mail de acesso</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-wine-400/60 group-focus-within:text-wine-400 transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full bg-black/40 border border-slate-800/40 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-100 outline-none focus:border-wine-500/60 focus:ring-4 focus:ring-wine-500/10 transition-all placeholder:text-slate-800 shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-wine-300 uppercase tracking-widest ml-1">Senha mestra</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-wine-400/60 group-focus-within:text-wine-400 transition-colors" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-black/40 border border-slate-800/40 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-100 outline-none focus:border-wine-500/60 focus:ring-4 focus:ring-wine-500/10 transition-all placeholder:text-slate-800 shadow-inner"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-5 bg-gradient-to-r from-wine-600 to-wine-500 hover:from-wine-500 hover:to-wine-400 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-[0_10px_30px_rgba(136,19,55,0.3)] flex items-center justify-center gap-3 group active:scale-[0.98] disabled:opacity-50 mt-4"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Iniciar Sessão
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-4 text-center">
              <button className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-wine-400 transition-colors">
                Esqueceu a senha? <span className="text-wine-500 ml-1">Recuperar acesso</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
