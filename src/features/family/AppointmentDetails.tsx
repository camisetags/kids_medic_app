import { useState } from 'react';
import { CalendarDays, Clock3 } from 'lucide-react';
import { visitLabels } from '../../demo/appointments';
import { formatDate } from '../../demo/dates';
import type { Appointment } from '../../demo/types';
import { Button } from '../../ui/Button';
import { ConfirmDialog } from '../../ui/ConfirmDialog';
import { useDemo } from '../../app/useDemo';
function VisitCancellation({ visit }: { visit: Appointment }) {
  const [open, setOpen] = useState(false);
  const { cancel } = useDemo();
  return <><Button className="button-outline" onClick={() => setOpen(true)}>Cancelar consulta</Button><ConfirmDialog open={open} title="Cancelar consulta?" description="O horário ficará disponível novamente." action="Cancelar agendamento" onClose={() => setOpen(false)} onConfirm={() => { cancel(visit.id); setOpen(false); }} /></>;
}
export function AppointmentDetails({ visit }: { visit: Appointment }) {
  return <article className={`appointment-row ${visit.status === 'cancelled' ? 'is-cancelled' : ''}`}><div className="calendar-tile"><small>{formatDate(visit.date, { month: 'short' }).replace('.', '')}</small><strong>{formatDate(visit.date, { day: '2-digit' })}</strong></div><div className="appointment-information"><span className={`badge ${visit.status === 'cancelled' ? 'muted' : ''}`}>{visit.status === 'cancelled' ? 'Cancelada' : 'Confirmada'}</span><h3>{visitLabels[visit.kind]}</h3><p>Criança: Clara · Dra. Dayse Mary</p><span className="visit-time"><CalendarDays size={14} />{formatDate(visit.date)}<Clock3 size={14} />{visit.time}</span></div>{visit.status === 'scheduled' && <VisitCancellation visit={visit} />}</article>;
}
