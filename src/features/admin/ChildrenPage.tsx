import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useDemo } from '../../app/useDemo';
import type { Child } from '../../demo/types';
import { Heading } from '../../ui/Heading';
import { Button } from '../../ui/Button';
import { EmptyState } from '../../ui/EmptyState';
import { StatusMessage } from '../../ui/StatusMessage';
import { SearchField } from '../../ui/SearchField';
import { useAdminFilters, matchesSearch } from './filters';
import { ChildRow } from './ChildRow';
import { ChildEditor } from './ChildEditor';
export function ChildrenPage() {
  const { state } = useDemo();
  const filters = useAdminFilters(), [editor, setEditor] = useState<{ child?: Child } | null>(null), [feedback, setFeedback] = useState('');
  const children = state.children.filter((child) => matchesSearch(child.name, child.guardian, filters.q)).sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  return <><Heading title="Crianças"><Button onClick={() => setEditor({})}><Plus size={17} />Nova criança</Button></Heading>{feedback && <StatusMessage message={feedback} />}<div className="admin-searchbar"><SearchField value={filters.q} onChange={(value) => filters.set('q', value)} /><span className="result-count">{children.length} {children.length === 1 ? 'criança' : 'crianças'}</span></div>{children.length ? <div className="admin-children-grid">{children.map((child) => <ChildRow key={child.id} child={child} onEdit={() => setEditor({ child })} />)}</div> : <section className="panel"><EmptyState title={filters.q ? 'Nenhuma criança encontrada' : 'Nenhuma criança cadastrada'} description={filters.q ? 'Tente outro nome ou limpe a busca.' : 'Cadastre uma criança para agendar consultas.'} /></section>}{editor && <ChildEditor child={editor.child} onClose={() => setEditor(null)} onSaved={() => setFeedback('Cadastro salvo.')} />}</>;
}
