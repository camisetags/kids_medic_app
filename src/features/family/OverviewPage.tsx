import { Plus } from 'lucide-react';
import { Heading } from '../../ui/Heading';
import { ActionLink } from '../../ui/Button';
import { ChildCard } from './ChildCard';
import { NextAppointment } from './NextAppointment';
import { NotesPreview } from './NotesPreview';
export function OverviewPage() {
  return <><Heading title="Resumo"><ActionLink to="/agendar"><Plus size={17} />Agendar consulta</ActionLink></Heading><div className="overview-grid"><NextAppointment /><ChildCard /></div><NotesPreview /></>;
}
