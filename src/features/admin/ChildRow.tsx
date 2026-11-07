import { ArrowRight, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Child } from '../../demo/types';
import { formatAge } from '../../demo/children';
import { useDemo } from '../../app/useDemo';
import { Button } from '../../ui/Button';
export function ChildRow({ child, onEdit }: { child: Child; onEdit: () => void }) {
  const { selectChild } = useDemo();
  const navigate = useNavigate();
  return <article className="admin-child-card"><div className="child-identity"><span className="avatar child-avatar">{child.name.slice(0, 2).toLocaleUpperCase('pt-BR')}</span><div><h2>{child.name}</h2><p>{formatAge(child.ageMonths)}</p></div></div><dl className="admin-guardian"><dt>Responsável</dt><dd>{child.guardian}</dd></dl><div className="admin-card-actions"><Button className="button-outline" onClick={onEdit}><Pencil size={15} />Editar</Button><Button className="button-ghost" onClick={() => { selectChild(child.id); navigate('/familia'); }}>Ver como família <ArrowRight size={15} /></Button></div></article>;
}
