import type { Appointment, DemoState, Note } from './types';
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;
const isText = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;
export function isAppointment(value: unknown): value is Appointment {
  if (!isRecord(value)) return false;
  return [value.id, value.date, value.time].every(isText) && ['first', 'follow-up'].includes(String(value.kind))
    && ['scheduled', 'cancelled'].includes(String(value.status)) && /^\d{4}-\d{2}-\d{2}$/.test(String(value.date))
    && ['09:00', '10:00', '11:00', '14:00', '15:00'].includes(String(value.time)) && Number.isFinite(Date.parse(`${value.date}T12:00:00`));
}
export function isNote(value: unknown): value is Note {
  return isRecord(value) && [value.id, value.title, value.body, value.updatedAt].every(isText)
    && Number.isFinite(Date.parse(String(value.updatedAt)));
}
export function isDemoState(value: unknown): value is DemoState {
  return isRecord(value) && value.version === 1 && Array.isArray(value.appointments) && Array.isArray(value.notes)
    && value.appointments.every(isAppointment) && value.notes.every(isNote);
}
