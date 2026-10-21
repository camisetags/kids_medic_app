import { Check } from 'lucide-react';
const steps = ['Atendimento', 'Dia e horário', 'Confirmar'];
export function BookingStepper({ step }: { step: number }) {
  return <ol className="booking-stepper" aria-label="Etapas do agendamento">{steps.map((label, index) => <li key={label} className={index <= step ? 'is-current' : ''} aria-current={index === step ? 'step' : undefined}><span>{index < step ? <Check size={15} /> : `0${index + 1}`}</span><strong>{label}</strong></li>)}</ol>;
}
