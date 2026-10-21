import { AppLayout } from '../../app/AppLayout';
import { Heading } from '../../ui/Heading';
import { BookingStepper } from './BookingStepper';
import { VisitChoice } from './VisitChoice';
import { BookingSchedule } from './BookingSchedule';
import { BookingReview } from './BookingReview';
import { BookingConfirmation } from './BookingConfirmation';
import { useBooking, type BookingModel } from './useBooking';
function BookingWorkspace({ model }: { model: BookingModel }) {
  return <><BookingStepper step={model.step} />{model.step === 0 && <VisitChoice model={model} />}{model.step === 1 && <BookingSchedule model={model} />}{model.step === 2 && <BookingReview model={model} />}</>;
}
export function BookingPage() {
  const model = useBooking();
  return <AppLayout booking>{model.step === 3 ? <BookingConfirmation input={model.input} /> : <><Heading title="Agendar consulta" /><BookingWorkspace model={model} /></>}</AppLayout>;
}
