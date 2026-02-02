
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  section: 'principal' | 'vendas' | 'suporte';
}

export interface ResourceCardProps {
  title: string;
  description: string;
  badge?: string;
  status?: string;
  icon: LucideIcon;
}
