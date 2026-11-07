import type { Child, ChildInput, DemoState } from './types';
export function validChild(input: ChildInput): boolean {
  return [input.name, input.guardian].every((text) => typeof text === 'string' && text.trim().length > 0 && text.trim().length <= 120)
    && Number.isInteger(input.ageMonths) && input.ageMonths >= 0 && input.ageMonths <= 216;
}
export function requireChild(state: DemoState, id: string): Child {
  const child = state.children.find((item) => item.id === id);
  if (!child) throw new Error('Selecione uma criança cadastrada.');
  return child;
}
export function saveChild(state: DemoState, input: ChildInput, id?: string): DemoState {
  if (!validChild(input)) throw new Error('Preencha os nomes e uma idade inteira entre 0 e 216 meses.');
  if (id) requireChild(state, id);
  const child: Child = { ...input, name: input.name.trim(), guardian: input.guardian.trim(), id: id ?? crypto.randomUUID() };
  const children = id ? state.children.map((item) => item.id === id ? child : item) : [...state.children, child];
  return { ...state, children };
}
export function selectChild(state: DemoState, id: string): DemoState {
  requireChild(state, id);
  return { ...state, activeChildId: id };
}
export function formatAge(months: number): string {
  if (months < 12) return `${months} ${months === 1 ? 'mês' : 'meses'}`;
  const years = Math.floor(months / 12), remainder = months % 12;
  return `${years} ${years === 1 ? 'ano' : 'anos'}${remainder ? ` e ${remainder} ${remainder === 1 ? 'mês' : 'meses'}` : ''}`;
}
