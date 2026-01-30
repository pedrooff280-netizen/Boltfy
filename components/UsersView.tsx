import React, { useState, useEffect } from 'react';
import { UserPlus, Mail, Lock, ShieldCheck, Loader2, CheckCircle2, AlertCircle, Trash2, Users } from 'lucide-react';
import { supabase } from '../src/lib/supabase';

const UsersView: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [members, setMembers] = useState<any[]>([]);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const fetchMembers = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('membros_autorizados')
                .select('*')
                .order('adicionado_em', { ascending: false });

            if (error) throw error;
            setMembers(data || []);
        } catch (error: any) {
            console.error('Erro ao buscar membros:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreating(true);
        setMessage(null);

        try {
            // Chamada para a Edge Function
            const { data, error } = await supabase.functions.invoke('admin-create-user', {
                body: { email, password }
            });

            if (error) throw error;
            if (data?.error) throw new Error(data.error);

            setMessage({ type: 'success', text: `Usuário ${email} criado e autorizado com sucesso!` });
            setEmail('');
            setPassword('');
            fetchMembers();
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Erro ao criar usuário.' });
        } finally {
            setIsCreating(false);
        }
    };

    const handleDeleteMember = async (memberEmail: string) => {
        if (!confirm(`Deseja remover ${memberEmail} da lista de autorizados? (Isso não deleta a conta auth, apenas remove da whitelist)`)) return;

        try {
            const { error } = await supabase
                .from('membros_autorizados')
                .delete()
                .eq('email', memberEmail);

            if (error) throw error;
            setMembers(prev => prev.filter(m => m.email !== memberEmail));
        } catch (error: any) {
            alert('Erro ao remover membro: ' + error.message);
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight mb-2">Gestão de Usuários</h1>
                    <p className="text-slate-400 font-medium tracking-wide">Adicione manualmente os clientes que compraram o Boltfy.</p>
                </div>
                <div className="flex items-center gap-2 bg-wine-500/10 border border-wine-500/20 px-4 py-2 rounded-2xl">
                    <Users className="w-4 h-4 text-wine-500" />
                    <span className="text-wine-400 text-xs font-black uppercase tracking-widest">{members.length} Autorizados</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Formulário de Criação */}
                <div className="lg:col-span-1">
                    <div className="bg-slate-950/60 backdrop-blur-xl border border-white/5 rounded-[32px] overflow-hidden shadow-2xl p-8 sticky top-24">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <UserPlus className="w-5 h-5 text-wine-500" />
                            Novo Cliente
                        </h3>

                        {message && (
                            <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 border animate-in slide-in-from-top-2 ${message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                                }`}>
                                {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                                <span className="text-xs font-bold leading-tight">{message.text}</span>
                            </div>
                        )}

                        <form onSubmit={handleCreateUser} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-wine-300 uppercase tracking-[0.2em] ml-1">E-mail</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-wine-400/60 group-focus-within:text-wine-400 transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="cliente@email.com"
                                        className="w-full bg-black/40 border border-slate-800/40 rounded-2xl pl-12 pr-4 py-4 text-sm text-slate-200 outline-none focus:border-wine-500/60 focus:ring-4 focus:ring-wine-500/10 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-wine-300 uppercase tracking-[0.2em] ml-1">Senha Provisória</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-wine-400/60 group-focus-within:text-wine-400 transition-colors" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-black/40 border border-slate-800/40 rounded-2xl pl-12 pr-4 py-4 text-sm text-slate-200 outline-none focus:border-wine-500/60 focus:ring-4 focus:ring-wine-500/10 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isCreating}
                                className="w-full py-4 mt-2 bg-gradient-to-r from-wine-600 to-wine-500 hover:from-wine-500 hover:to-wine-400 text-white font-black text-xs uppercase tracking-[0.2em] rounded-[18px] transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {isCreating ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                                Autorizar Cliente
                            </button>
                        </form>

                        <div className="mt-8 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                            <div className="flex gap-3">
                                <ShieldCheck className="w-5 h-5 text-wine-500 flex-shrink-0" />
                                <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                                    O cliente será criado no Auth e adicionado na whitelist. Ele poderá fazer login imediatamente com os dados fornecidos.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lista de Membros */}
                <div className="lg:col-span-2">
                    <div className="bg-slate-950/60 backdrop-blur-xl border border-white/5 rounded-[32px] overflow-hidden shadow-2xl">
                        <div className="p-8 border-b border-white/5">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Users className="w-5 h-5 text-wine-500" />
                                Membros Autorizados
                            </h3>
                        </div>

                        <div className="p-0">
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center py-20 gap-4">
                                    <Loader2 className="w-8 h-8 text-wine-500 animate-spin" />
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Sincronizando Whitelist...</p>
                                </div>
                            ) : members.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 px-8 text-center gap-4">
                                    <div className="w-16 h-16 rounded-3xl bg-slate-900 flex items-center justify-center border border-slate-800">
                                        <Users className="w-8 h-8 text-slate-700" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-white font-bold">Nenhum membro autorizado</p>
                                        <p className="text-slate-500 text-xs">Comece adicionando o primeiro cliente ao sistema.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="divide-y divide-white/5">
                                    {members.map((member) => (
                                        <div key={member.email} className="p-6 flex items-center justify-between group hover:bg-white/[0.02] transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-slate-700 group-hover:border-wine-500/30 transition-colors">
                                                    <Mail className="w-5 h-5 text-slate-400 group-hover:text-wine-400 transition-colors" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-200 mb-0.5">{member.email}</p>
                                                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                                                        Adicionado em {new Date(member.adicionado_em).toLocaleDateString('pt-BR')}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteMember(member.email)}
                                                className="p-2.5 rounded-xl hover:bg-red-500/10 text-slate-600 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersView;
