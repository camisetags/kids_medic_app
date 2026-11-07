import { CalendarDays, Clock3 } from 'lucide-react';
import type { Appointment, Child } from '../../demo/types';
import { formatDate, appointmentTime } from '../../demo/dates';
import { visitLabels } from '../../demo/appointments';
import { Button } from '../../ui/Button';
import { VisitCancellation } from '../family/AppointmentDetails';
export function AdminVisitRow({ visit, child, onEdit, onCancelled }: { visit: Appointment; child: Child; onEdit: () => void; onCancelled: () => void }) {
  const canMove = visit.status === 'scheduled' && appointmentTime(visit.date, visit.time) > Date.now();
  return <article className={`admin-visit-row ${visit.status === 'cancelled' ? 'is-cancelled' : ''}`}><div className="admin-visit-person"><h2>{child.name}</h2><p>Responsável: {child.guardian}</p><span className="admin-visit-kind">{visitLabels[visit.kind]}</span></div><div className="admin-visit-slot"><span><CalendarDays size={16} />{formatDate(visit.date)}</span><span><Clock3 size={16} />{visit.time}</span><span className={`badge ${visit.status === 'cancelled' ? 'muted' : ''}`}>{visit.status === 'cancelled' ? 'Cancelada' : 'Agendada'}</span></div><div className="admin-visit-actions">{canMove && <Button className="button-outline" onClick={onEdit}>Remarcar</Button>}{visit.status === 'scheduled' && <VisitCancellation visit={visit} onCancelled={onCancelled} />}</div></article>;
}
