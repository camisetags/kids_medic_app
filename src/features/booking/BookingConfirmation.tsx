import { useDemo } from '../../app/useDemo';
import { Check, ArrowRight, CalendarDays } from 'lucide-react';
import { ActionLink } from '../../ui/Button';
import { formatDate } from '../../demo/dates';
import type { BookingInput } from '../../demo/types';
export function BookingConfirmation({ input }: { input: BookingInput }) {
  const { notice } = useDemo();
  const message = notice ? 'A simulação está disponível nesta sessão. Seu navegador não permitiu guardá-la para a próxima visita.' : 'A simulação foi salva. Você já pode encontrá-la na área da família.';
  return <section className="confirmation panel"><span className="confirmation-icon"><Check size={31} strokeWidth={1.5} /></span><span className="eyebrow">Agendamento demonstrativo</span><h1>Um próximo encontro<br /><em>para chamar de seu.</em></h1><p>{message}</p><div className="confirmation-date"><CalendarDays size={21} /><strong>{formatDate(input.date)} · {input.time}</strong></div><ActionLink to="/familia">Ir para a área da família <ArrowRight size={17} /></ActionLink><small>Nenhuma consulta real foi reservada.</small></section>;
}
