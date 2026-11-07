import type { DemoState } from './types';
import { requireChild, formatAge } from './children';
export function familyState(state: DemoState): DemoState {
  return { ...state, appointments: state.appointments.filter((item) => item.childId === state.activeChildId), notes: state.notes.filter((item) => item.childId === state.activeChildId) };
}
export function childProfile(state: DemoState) {
  const child = requireChild(state, state.activeChildId);
  return { ...child, age: formatAge(child.ageMonths), initials: child.name.slice(0, 2).toLocaleUpperCase('pt-BR') };
}
