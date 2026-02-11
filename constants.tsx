
import {
  LayoutDashboard,
  Library,
  Monitor,
  Users,
  Bot,
  FileText,
  GraduationCap,
  HelpCircle,
  Settings,
  Binoculars,
  Radar
} from 'lucide-react';
import { NavItem, ResourceCardProps } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, section: 'principal' },
  { id: 'biblioteca', label: 'Biblioteca', icon: Library, section: 'principal' },
  { id: 'prospector', label: 'Prospector', icon: Users, section: 'vendas' },
  { id: 'iacopy', label: 'IA Copy', icon: Bot, section: 'vendas' },
  { id: 'radar', label: 'Radar', icon: Radar, section: 'vendas' },
  { id: 'estudos', label: 'Área de Estudos', icon: GraduationCap, section: 'suporte' },
  { id: 'ajuda', label: 'Ajuda', icon: HelpCircle, section: 'suporte' },
];

export const RESOURCE_CARDS: ResourceCardProps[] = [
  {
    title: 'Materializar SaaS',
    description: 'Transforme sua ideia de aplicativo em um prompt de desenvolvimento detalhado, pronto para ser implementado por uma IA.',
    badge: 'IA POWERED',
    icon: Monitor,
  },
  {
    title: 'Meus Projetos',
    description: 'Adicione novas funcionalidades, corrija bugs ou refine o design do seu SaaS. Todos os seus projetos salvos estão aqui.',
    badge: 'PROJETOS SALVOS',
    icon: LayoutDashboard,
  },
  {
    title: 'Prospector',
    description: 'Encontre e qualifique clientes em potencial.',
    icon: Binoculars,
  }
];
