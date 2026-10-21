import { ArrowRight, Check } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { phases } from '../landing/phases';
import { Heading } from '../../ui/Heading';
import { ActionLink } from '../../ui/Button';
import { exampleChild } from '../../demo/seed';
const questions = ['O que mudou na rotina desde a última consulta?', 'O que quero contar sobre alimentação e sono?', 'Quais dúvidas tenho sobre o desenvolvimento?'];
function PhaseSelection({ selected, select }: { selected: string; select: (id: string) => void }) {
  return <div className="stage-tabs" role="group" aria-label="Fases da criança">{phases.map((phase) => <button className={phase.id === selected ? 'active' : ''} aria-pressed={phase.id === selected} key={phase.id} onClick={() => select(phase.id)}><phase.icon size={22} strokeWidth={1.6} /><strong>{phase.age}</strong></button>)}</div>;
}
function StageDetails({ phase }: { phase: typeof phases[number] }) {
  return <section className="stage-details panel"><div className="stage-detail-copy"><h2>Fase: {phase.age}</h2><h3>Perguntas para a consulta</h3><ul>{questions.map((question) => <li key={question}><Check size={16} />{question}</li>)}</ul><ActionLink to={`/familia/anotacoes?nova=1&titulo=${encodeURIComponent(`Dúvidas · ${phase.age}`)}`}>Anotar dúvidas <ArrowRight size={17} /></ActionLink></div></section>;
}
export function StagesPage() {
  const [params, setParams] = useSearchParams();
  const phase = phases.find((item) => item.id === params.get('fase')) ?? phases[1];
  return <><Heading title="Acompanhamento" description={`${exampleChild.name} · ${exampleChild.age}`} /><PhaseSelection selected={phase.id} select={(id) => setParams({ fase: id })} /><StageDetails phase={phase} /><p className="page-disclaimer">Conteúdo de exemplo. As orientações são definidas na consulta.</p></>;
}
