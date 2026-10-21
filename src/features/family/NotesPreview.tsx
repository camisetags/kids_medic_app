import { ArrowUpRight, NotebookPen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDemo } from '../../app/useDemo';
function PreviewContent() {
  const { state } = useDemo();
  const note = state.notes[0];
  return note ? <div className="note-preview"><span className="soft-icon"><NotebookPen size={23} strokeWidth={1.4} /></span><div><h3>{note.title}</h3><p>{note.body}</p></div></div> : <p className="note-preview-empty">Nenhuma anotação.</p>;
}
export function NotesPreview() {
  return <section className="panel notes-preview"><div className="panel-title"><h2>Anotações</h2><Link className="text-link" to="/familia/anotacoes">Ver todas <ArrowUpRight size={15} /></Link></div><PreviewContent /><Link className="text-link notes-create" to="/familia/anotacoes?nova=1">Nova anotação <ArrowUpRight size={15} /></Link></section>;
}
