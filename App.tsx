
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import LibraryView from './components/LibraryView';
import CreateAppView from './components/CreateAppView';
import PromptResultView from './components/PromptResultView';
import ProspectorView from './components/ProspectorView';
import LoginView from './components/LoginView';
import IACopyView from './components/IACopyView';
import SettingsView from './components/SettingsView';
import HelpView from './components/HelpView';
import StudyAreaView from './components/StudyAreaView';
import CourseModulesView from './components/CourseModulesView';
import RadarView from './components/RadarView';
import ErrorToast from './components/ErrorToast';
import { supabase } from './src/lib/supabase';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Null for initial loading
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projectData, setProjectData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [projects, setProjects] = useState<any[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    console.log("App: Initializing auth...");

    // 1. Initial manual check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        console.log("App: Session check complete", !!session);
        setIsAuthenticated(!!session);
        setIsInitialLoading(false);
      }
    }).catch(err => {
      console.error("App: Session check failed", err);
      if (mounted) {
        setIsAuthenticated(false);
        setIsInitialLoading(false);
      }
    });

    // 2. Auth state subscription
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (mounted) {
        console.log(`App: Auth State Change [${event}]`, !!session);
        // Debounce if needed, but for now simple check
        setIsAuthenticated(!!session);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const fetchProjects = async () => {
    if (!isAuthenticated) return;

    console.log("App: Fetching projects...");
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setProjects(data);
    } catch (error) {
      console.error('App: Error fetching projects:', error);
    }
  };

  // Only fetch initial projects once per login
  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
    }
  }, [isAuthenticated]);

  const handleFinishProject = (data: any) => {
    setProjectData(data);
    setActiveTab('prompt-result');
  };

  const handleOpenProject = (project: any) => {
    if (project.project_type === 'mvp' && project.project_data) {
      setProjectData(project.project_data);
    } else {
      setProjectData(project);
    }
    setActiveTab('prompt-result');
  };

  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView
          projectCount={projects.length}
          onCreateApp={() => setActiveTab('create-app')}
          onOpenProspector={() => setActiveTab('prospector')}
        />;
      case 'biblioteca':
        return <LibraryView
          projects={projects}
          onCreateApp={() => setActiveTab('create-app')}
          onOpenProject={handleOpenProject}
          onDeleteProject={handleDeleteProject}
        />;
      case 'prospector':
        return <ProspectorView />;
      case 'iacopy':
        return <IACopyView />;
      case 'radar':
        return <RadarView />;
      case 'settings':
        return <SettingsView />;
      case 'ajuda':
        return <HelpView />;
      case 'estudos':
        return <StudyAreaView onNavigateToCourse={() => setActiveTab('course-modules')} />;
      case 'course-modules':
        return <CourseModulesView onBack={() => setActiveTab('estudos')} />;
      case 'create-app':
        return <CreateAppView
          onBack={() => setActiveTab('dashboard')}
          onFinish={handleFinishProject}
        />;
      case 'prompt-result':
        return <PromptResultView
          data={projectData}
          onReset={() => setActiveTab('create-app')}
          onGoHome={() => setActiveTab('dashboard')}
        />;
      default:
        return <DashboardView
          projectCount={projects.length}
          onCreateApp={() => setActiveTab('create-app')}
          onOpenProspector={() => setActiveTab('prospector')}
        />;
    }
  };

  // Show loading state or login
  if (isInitialLoading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-wine-500">
      <div className="w-8 h-8 border-4 border-wine-500/30 border-t-wine-500 rounded-full animate-spin" />
    </div>;
  }

  if (!isAuthenticated) {
    return <LoginView onLogin={() => { }} />;
  }

  return (
    <div className="flex flex-col min-h-screen text-slate-100 antialiased">
      {/* Barra de Navegação Superior */}
      {activeTab !== 'prompt-result' && (
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      <main className={`flex-1 flex flex-col min-w-0 ${activeTab !== 'prompt-result' ? 'pt-20' : 'pt-0'}`}>
        {(activeTab !== 'create-app' && activeTab !== 'prompt-result' && activeTab !== 'prospector' && activeTab !== 'iacopy' && activeTab !== 'estudos' && activeTab !== 'radar') && <Header />}

        <div className={`${activeTab !== 'prompt-result' ? 'px-4 md:px-8 pb-10' : ''}`}>
          {renderContent()}
        </div>
      </main>

      {/* Notificações Globais */}
      {error && (
        <ErrorToast
          message={error}
          onClose={() => setError(null)}
        />
      )}

      {/* Acentos de fundo decorativos */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-wine-600/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none z-0" />
      <div className="fixed bottom-0 left-1/2 w-[300px] h-[300px] bg-wine-900/5 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none z-0" />
    </div>
  );
};

export default App;
