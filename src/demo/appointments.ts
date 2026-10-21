import type { BookingInput, DemoState, Appointment } from './types';
import { appointmentTime, getAvailableTimes } from './dates';
export const visitLabels = { first: 'Primeira consulta', 'follow-up': 'Acompanhamento' };
export function bookAppointment(state: DemoState, input: BookingInput, now: Date): DemoState {
  if (!Object.hasOwn(visitLabels, input.kind)) throw new Error('Escolha um atendimento.');
  if (!getAvailableTimes(state, input.date, now).includes(input.time)) throw new Error('Esse horário não está disponível. Escolha outro dia ou horário.');
  const visit: Appointment = { ...input, id: crypto.randomUUID(), status: 'scheduled' };
  return { ...state, appointments: [...state.appointments, visit] };
}
export function cancelAppointment(state: DemoState, id: string): DemoState {
  const appointments = state.appointments.map((item): Appointment => item.id === id ? { ...item, status: 'cancelled' } : item);
  return { ...state, appointments };
}
export function getNextAppointment(state: DemoState, now: Date): Appointment | undefined {
  return state.appointments.filter((item) => item.status === 'scheduled' && appointmentTime(item.date, item.time) > now.getTime())
    .sort((left, right) => appointmentTime(left.date, left.time) - appointmentTime(right.date, right.time))[0];
}
