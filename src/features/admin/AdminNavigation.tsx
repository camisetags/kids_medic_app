import { NavLink } from 'react-router-dom';
import { CalendarDays, UsersRound } from 'lucide-react';
export function AdminNavigation() {
  return <nav className="family-navigation admin-navigation" aria-label="Admin"><NavLink end to="/admin"><CalendarDays size={20} /><span>Agenda</span></NavLink><NavLink to="/admin/criancas"><UsersRound size={20} /><span>Crianças</span></NavLink></nav>;
}
