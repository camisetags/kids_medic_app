import { Info, Save } from 'lucide-react';
import type { Note } from '../../demo/types';
import { Dialog } from '../../ui/Dialog';
import { ConfirmDialog } from '../../ui/ConfirmDialog';
import { Button } from '../../ui/Button';
import { Field, TextareaField } from '../../ui/Field';
import { useNoteDraft } from './useNoteDraft';
type DraftModel = ReturnType<typeof useNoteDraft>;
function EditorFields({ model }: { model: DraftModel }) {
  return <><Field id="note-title" label="Título" placeholder="Ex.: Dúvidas para a consulta" autoFocus maxLength={120} value={model.input.title} aria-invalid={Boolean(model.error && !model.input.title.trim())} aria-describedby="note-error" onChange={(event) => model.change({ ...model.input, title: event.target.value })} /><TextareaField id="note-body" label="Anotação" placeholder="Escreva sua anotação" maxLength={6000} value={model.input.body} aria-invalid={Boolean(model.error && !model.input.body.trim())} aria-describedby="note-error note-help" onChange={(event) => model.change({ ...model.input, body: event.target.value })} /><p className="inline-error" id="note-error" role="alert">{model.error}</p><p className="info-note" id="note-help"><Info size={15} />Use apenas exemplos, sem dados pessoais. As anotações ficam neste navegador.</p></>;
}
function EditorForm({ model, editing }: { model: DraftModel; editing: boolean }) {
  return <form noValidate onSubmit={(event) => { event.preventDefault(); model.save(); }}><EditorFields model={model} /><div className="editor-status"><span className="small-dot" />{model.dirty ? 'Rascunho · ainda não salvo' : 'Sem alterações'}</div><div className="dialog-actions"><Button className="button-outline" onClick={model.close}>Voltar</Button><Button type="submit"><Save size={16} />{editing ? 'Salvar alterações' : 'Salvar anotação'}</Button></div></form>;
}
export function NoteEditor({ note, title = '', onClose }: { note?: Note; title?: string; onClose: () => void }) {
  const model = useNoteDraft(note, title, onClose);
  return <><Dialog open title={note ? 'Editar anotação' : 'Nova anotação'} onClose={model.close}><EditorForm model={model} editing={Boolean(note)} /></Dialog><ConfirmDialog open={model.discarding || model.blocked} title="Descartar este rascunho?" description="As alterações ainda não foram salvas. Você pode voltar para continuar escrevendo." action="Descartar rascunho" onConfirm={model.discard} onClose={model.keep} /></>;
}
