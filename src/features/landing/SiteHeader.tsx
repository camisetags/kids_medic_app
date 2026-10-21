import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Brand } from '../../ui/Brand';
import { ActionLink } from '../../ui/Button';
export function SiteHeader() {
  return <header className="site-header container"><Brand /><nav aria-label="Navegação principal"><Link className="text-link desktop-link" to="/familia/fases">O acompanhamento</Link><Link className="text-link" to="/familia">Área da família <ArrowUpRight size={15} /></Link><ActionLink to="/agendar">Agendar consulta <ArrowUpRight size={16} /></ActionLink></nav></header>;
}
