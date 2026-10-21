import { ArrowRight, Check, Info } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { phases } from '../landing/phases';
import { Heading } from '../../ui/Heading';
import { ActionLink } from '../../ui/Button';
const questions = ['O que mudou na rotina desde a última consulta?', 'Quais descobertas quero compartilhar?', 'Que dúvidas quero levar para o próximo encontro?'];
function PhaseSelection({ selected, select }: { selected: string; select: (id: string) => void }) {
  return <div className="stage-tabs" role="group" aria-label="Fases da criança">{phases.map((phase) => <button className={phase.id === selected ? 'active' : ''} aria-pressed={phase.id === selected} key={phase.id} onClick={() => select(phase.id)}><phase.icon size={24} strokeWidth={1.4} /><span><strong>{phase.age}</strong><small>{phase.title}</small></span></button>)}</div>;
}
function StageDetails({ phase }: { phase: typeof phases[number] }) {
  return <section className="stage-details panel"><div className="stage-detail-copy"><span className="eyebrow">{phase.age} · conteúdo ilustrativo</span><h2>{phase.title}.</h2><p>{phase.description} Prepare suas perguntas e leve o que faz parte da sua realidade para conversar com a médica.</p><h3>Para conversar no próximo encontro</h3><ul>{questions.map((question) => <li key={question}><Check size={16} />{question}</li>)}</ul><ActionLink to={`/familia/anotacoes?nova=1&titulo=${encodeURIComponent(phase.prompt)}`}>Preparar minhas perguntas <ArrowRight size={17} /></ActionLink></div><div className={`stage-art tone-${phase.tone}`}><phase.icon size={112} strokeWidth={.8} /><span>Cada fase tem<br /><em>seu próprio tempo.</em></span></div></section>;
}
export function StagesPage() {
  const [params, setParams] = useSearchParams();
  const phase = phases.find((item) => item.id === params.get('fase')) ?? phases[1];
  return <><Heading eyebrow="Pequenos passos, novas descobertas" title="Um olhar para cada fase." description="Um espaço para organizar as dúvidas que surgem enquanto a criança cresce." /><PhaseSelection selected={phase.id} select={(id) => setParams({ fase: id })} /><StageDetails phase={phase} /><p className="page-disclaimer info-note"><Info size={15} />Este conteúdo demonstra a organização do acompanhamento. As orientações clínicas serão definidas com a médica.</p></>;
}
