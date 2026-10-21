import { SiteHeader } from '../landing/SiteHeader';
import { Heading } from '../../ui/Heading';
import { BookingStepper } from './BookingStepper';
import { BookingSummary } from './BookingSummary';
import { VisitChoice } from './VisitChoice';
import { BookingSchedule } from './BookingSchedule';
import { BookingReview } from './BookingReview';
import { BookingConfirmation } from './BookingConfirmation';
import { useBooking, type BookingModel } from './useBooking';
function BookingWorkspace({ model }: { model: BookingModel }) {
  return <><BookingStepper step={model.step} /><div className="booking-workspace"><div>{model.step === 0 && <VisitChoice model={model} />}{model.step === 1 && <BookingSchedule model={model} />}{model.step === 2 && <BookingReview model={model} />}</div><BookingSummary input={model.input} /></div></>;
}
export function BookingPage() {
  const model = useBooking();
  return <><SiteHeader /><main className="container booking-page" tabIndex={-1}>{model.step === 3 ? <BookingConfirmation input={model.input} /> : <><Heading eyebrow="Um tempo para cuidar" title="Vamos marcar um encontro?" description="Escolha o atendimento, o dia e o melhor horário para a sua família." /><BookingWorkspace model={model} /></>}</main></>;
}
