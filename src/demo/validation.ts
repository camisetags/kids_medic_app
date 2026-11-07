import type { Appointment, DemoState, Note, Child, LegacyState } from './types';
import { validChild } from './children';
export const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;
const isText = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;
function isLegacyAppointment(value: unknown): value is LegacyState['appointments'][number] {
  if (!isRecord(value)) return false;
  return [value.id, value.date, value.time].every(isText) && ['first', 'follow-up'].includes(String(value.kind))
    && ['scheduled', 'cancelled'].includes(String(value.status)) && /^\d{4}-\d{2}-\d{2}$/.test(String(value.date))
    && ['09:00', '10:00', '11:00', '14:00', '15:00'].includes(String(value.time)) && Number.isFinite(Date.parse(`${value.date}T12:00:00`));
}
function isLegacyNote(value: unknown): value is LegacyState['notes'][number] {
  return isRecord(value) && [value.id, value.title, value.body, value.updatedAt].every(isText) && Number.isFinite(Date.parse(String(value.updatedAt)));
}
export function isLegacyState(value: unknown): value is LegacyState {
  return isRecord(value) && value.version === 1 && Array.isArray(value.appointments) && Array.isArray(value.notes)
    && value.appointments.every(isLegacyAppointment) && value.notes.every(isLegacyNote);
}
export function isAppointment(value: unknown): value is Appointment {
  return isRecord(value) && isText(value.childId) && isLegacyAppointment(value);
}
export function isNote(value: unknown): value is Note {
  return isRecord(value) && isText(value.childId) && isLegacyNote(value);
}
function isChild(value: unknown): value is Child {
  return isRecord(value) && isText(value.id) && validChild(value as Child);
}
const unique = (items: { id: string }[]) => new Set(items.map((item) => item.id)).size === items.length;
function validReferences(value: DemoState): boolean {
  const ids = new Set(value.children.map((child) => child.id));
  return ids.has(value.activeChildId) && [...value.appointments, ...value.notes].every((item) => ids.has(item.childId))
    && [value.children, value.appointments, value.notes].every(unique);
}
export function isDemoState(value: unknown): value is DemoState {
  return isRecord(value) && value.version === 2 && Array.isArray(value.children) && value.children.every(isChild)
    && Array.isArray(value.appointments) && value.appointments.every(isAppointment)
    && Array.isArray(value.notes) && value.notes.every(isNote) && validReferences(value as DemoState);
}
