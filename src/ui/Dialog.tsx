import { useEffect, useRef, useId, type SyntheticEvent, type ReactNode, type RefObject } from 'react';
import { X } from 'lucide-react';
function syncDialog(ref: RefObject<HTMLDialogElement | null>, open: boolean) {
  if (open && !ref.current?.open) ref.current?.showModal();
  if (!open && ref.current?.open) ref.current?.close();
}
function cancelDialog(event: SyntheticEvent, onClose: () => void) {
  event.preventDefault();
  onClose();
}
function closeOnUnmount(ref: RefObject<HTMLDialogElement | null>) {
  const dialog = ref.current;
  return () => dialog?.close();
}
export function Dialog({ open, title, onClose, children }: { open: boolean; title: string; onClose: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => closeOnUnmount(ref), []);
  useEffect(() => syncDialog(ref, open), [open]);
  return <dialog ref={ref} aria-labelledby={titleId} onCancel={(event) => cancelDialog(event, onClose)}><div className="dialog-heading"><h2 id={titleId}>{title}</h2><button type="button" className="icon-button" aria-label="Fechar" onClick={onClose}><X size={20} /></button></div>{children}</dialog>;
}
