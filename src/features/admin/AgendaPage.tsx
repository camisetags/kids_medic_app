import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useDemo } from '../../app/useDemo';
import type { Appointment, DemoState } from '../../demo/types';
import { Heading } from '../../ui/Heading';
import { Button } from '../../ui/Button';
import { EmptyState } from '../../ui/EmptyState';
import { StatusMessage } from '../../ui/StatusMessage';
import { useAdminFilters, matchesSearch } from './filters';
import { AgendaFilters } from './AgendaFilters';
import { AdminVisitRow } from './AdminVisitRow';
import { VisitEditor } from './VisitEditor';
function filteredVisits(state: DemoState, filters: ReturnType<typeof useAdminFilters>) {
  return state.appointments.filter((visit) => {
    const child = state.children.find((item) => item.id === visit.childId)!;
    return matchesSearch(child.name, child.guardian, filters.q) && (!filters.date || visit.date === filters.date) && (!filters.status || visit.status === filters.status);
  }).sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
}
export function AgendaPage() {
  const { state } = useDemo();
  const filters = useAdminFilters(), [editor, setEditor] = useState<{ visit?: Appointment } | null>(null), [feedback, setFeedback] = useState('');
  const visits = filteredVisits(state, filters), dates = [...new Set([...state.appointments.map((visit) => visit.date), filters.date].filter(Boolean))].sort();
  return <><Heading title="Agenda"><Button onClick={() => setEditor({})}><Plus size={17} />Nova consulta</Button></Heading>{feedback && <StatusMessage message={feedback} />}<AgendaFilters model={filters} dates={dates} /><p className="result-count agenda-count">{visits.length} {visits.length === 1 ? 'consulta' : 'consultas'}</p>{visits.length ? <section className="admin-agenda panel" aria-label="Consultas do consultório">{visits.map((visit) => <AdminVisitRow key={visit.id} visit={visit} child={state.children.find((child) => child.id === visit.childId)!} onEdit={() => setEditor({ visit })} onCancelled={() => setFeedback('Consulta cancelada.')} />)}</section> : <section className="panel"><EmptyState title={state.appointments.length ? 'Nenhuma consulta encontrada' : 'Nenhuma consulta agendada'} description={state.appointments.length ? 'Ajuste os filtros para ver outras consultas.' : 'Cadastre uma consulta para começar.'} /></section>}{editor && <VisitEditor visit={editor.visit} onClose={() => setEditor(null)} onSaved={() => setFeedback(editor.visit ? 'Consulta remarcada.' : 'Consulta agendada.')} />}</>;
}
