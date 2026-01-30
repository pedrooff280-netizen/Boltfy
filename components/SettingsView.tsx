import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, Key, ChevronRight, Save, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../src/lib/supabase';

const SettingsView: React.FC = () => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setEmail(user.email || '');
                setFullName(user.user_metadata?.full_name || '');
            }
            setIsLoading(false);
        };
        fetchUser();
    }, []);

    const handleSaveChanges = async () => {
        setIsSaving(true);
        setMessage(null);
        try {
            const { error } = await supabase.auth.updateUser({
                data: { full_name: fullName }
            });
            if (error) throw error;
            setMessage({ type: 'success', text: 'Alterações salvas com sucesso!' });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Erro ao salvar alterações.' });
        } finally {
            setIsSaving(false);
        }
    };

    const handlePasswordReset = async () => {
        setIsResetting(true);
        setMessage(null);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin
            });
            if (error) throw error;
            setMessage({ type: 'success', text: 'E-mail de redefinição enviado!' });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Erro ao enviar e-mail.' });
        } finally {
            setIsResetting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-wine-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-10 text-center md:text-left">
                <h1 className="text-3xl font-black text-white tracking-tight mb-2">Configurações da Conta</h1>
                <p className="text-slate-400 font-medium tracking-wide">Gerencie seus dados pessoais e preferências de segurança.</p>
            </div>

            <div className="bg-slate-950/60 backdrop-blur-xl border border-white/5 rounded-[32px] overflow-hidden shadow-2xl">
                <div className="p-8 md:p-12 space-y-10">

                    {/* Status Message */}
                    {message && (
                        <div className={`p-4 rounded-2xl flex items-center gap-3 border animate-in slide-in-from-top-2 ${message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                            }`}>
                            {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                            <span className="text-sm font-bold">{message.text}</span>
                        </div>
                    )}

                    {/* Dados Pessoais */}
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-wine-300 uppercase tracking-[0.2em] ml-1">Nome Completo</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-wine-400/60 group-focus-within:text-wine-400 transition-colors" />
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Seu nome completo"
                                        className="w-full bg-black/40 border border-slate-800/40 rounded-2xl px-12 py-4 text-sm text-slate-200 outline-none focus:border-wine-500/60 focus:ring-4 focus:ring-wine-500/10 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-wine-300 uppercase tracking-[0.2em] ml-1">E-mail</label>
                                <div className="relative group grayscale opacity-70">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        disabled
                                        className="w-full bg-black/20 border border-slate-800/20 rounded-2xl px-12 py-4 text-sm text-slate-400 cursor-not-allowed outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-slate-800/30 to-transparent" />

                    {/* Segurança */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Shield className="w-5 h-5 text-wine-500" />
                            Segurança & Acesso
                        </h3>

                        <div className="bg-black/40 border border-slate-800/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="space-y-1 flex-1">
                                <p className="text-sm font-bold text-white">Senha</p>
                                <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                                    Por segurança, enviaremos um link de confirmação para o seu e-mail cadastrado. Você poderá escolher sua nova senha através dele.
                                </p>
                            </div>
                            <button
                                onClick={handlePasswordReset}
                                disabled={isResetting}
                                className="whitespace-nowrap px-6 py-3 bg-[#1e293b] border border-slate-700/50 hover:bg-[#2d3a4f] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 group disabled:opacity-50"
                            >
                                {isResetting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Key className="w-4 h-4 group-hover:rotate-12 transition-transform" />}
                                Redefinir Senha
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-8 bg-slate-900/20 border-t border-slate-800/30 flex justify-end">
                    <button
                        onClick={handleSaveChanges}
                        disabled={isSaving}
                        className="px-8 py-4 bg-white text-[#040822] font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3 group disabled:opacity-50"
                    >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin text-wine-600" /> : <Save className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />}
                        Salvar Alterações
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsView;
