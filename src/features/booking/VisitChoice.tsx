import { Baby, Heart, Check } from 'lucide-react';
import type { BookingModel } from './useBooking';
import { Button } from '../../ui/Button';
const visits = [{ kind: 'first' as const, title: 'Primeira consulta', description: 'Um primeiro encontro para conhecer a criança e conversar com a família.', icon: Baby }, { kind: 'follow-up' as const, title: 'Acompanhamento', description: 'Um novo encontro para acompanhar a fase e conversar sobre as descobertas.', icon: Heart }];
function VisitOption({ visit, model }: { visit: typeof visits[number]; model: BookingModel }) {
  const selected = model.input.kind === visit.kind;
  return <button className={`selection-card ${selected ? 'selected' : ''}`} aria-pressed={selected} onClick={() => model.change({ kind: visit.kind })}><span className="soft-icon"><visit.icon size={24} strokeWidth={1.4} /></span><span className="selection-copy"><strong>{visit.title}</strong><small>{visit.description}</small></span><span className="selection-check">{selected && <Check size={14} />}</span></button>;
}
export function VisitChoice({ model }: { model: BookingModel }) {
  return <section className="panel booking-panel"><span className="eyebrow">Primeiro, vamos escolher</span><h2>Como podemos acompanhar?</h2><p>Selecione o tipo de encontro.</p><div className="visit-options">{visits.map((visit) => <VisitOption key={visit.kind} visit={visit} model={model} />)}</div><div className="booking-actions"><span>01 de 03 etapas</span><Button onClick={() => model.setStep(1)}>Continuar</Button></div></section>;
}
