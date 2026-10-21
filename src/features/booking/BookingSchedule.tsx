import { ArrowLeft } from 'lucide-react';
import { DayChoice } from './DayChoice';
import { TimeChoice } from './TimeChoice';
import { Button } from '../../ui/Button';
import type { BookingModel } from './useBooking';
export function BookingSchedule({ model }: { model: BookingModel }) {
  return <section className="panel booking-panel"><DayChoice model={model} /><TimeChoice model={model} /><div className="booking-actions"><Button className="button-ghost" onClick={() => model.setStep(0)}><ArrowLeft size={16} />Voltar</Button><Button disabled={!model.input.date || !model.input.time} onClick={() => model.setStep(2)}>Revisar agendamento</Button></div></section>;
}
