import { Check, ArrowRight, CalendarDays } from 'lucide-react';
import { ActionLink } from '../../ui/Button';
import { formatDate } from '../../demo/dates';
import type { BookingInput } from '../../demo/types';
export function BookingConfirmation({ input }: { input: BookingInput }) {
  return <section className="confirmation panel"><span className="confirmation-icon"><Check size={31} strokeWidth={1.5} /></span><span className="eyebrow">Agendamento demonstrativo</span><h1>Um próximo encontro<br /><em>para chamar de seu.</em></h1><p>A simulação foi salva. Você já pode encontrá-la na área da família.</p><div className="confirmation-date"><CalendarDays size={21} /><strong>{formatDate(input.date)} · {input.time}</strong></div><ActionLink to="/familia">Ir para a área da família <ArrowRight size={17} /></ActionLink><small>Nenhuma consulta real foi reservada.</small></section>;
}
