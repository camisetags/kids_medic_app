import type { ReactNode } from 'react';
import type { DraftModel } from '../app/useDraft';
import { Dialog } from './Dialog';
import { ConfirmDialog } from './ConfirmDialog';
import { Button } from './Button';
export function DraftDialog<T>({ title, model, saveLabel, children }: { title: string; model: DraftModel<T>; saveLabel: string; children: ReactNode }) {
  return <><Dialog open title={title} onClose={model.close}><form noValidate onSubmit={(event) => { event.preventDefault(); model.save(); }}>{children}<p id="admin-error" className="inline-error" role="alert">{model.error}</p><div className="dialog-actions"><Button className="button-outline" onClick={model.close}>Voltar</Button><Button type="submit">{saveLabel}</Button></div></form></Dialog><ConfirmDialog open={model.discarding || model.blocked} title="Descartar alterações?" description="As alterações ainda não foram salvas." action="Descartar alterações" onConfirm={model.discard} onClose={model.keep} /></>;
}
