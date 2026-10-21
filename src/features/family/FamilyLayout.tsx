import { Outlet, Link } from 'react-router-dom';
import { ArrowUpRight, Leaf } from 'lucide-react';
import { Brand } from '../../ui/Brand';
import { FamilyNavigation } from './FamilyNavigation';
import { useDemo } from '../../app/useDemo';
import { StatusMessage } from '../../ui/StatusMessage';
import { exampleChild } from '../../demo/seed';
import { ResetDemo } from './ResetDemo';
function FamilySidebar() {
  return <aside className="family-sidebar"><Brand /><span className="sidebar-label">Um espaço para a sua família</span><FamilyNavigation /><div className="sidebar-bottom"><Leaf size={21} /><p>O cuidado cresce<br /><em>junto com vocês.</em></p><Link to="/" className="text-link">Conhecer o consultório <ArrowUpRight size={14} /></Link></div></aside>;
}
function FamilyTopbar() {
  return <header className="family-topbar"><span>Área da família <i>/</i> <strong>{exampleChild.name}</strong></span><div><span className="profile-label">{exampleChild.guardian}<small>Responsável de exemplo</small></span><span className="avatar small">MA</span></div></header>;
}
export function FamilyLayout() {
  const { notice } = useDemo();
  return <div className="family-shell"><FamilySidebar /><div className="family-workspace"><FamilyTopbar /><main className="family-main" tabIndex={-1}><StatusMessage message={notice} /><Outlet /><ResetDemo /></main></div></div>;
}
