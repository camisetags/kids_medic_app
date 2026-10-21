import { ArrowLeft } from 'lucide-react';
import { Button } from '../../ui/Button';
import { exampleChild } from '../../demo/seed';
import { formatDate } from '../../demo/dates';
import { visitLabels } from '../../demo/appointments';
import type { BookingModel } from './useBooking';
function ReviewDetails({ model }: { model: BookingModel }) {
  return <dl className="review-details"><div><dt>Atendimento</dt><dd>{visitLabels[model.input.kind]}</dd></div><div><dt>Dia e horário</dt><dd>{formatDate(model.input.date)} às {model.input.time}</dd></div><div><dt>Criança</dt><dd>{exampleChild.name} · {exampleChild.age}</dd></div><div><dt>Médica</dt><dd>Dra. Dayse Mary</dd></div></dl>;
}
export function BookingReview({ model }: { model: BookingModel }) {
  return <section className="panel booking-panel"><h2>Revisar agendamento</h2><ReviewDetails model={model} /><p className="info-note">Simulação salva neste navegador, sem reserva real.</p><p className="inline-error" role="alert">{model.error}</p><div className="booking-actions"><Button className="button-ghost" onClick={() => model.setStep(1)}><ArrowLeft size={16} />Voltar</Button><Button onClick={model.finish}>Confirmar agendamento</Button></div></section>;
}
