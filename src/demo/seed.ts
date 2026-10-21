import type { DemoState } from './types';
import { getDemoDays, isWeekday } from './dates';
export const exampleChild = { name: 'Clara', age: '9 meses', initials: 'CL', guardian: 'Marina', label: 'Perfil de exemplo' };
export function createDemoState(now: Date): DemoState {
  const date = getDemoDays(now).filter(isWeekday)[3];
  const appointment = { id: 'example-visit', kind: 'follow-up' as const, date, time: '10:00', status: 'scheduled' as const };
  const note = { id: 'example-note', title: 'Para a próxima consulta', body: 'Exemplo: conversar sobre a rotina e levar as dúvidas que surgiram desde a última visita.', updatedAt: now.toISOString() };
  return { version: 1, appointments: [appointment], notes: [note] };
}
