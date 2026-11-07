import { expect, test } from 'vitest';
import { loadDemo } from './storage';
import { createDemoState } from './seed';
const now = new Date(2026, 10, 9, 12);
const legacy = { version: 1, appointments: [{ id: 'old', kind: 'first', date: '2026-10-22', time: '09:00', status: 'scheduled' }], notes: [{ id: 'memo', title: 'Não perder', body: 'Conteúdo existente', updatedAt: now.toISOString() }] };
function stored(value: unknown): Storage {
  return { getItem: () => JSON.stringify(value) } as unknown as Storage;
}
test('migra estado v1 e preserva consulta e anotação antigas', () => {
  const result = loadDemo(stored(legacy), now);
  expect(result.state.version).toBe(2);
  expect(result.state.appointments[0]).toMatchObject({ id: 'old', childId: 'clara' });
  expect(result.state.notes[0]).toMatchObject({ id: 'memo', body: 'Conteúdo existente', childId: 'clara' });
  expect(result.notice).toBeNull();
});
test('novos exemplos contêm três famílias e vínculo em cada registro', () => {
  const state = createDemoState(now);
  expect(state.version).toBe(2);
  expect(state).toHaveProperty('children', expect.arrayContaining([expect.objectContaining({ id: 'clara', guardian: 'Marina' })]));
  expect(state.appointments.every((visit) => 'childId' in visit)).toBe(true);
});
import { bookAppointment, rescheduleAppointment } from './appointments';
import { saveChild, selectChild } from './children';
import { familyState } from './selectors';
import { isDemoState } from './validation';
const input = { kind: 'first' as const, date: '2026-11-10', time: '09:00' };
test('conflito de horário considera todas as crianças', () => {
  const first = bookAppointment(createDemoState(now), { ...input, childId: 'clara' }, now);
  expect(() => bookAppointment(first, { ...input, childId: 'theo' }, now)).toThrow('disponível');
});
test('remarcar para o próprio horário preserva identidade e não acusa conflito', () => {
  const state = bookAppointment(createDemoState(now), input, now);
  const appointment = state.appointments.at(-1)!;
  const moved = rescheduleAppointment(state, appointment.id, input, now);
  expect(moved.appointments.at(-1)).toEqual(appointment);
});
test('remarcação rejeita horário ocupado e consulta passada', () => {
  const state = bookAppointment(createDemoState(now), input, now);
  const second = bookAppointment(state, { ...input, time: '11:00' }, now);
  expect(() => rescheduleAppointment(second, second.appointments.at(-1)!.id, input, now)).toThrow();
  expect(() => rescheduleAppointment(state, state.appointments.at(-1)!.id, input, new Date(2026, 10, 12))).toThrow();
});
test('cadastro edita sem trocar criança ativa e rejeita idade fora dos limites', () => {
  const added = saveChild(createDemoState(now), { name: '  Lucas  ', guardian: ' Ana ', ageMonths: 24 });
  expect(added.children.at(-1)).toMatchObject({ name: 'Lucas', guardian: 'Ana' });
  expect(added.activeChildId).toBe('clara');
  expect(() => saveChild(added, { name: 'X', guardian: 'Y', ageMonths: 217 })).toThrow();
});
test('família vê apenas consultas e anotações da criança selecionada', () => {
  const state = selectChild(createDemoState(now), 'theo');
  expect(familyState(state).appointments.every((visit) => visit.childId === 'theo')).toBe(true);
  expect(familyState(state).notes).toEqual([]);
  expect(() => selectChild(state, 'inexistente')).toThrow();
});
test('referências órfãs e identificadores duplicados invalidam armazenamento', () => {
  const state = createDemoState(now);
  expect(isDemoState({ ...state, activeChildId: 'inexistente' })).toBe(false);
  expect(isDemoState({ ...state, appointments: [{ ...state.appointments[0], childId: 'inexistente' }] })).toBe(false);
  expect(isDemoState({ ...state, children: [...state.children, state.children[0]] })).toBe(false);
});
