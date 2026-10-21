import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { exampleChild } from '../../demo/seed';
export function ChildCard() {
  return <section className="child-card"><div className="child-identity"><span className="avatar child-avatar">{exampleChild.initials}</span><div><span className="child-role">Criança</span><h2>{exampleChild.name}</h2><p>{exampleChild.age}</p></div></div><Link to="/familia/fases">Ver acompanhamento <ArrowRight size={16} /></Link></section>;
}
