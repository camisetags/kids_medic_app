import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Heading } from '../../ui/Heading';
import { ActionLink } from '../../ui/Button';
import { CareLine } from '../../ui/CareLine';
import { ChildCard } from './ChildCard';
import { NextAppointment } from './NextAppointment';
import { NotesPreview } from './NotesPreview';
import { exampleChild } from '../../demo/seed';
function FamilyCareLine() {
  return <section className="family-care-line"><span className="eyebrow"><Sparkles size={14} />Uma linha de cuidado, muitos encontros</span><CareLine compact /><p>Conteúdo ilustrativo. O acompanhamento clínico é definido com a médica.</p></section>;
}
export function OverviewPage() {
  return <><Heading eyebrow="Bom ter vocês por aqui" title={`Olá, ${exampleChild.guardian}.`} description="Cada descoberta merece um lugar. Acompanhe os próximos passos da Clara."><ActionLink to="/agendar">Agendar consulta <ArrowUpRight size={16} /></ActionLink></Heading><div className="overview-grid"><ChildCard /><NextAppointment /></div><NotesPreview /><FamilyCareLine /></>;
}
