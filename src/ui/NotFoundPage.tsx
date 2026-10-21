import { SiteHeader } from '../features/landing/SiteHeader';
import { EmptyState } from './EmptyState';
import { ActionLink } from './Button';
export function NotFoundPage() {
  return <><SiteHeader /><main className="container booking-page" tabIndex={-1}><h1 className="sr-only">Página não encontrada</h1><EmptyState title="Vamos encontrar o caminho?" description="Esta página não faz parte da demonstração. Você pode voltar ao início ou acessar a área da família."><ActionLink to="/">Voltar ao início</ActionLink><ActionLink to="/familia" className="button-outline">Área da família</ActionLink></EmptyState></main></>;
}
