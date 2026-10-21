import { CalendarDays, LayoutDashboard, NotebookPen, Sprout } from 'lucide-react';
import { NavLink } from 'react-router-dom';
const links = [{ to: '/familia', name: 'Resumo', icon: LayoutDashboard }, { to: '/familia/consultas', name: 'Consultas', icon: CalendarDays }, { to: '/familia/fases', name: 'Acompanhamento', icon: Sprout }, { to: '/familia/anotacoes', name: 'Anotações', icon: NotebookPen }];
export function FamilyNavigation() {
  return <nav className="family-navigation" aria-label="Área da família">{links.map((item) => <NavLink end to={item.to} key={item.to} className={({ isActive }) => isActive ? 'active' : ''}><item.icon size={20} strokeWidth={1.6} /><span>{item.name}</span></NavLink>)}</nav>;
}
