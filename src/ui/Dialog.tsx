import { useEffect, useRef, type ReactNode, type RefObject } from 'react';
import { X } from 'lucide-react';
function syncDialog(ref: RefObject<HTMLDialogElement | null>, open: boolean) {
  if (open && !ref.current?.open) ref.current?.showModal();
  if (!open && ref.current?.open) ref.current?.close();
}
export function Dialog({ open, title, onClose, children }: { open: boolean; title: string; onClose: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => syncDialog(ref, open), [open]);
  return <dialog ref={ref} aria-labelledby="dialog-title" onCancel={onClose} onClose={onClose}><div className="dialog-heading"><h2 id="dialog-title">{title}</h2><button type="button" className="icon-button" aria-label="Fechar" onClick={onClose}><X size={20} /></button></div>{children}</dialog>;
}
