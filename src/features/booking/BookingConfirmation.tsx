import { Check, ArrowRight } from 'lucide-react';
import { ActionLink } from '../../ui/Button';
import { exampleChild } from '../../demo/seed';
import { formatDate } from '../../demo/dates';
import { visitLabels } from '../../demo/appointments';
import type { BookingInput } from '../../demo/types';
function ConfirmedDetails({ input }: { input: BookingInput }) {
  return <div className="confirmed-details"><strong>{formatDate(input.date)} às {input.time}</strong><span>{visitLabels[input.kind]} · {exampleChild.name}</span><span>Dra. Dayse Mary</span></div>;
}
export function BookingConfirmation({ input }: { input: BookingInput }) {
  return <section className="confirmation panel"><span className="confirmation-icon"><Check size={25} /></span><h1>Agendamento confirmado</h1><ConfirmedDetails input={input} /><ActionLink to="/familia/consultas">Ver consulta <ArrowRight size={17} /></ActionLink><small>Simulação · nenhum horário real foi reservado.</small></section>;
}
