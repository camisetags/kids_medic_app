import { Heart, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';
import { exampleChild } from '../../demo/seed';
export function ChildCard() {
  return <section className="child-card"><div className="child-card-top"><span className="avatar child-avatar">{exampleChild.initials}</span><span className="badge">Perfil de exemplo</span></div><div><span className="eyebrow">Cada dia, uma descoberta</span><h2>{exampleChild.name}<Heart size={21} strokeWidth={1.4} /></h2><p>{exampleChild.age} · um mundo para descobrir</p></div><Link to="/familia/fases"><Sprout size={18} /><span>Conhecer esta fase</span><span aria-hidden="true">→</span></Link><div className="child-botanical" aria-hidden="true"><Sprout size={150} strokeWidth={.65} /></div></section>;
}
