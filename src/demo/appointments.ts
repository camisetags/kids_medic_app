import type { BookingInput, DemoState, Appointment, SlotInput } from './types';
import { appointmentTime, getAvailableTimes } from './dates';
import { requireChild } from './children';
export const visitLabels = { first: 'Primeira consulta', 'follow-up': 'Acompanhamento' };
function assertSlot(state: DemoState, input: BookingInput, now: Date) {
  if (!Object.hasOwn(visitLabels, input.kind)) throw new Error('Escolha um atendimento.');
  if (!input.date || !input.time) throw new Error('Escolha o dia e o horário da consulta.');
  if (!getAvailableTimes(state, input.date, now).includes(input.time)) throw new Error('Esse horário não está disponível. Escolha outro dia ou horário.');
}
export function bookAppointment(state: DemoState, input: BookingInput, now: Date): DemoState {
  const childId = input.childId ?? state.activeChildId;
  requireChild(state, childId);
  assertSlot(state, input, now);
  const visit: Appointment = { ...input, childId, id: crypto.randomUUID(), status: 'scheduled' };
  return { ...state, appointments: [...state.appointments, visit] };
}
export function cancelAppointment(state: DemoState, id: string): DemoState {
  const appointments = state.appointments.map((item): Appointment => item.id === id ? { ...item, status: 'cancelled' } : item);
  return { ...state, appointments };
}
export function rescheduleAppointment(state: DemoState, id: string, input: SlotInput, now: Date): DemoState {
  const visit = state.appointments.find((item) => item.id === id);
  if (!visit || visit.status !== 'scheduled' || appointmentTime(visit.date, visit.time) <= now.getTime()) throw new Error('Esta consulta não pode ser remarcada.');
  assertSlot({ ...state, appointments: state.appointments.filter((item) => item.id !== id) }, { ...visit, ...input }, now);
  return { ...state, appointments: state.appointments.map((item) => item.id === id ? { ...item, date: input.date, time: input.time } : item) };
}
export function getNextAppointment(state: DemoState, now: Date): Appointment | undefined {
  return state.appointments.filter((item) => item.status === 'scheduled' && appointmentTime(item.date, item.time) > now.getTime())
    .sort((left, right) => appointmentTime(left.date, left.time) - appointmentTime(right.date, right.time))[0];
}
