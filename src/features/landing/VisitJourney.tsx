import { ArrowRight } from 'lucide-react';
import { ActionLink } from '../../ui/Button';
import { CareLine } from '../../ui/CareLine';
export function VisitJourney() {
  return <section className="journey-section container"><div className="journey-copy"><span className="eyebrow">Mais perto, entre os encontros</span><h2>O cuidado continua<br /><em>depois da consulta.</em></h2><p>Organize as próximas visitas, acompanhe a fase da criança e guarde o que quer conversar no próximo encontro.</p><ActionLink to="/familia" className="button-outline">Conhecer a área da família <ArrowRight size={17} /></ActionLink></div><div className="journey-line"><CareLine /></div></section>;
}
