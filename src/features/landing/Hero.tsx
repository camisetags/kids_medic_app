import { ArrowRight, Heart, CalendarDays } from 'lucide-react';
import { ActionLink } from '../../ui/Button';
import { formatDate, getDemoDays, isWeekday } from '../../demo/dates';
function HeroCopy() {
  return <div className="hero-copy"><span className="eyebrow"><span className="small-dot" />Pediatria, com presença</span>
    <h1>Crescer é uma<br />descoberta.<br /><em>Cuidar também.</em></h1><p>Um cuidado que acompanha cada fase da infância. E um espaço para ter tudo por perto, de uma consulta à próxima descoberta.</p>
    <div className="hero-actions"><ActionLink to="/agendar">Agendar uma consulta <ArrowRight size={18} /></ActionLink><ActionLink to="/familia" className="button-outline">Explorar demonstração</ActionLink></div>
    <div className="hero-footnote"><Heart size={16} strokeWidth={1.5} /><span>Para a criança. Para quem cuida.</span></div></div>;
}
function HeroVisit() {
  const date = getDemoDays(new Date()).filter(isWeekday)[3];
  return <div className="hero-visit"><span className="soft-icon"><CalendarDays size={20} /></span><div><small>Uma próxima descoberta</small><strong>Consulta de acompanhamento</strong><span>{formatDate(date)} · 10:00 <i>Exemplo</i></span></div></div>;
}
function HeroArt() {
  return <div className="hero-art"><div className="art-top-label">O cuidado cresce junto.</div><img className="care-illustration" src={`${import.meta.env.BASE_URL}art/care-journey.svg`} width="570" height="590" alt="Ilustração de uma mãe acolhendo sua criança entre folhas e formas orgânicas" /><div className="art-label"><Heart size={17} /><span>Pequenos passos.<br /><strong>Grandes descobertas.</strong></span></div><HeroVisit /></div>;
}
export function Hero() {
  return <section className="hero container" aria-label="Apresentação"><HeroCopy /><HeroArt /></section>;
}
