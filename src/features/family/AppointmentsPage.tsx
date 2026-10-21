import { ArrowUpRight } from 'lucide-react';
import { useDemo } from '../../app/useDemo';
import { Heading } from '../../ui/Heading';
import { ActionLink } from '../../ui/Button';
import { EmptyState } from '../../ui/EmptyState';
import { AppointmentDetails } from './AppointmentDetails';
export function AppointmentsPage() {
  const { state } = useDemo();
  const visits = [...state.appointments].sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  return <><Heading eyebrow="Tempo para estar perto" title="Nossos encontros." description="Organize as visitas e encontre os próximos passos."><ActionLink to="/agendar">Agendar consulta <ArrowUpRight size={16} /></ActionLink></Heading><section className="panel appointments-list">{visits.length ? visits.map((visit) => <AppointmentDetails key={visit.id} visit={visit} />) : <EmptyState title="Uma jornada para começar" description="Sua próxima consulta demonstrativa pode ser marcada por aqui."><ActionLink to="/agendar">Agendar consulta</ActionLink></EmptyState>}</section><p className="page-disclaimer">Os horários e atendimentos desta demonstração são fictícios.</p></>;
}
