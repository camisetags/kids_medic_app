import { isLegacyState } from './validation';
import { exampleChildren } from './seed';
import type { DemoState } from './types';
export function migrateDemo(value: unknown): unknown {
  if (!isLegacyState(value)) return value;
  return { version: 2, children: exampleChildren.map((child) => ({ ...child })), activeChildId: 'clara', appointments: value.appointments.map((visit) => ({ ...visit, childId: 'clara' })), notes: value.notes.map((note) => ({ ...note, childId: 'clara' })) } satisfies DemoState;
}
