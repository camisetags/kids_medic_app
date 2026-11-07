import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Brand } from '../ui/Brand';
import { FamilyNavigation } from '../features/family/FamilyNavigation';
import { useFamily } from './useFamily';
import { useDemo } from './useDemo';
import { StatusMessage } from '../ui/StatusMessage';
function AppSidebar() {
  return <aside className="family-sidebar"><Brand /><span className="sidebar-label">Área da família</span><FamilyNavigation /><Link to="/" className="sidebar-site text-link">Site da médica <ArrowUpRight size={14} /></Link></aside>;
}
function AccountContext() {
  const { child } = useFamily();
  return <header className="family-topbar"><section className="account-context" aria-label="Conta de exemplo"><span className="account-example">Conta de exemplo</span><dl><div><dt>Responsável</dt><dd>{child.guardian}</dd></div><div><dt>Criança</dt><dd>{child.name} · {child.age}</dd></div></dl></section></header>;
}
export function AppLayout({ children, booking = false }: { children: ReactNode; booking?: boolean }) {
  const { notice } = useDemo();
  return <div className="app-shell family-shell"><AppSidebar /><div className="family-workspace"><AccountContext /><main className={`family-main${booking ? ' booking-main' : ''}`} tabIndex={-1}><StatusMessage message={notice} />{children}</main></div></div>;
}
