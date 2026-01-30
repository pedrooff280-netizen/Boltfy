import React, { useState } from 'react';
import { Search, Plus, HardDrive, Clock, Calendar, Box, GripHorizontal, AlignJustify, Trash2, Edit2, Loader2 } from 'lucide-react';
import { supabase } from '../src/lib/supabase';

interface LibraryViewProps {
  onCreateApp: () => void;
  onOpenProject: (project: any) => void;
  projects: any[];
  onDeleteProject?: (id: string) => void; // New prop
}

const LibraryView: React.FC<LibraryViewProps> = ({ onCreateApp, onOpenProject, projects, onDeleteProject }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Filter projects by search
  const filteredProjects = projects.filter(p =>
    (p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (p.segment && p.segment.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!window.confirm('Tem certeza que deseja excluir este projeto?')) return;

    setIsDeleting(id);
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      if (onDeleteProject) onDeleteProject(id);
    } catch (error) {
      console.error('Erro ao deletar:', error);
      alert('Erro ao excluir projeto.');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-2 fade-in duration-300 ease-out">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Minha Biblioteca</h1>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">
            Selecione um projeto para visualizar os scripts ou criar novos.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-wine-400 transition-colors" />
          <input
            type="text"
            placeholder="Buscar projetos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800/30 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-300 placeholder:text-slate-600 outline-none focus:border-wine-500/50 transition-all"
          />
        </div>

        {/* Sort/Filter Actions */}
        <button className="flex items-center gap-2 px-4 py-3 bg-slate-950 border border-slate-800/30 rounded-xl text-slate-400 text-xs font-bold uppercase hover:bg-wine-900/20 hover:text-white transition-all">
          <AlignJustify className="w-4 h-4" />
          Ordenar
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {/* Create New Card */}
        <div
          onClick={onCreateApp}
          className="aspect-[4/3] rounded-3xl border border-wine-500/30 bg-slate-950/50 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-wine-900/10 hover:border-wine-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-wine-500/10 transition-all group relative overflow-hidden dashed-border"
        >
          <div className="absolute inset-0 bg-wine-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-16 h-16 rounded-full bg-wine-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <div className="text-center relative z-10">
            <h3 className="text-lg font-bold text-white mb-1">Novo Projeto de Copy</h3>
            <p className="text-xs text-wine-400 font-medium">Inicie uma nova estratégia</p>
          </div>
        </div>

        {/* Project Cards */}
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => onOpenProject(project)}
            className="aspect-[4/3] bg-slate-950 border border-slate-800/30 rounded-3xl p-6 flex flex-col justify-between group hover:border-wine-500/50 hover:shadow-2xl hover:shadow-wine-900/20 transition-all cursor-pointer relative overflow-hidden"
          >
            {/* Header Card */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{project.name || 'Sem Nome'}</h3>
                <div className="flex gap-2 items-center">
                  <div className={`w-8 h-1 rounded-full ${project.project_type === 'mvp' ? 'bg-purple-600' : 'bg-wine-600'}`} />
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{project.project_type || 'copy'}</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-wine-900/30 border border-wine-500/20 text-[10px] font-bold text-wine-300 uppercase tracking-wider line-clamp-1 max-w-[100px] truncate">
                {project.segment || (project.project_type === 'mvp' ? 'SaaS' : 'Geral')}
              </span>
            </div>

            {/* Metadata Grid */}
            <div className="space-y-3">

              {/* Hook Preview */}
              <div className="flex items-center justify-between group/row">
                <div className="flex items-center gap-2 text-slate-500">
                  <Box className={`w-3.5 h-3.5 ${project.project_type === 'mvp' ? 'text-purple-500' : 'text-orange-500'}`} />
                  <span className="text-[10px] font-bold uppercase tracking-wider ">{project.project_type === 'mvp' ? 'Destaque:' : 'Gancho:'}</span>
                </div>
                <span className="text-xs text-slate-300 font-medium truncate max-w-[120px]">
                  {project.project_type === 'mvp' ? (project.project_data?.appPain || 'MVP') : (project.strategy?.hook ? 'Definido' : 'Pendente')}
                </span>
              </div>

              {/* Created */}
              <div className="flex items-center justify-between group/row">
                <div className="flex items-center gap-2 text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-wine-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Criado em:</span>
                </div>
                <span className="text-xs text-slate-300 font-medium">
                  {new Date(project.created_at).toLocaleDateString()}
                </span>
              </div>

            </div>

            {/* Actions Footer */}
            <div className="pt-4 mt-auto flex justify-end gap-3 border-t border-white/5 opacity-60 group-hover:opacity-100 transition-opacity">
              <button className="text-xs font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                <Edit2 className="w-3 h-3" /> Editar
              </button>
              <button
                onClick={(e) => handleDelete(e, project.id)}
                disabled={isDeleting === project.id}
                className="text-xs font-bold text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1"
              >
                {isDeleting === project.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                Excluir
              </button>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default LibraryView;
