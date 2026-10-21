import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { phases } from './phases';
function PhaseCard({ phase }: { phase: typeof phases[number] }) {
  return <Link to={`/familia/fases?fase=${phase.id}`} className={`phase-card tone-${phase.tone}`}><div className="phase-top"><phase.icon size={29} strokeWidth={1.3} /><ArrowUpRight size={18} /></div><span className="phase-age">{phase.age}</span><h3>{phase.title}</h3><p>{phase.description}</p></Link>;
}
export function CareStages() {
  return <section className="stages-section container"><div className="section-heading"><div><span className="eyebrow">A infância não para de mudar</span><h2>Um cuidado para <em>cada fase.</em></h2></div><p>Cada etapa traz um novo universo.<br />O acompanhamento ajuda a organizar essa jornada.</p></div><div className="phase-grid">{phases.map((phase) => <PhaseCard phase={phase} key={phase.id} />)}</div></section>;
}
