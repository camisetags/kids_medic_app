import { CalendarDays, ArrowRight, Clock3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDemo } from '../../app/useDemo';
import { getNextAppointment, visitLabels } from '../../demo/appointments';
import { formatDate } from '../../demo/dates';
import { ActionLink } from '../../ui/Button';
import { EmptyState } from '../../ui/EmptyState';
function VisitContent({ visit }: { visit: NonNullable<ReturnType<typeof getNextAppointment>> }) {
  return <><div className="next-visit-body"><div className="calendar-tile"><small>{formatDate(visit.date, { month: 'short' }).replace('.', '')}</small><strong>{formatDate(visit.date, { day: '2-digit' })}</strong></div><div><span className="badge">Confirmada</span><h3>{visitLabels[visit.kind]}</h3><p>Dra. Dayse Mary</p><span className="visit-time"><CalendarDays size={14} />{formatDate(visit.date)}<Clock3 size={14} />{visit.time}</span></div></div><Link to="/familia/consultas" className="next-visit-link">Ver consulta <ArrowRight size={16} /></Link></>;
}
export function NextAppointment() {
  const { state } = useDemo();
  const visit = getNextAppointment(state, new Date());
  return <section className="panel next-visit" data-testid="next-appointment"><div className="panel-title"><h2>Próxima consulta</h2><CalendarDays size={21} strokeWidth={1.4} /></div>{visit ? <VisitContent visit={visit} /> : <EmptyState title="Nenhuma consulta agendada" description="Agende uma consulta para Clara."><ActionLink to="/agendar">Agendar consulta</ActionLink></EmptyState>}</section>;
}
