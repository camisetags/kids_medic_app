import { RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { useDemo } from '../../app/useDemo';
import { ConfirmDialog } from '../../ui/ConfirmDialog';
export function ResetDemo() {
  const [open, setOpen] = useState(false);
  const { reset } = useDemo();
  return <div className="reset-demo"><button className="text-link" onClick={() => setOpen(true)}><RotateCcw size={13} />Reiniciar demonstração</button><ConfirmDialog open={open} title="Começar uma nova demonstração?" description="As consultas e anotações deste navegador serão substituídas pelos exemplos iniciais." action="Restaurar exemplos" onClose={() => setOpen(false)} onConfirm={() => { reset(); setOpen(false); }} /></div>;
}
