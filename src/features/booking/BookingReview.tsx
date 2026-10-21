import { ArrowLeft, Info } from 'lucide-react';
import { Button } from '../../ui/Button';
import { exampleChild } from '../../demo/seed';
import { formatDate } from '../../demo/dates';
import { visitLabels } from '../../demo/appointments';
import type { BookingModel } from './useBooking';
function ReviewDetails({ model }: { model: BookingModel }) {
  return <dl className="review-details"><div><dt>Atendimento</dt><dd>{visitLabels[model.input.kind]}</dd></div><div><dt>Dia e horário</dt><dd>{formatDate(model.input.date)} às {model.input.time}</dd></div><div><dt>Criança</dt><dd>{exampleChild.name} · {exampleChild.age} <span className="badge">Exemplo</span></dd></div><div><dt>Responsável</dt><dd>{exampleChild.guardian} <span className="badge">Exemplo</span></dd></div></dl>;
}
export function BookingReview({ model }: { model: BookingModel }) {
  return <section className="panel booking-panel"><span className="eyebrow">Está tudo certo?</span><h2>Um último olhar.</h2><p>Confira o encontro que você está simulando.</p><ReviewDetails model={model} /><p className="info-note"><Info size={16} />Esta confirmação salva apenas um agendamento demonstrativo neste navegador.</p><p className="inline-error" role="alert">{model.error}</p><div className="booking-actions"><Button className="button-ghost" onClick={() => model.setStep(1)}><ArrowLeft size={16} />Voltar</Button><Button onClick={model.finish}>Confirmar simulação</Button></div></section>;
}
