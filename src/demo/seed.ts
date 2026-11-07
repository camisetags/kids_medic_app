import type { DemoState } from './types';
import { getDemoDays, isWeekday } from './dates';
export const exampleChild = { name: 'Clara', age: '9 meses', initials: 'CL', guardian: 'Marina', label: 'Perfil de exemplo' };
export const exampleChildren = [{ id: 'clara', name: 'Clara', ageMonths: 9, guardian: 'Marina' }, { id: 'theo', name: 'Theo', ageMonths: 30, guardian: 'Rafael' }, { id: 'sofia', name: 'Sofia', ageMonths: 60, guardian: 'Camila' }];
export function createDemoState(now: Date): DemoState {
  const days = getDemoDays(now).filter(isWeekday);
  const appointments = exampleChildren.map((child, index) => ({ id: `example-visit-${index}`, childId: child.id, kind: 'follow-up' as const, date: days[index + 3], time: '10:00', status: 'scheduled' as const }));
  const note = { id: 'example-note', childId: 'clara', title: 'Para a próxima consulta', body: 'Exemplo: conversar sobre a rotina e levar as dúvidas que surgiram desde a última visita.', updatedAt: now.toISOString() };
  return { version: 2, children: exampleChildren.map((child) => ({ ...child })), activeChildId: 'clara', appointments, notes: [note] };
}
