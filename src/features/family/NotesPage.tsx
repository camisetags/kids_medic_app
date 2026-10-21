import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Info } from 'lucide-react';
import { useDemo } from '../../app/useDemo';
import type { Note } from '../../demo/types';
import { Heading } from '../../ui/Heading';
import { Button } from '../../ui/Button';
import { EmptyState } from '../../ui/EmptyState';
import { NoteCard } from './NoteCard';
import { NoteEditor } from './NoteEditor';
function useNotesPage() {
  const [params, setParams] = useSearchParams();
  const [editor, setEditor] = useState<{ open: boolean; note?: Note }>({ open: params.has('nova') });
  const title = params.get('titulo') ?? '';
  return { editor, title, open: (note?: Note) => setEditor({ open: true, note }), close: () => { setEditor({ open: false }); setParams({}); } };
}
function NotesCollection({ open }: { open: (note?: Note) => void }) {
  const { state } = useDemo();
  return state.notes.length ? <div className="notes-grid">{state.notes.map((note) => <NoteCard key={note.id} note={note} onEdit={() => open(note)} />)}</div> : <div className="panel"><EmptyState title="O que você quer guardar?" description="Uma pergunta, uma descoberta ou um assunto para o próximo encontro."><Button onClick={() => open()}>Criar primeira anotação</Button></EmptyState></div>;
}
export function NotesPage() {
  const model = useNotesPage();
  return <><Heading eyebrow="Entre uma consulta e outra" title="O que vale guardar." description="As perguntas de hoje também fazem parte do cuidado."><Button onClick={() => model.open()}><Plus size={17} />Nova anotação</Button></Heading><p className="notes-intro info-note"><Info size={16} />Este é o seu espaço de exemplos. As anotações não são enviadas à médica.</p><NotesCollection open={model.open} />{model.editor.open && <NoteEditor key={model.editor.note?.id ?? 'new'} note={model.editor.note} title={model.title} onClose={model.close} />}</>;
}
