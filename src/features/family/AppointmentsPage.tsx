import { ArrowUpRight } from 'lucide-react';
import { useFamily } from '../../app/useFamily';
import { Heading } from '../../ui/Heading';
import { ActionLink } from '../../ui/Button';
import { EmptyState } from '../../ui/EmptyState';
import { AppointmentDetails } from './AppointmentDetails';
export function AppointmentsPage() {
  const { state } = useFamily();
  const visits = [...state.appointments].sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  return <><Heading title="Consultas"><ActionLink to="/agendar">Agendar consulta <ArrowUpRight size={16} /></ActionLink></Heading><section className="panel appointments-list">{visits.length ? visits.map((visit) => <AppointmentDetails key={visit.id} visit={visit} />) : <EmptyState title="Nenhuma consulta agendada" description="Selecione um dia e horário."><ActionLink to="/agendar">Agendar consulta</ActionLink></EmptyState>}</section></>;
}
