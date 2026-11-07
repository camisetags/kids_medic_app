import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFamily } from '../../app/useFamily';
export function ChildCard() {
  const { child } = useFamily();
  return <section className="child-card"><div className="child-identity"><span className="avatar child-avatar">{child.initials}</span><div><span className="child-role">Criança</span><h2>{child.name}</h2><p>{child.age}</p></div></div><Link to="/familia/fases">Ver acompanhamento <ArrowRight size={16} /></Link></section>;
}
