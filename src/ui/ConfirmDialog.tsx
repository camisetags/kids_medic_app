import { Dialog } from './Dialog';
import { Button } from './Button';
export function ConfirmDialog({ open, title, description, action, onConfirm, onClose }: { open: boolean; title: string; description: string; action: string; onConfirm: () => void; onClose: () => void }) {
  return <Dialog open={open} title={title} onClose={onClose}><p className="dialog-copy">{description}</p><div className="dialog-actions"><Button className="button-outline" autoFocus onClick={onClose}>Voltar</Button><Button className="button-danger" onClick={onConfirm}>{action}</Button></div></Dialog>;
}
