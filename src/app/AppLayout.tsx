import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Brand } from '../ui/Brand';
import { AdminNavigation } from '../features/admin/AdminNavigation';
import { FamilyNavigation } from '../features/family/FamilyNavigation';
import { useFamily } from './useFamily';
import { useDemo } from './useDemo';
import { StatusMessage } from '../ui/StatusMessage';
function AppSidebar({ admin }: { admin: boolean }) {
  return <aside className="family-sidebar"><Brand /><span className="sidebar-label">{admin ? 'Consultório' : 'Área da família'}</span>{admin ? <AdminNavigation /> : <FamilyNavigation />}<div className="sidebar-tools"><Link to={admin ? '/familia' : '/admin'} className="text-link">{admin ? 'Área da família' : 'Admin da demonstração'} <ArrowUpRight size={14} /></Link><Link to="/" className="text-link sidebar-public">Site da médica <ArrowUpRight size={14} /></Link></div></aside>;
}
function AccountContext() {
  const { child } = useFamily();
  return <header className="family-topbar"><section className="account-context" aria-label="Conta de exemplo"><span className="account-example">Conta de exemplo</span><dl><div><dt>Responsável</dt><dd>{child.guardian}</dd></div><div><dt>Criança</dt><dd>{child.name} · {child.age}</dd></div></dl></section></header>;
}
export function AppLayout({ children, booking = false, admin = false }: { children: ReactNode; booking?: boolean; admin?: boolean }) {
  const { notice } = useDemo();
  return <div className={`app-shell family-shell${admin ? ' admin-shell' : ''}`}><AppSidebar admin={admin} /><div className="family-workspace">{admin ? <header className="family-topbar admin-topbar"><strong>Admin · demonstração</strong><span>Dados locais · acesso livre</span></header> : <AccountContext />}<main className={`family-main${booking ? ' booking-main' : ''}`} tabIndex={-1}><StatusMessage message={notice} />{children}</main></div></div>;
}
