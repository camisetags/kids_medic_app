import { NotebookPen, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useDemo } from '../../app/useDemo';
import type { Note } from '../../demo/types';
import { ConfirmDialog } from '../../ui/ConfirmDialog';
function NoteActions({ note, onEdit }: { note: Note; onEdit: () => void }) {
  const [open, setOpen] = useState(false);
  const { remove } = useDemo();
  return <div className="note-actions"><button className="icon-button" aria-label={`Editar ${note.title}`} onClick={onEdit}><Pencil size={17} /></button><button className="icon-button danger" aria-label={`Excluir ${note.title}`} onClick={() => setOpen(true)}><Trash2 size={17} /></button><ConfirmDialog open={open} title="Excluir anotação?" description={`A anotação “${note.title}” será removida deste navegador.`} action="Excluir anotação" onClose={() => setOpen(false)} onConfirm={() => remove(note.id)} /></div>;
}
export function NoteCard({ note, onEdit }: { note: Note; onEdit: () => void }) {
  const date = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short' }).format(new Date(note.updatedAt));
  return <article className="note-card panel"><div className="note-card-top"><span className="soft-icon"><NotebookPen size={22} strokeWidth={1.4} /></span><NoteActions note={note} onEdit={onEdit} /></div><h3>{note.title}</h3><p data-testid="note-body">{note.body}</p><footer><span>{date}</span><span className="badge">Salva neste navegador</span></footer></article>;
}
