import { expect, test } from 'vitest';
import { getDemoDays, getAvailableTimes } from './dates';
import { bookAppointment, cancelAppointment, getNextAppointment } from './appointments';
import { saveNote, deleteNote } from './notes';
import type { DemoState } from './types';
const now = new Date(2026, 9, 21, 12);
const empty = (): DemoState => ({ version: 1, appointments: [], notes: [] });
const visit = { kind: 'first' as const, date: '2026-10-22', time: '09:00' };
test('janela local cruza ano', () => {
  const days = getDemoDays(new Date(2026, 11, 31, 23));
  expect(days).toHaveLength(14);
  expect(days[0]).toBe('2027-01-01');
  expect(days[13]).toBe('2027-01-14');
});
test('janela local cruza fevereiro', () => {
  const days = getDemoDays(new Date(2028, 1, 28, 23));
  expect(days[0]).toBe('2028-02-29');
  expect(days[13]).toBe('2028-03-13');
});
test.each(['2026-10-24', '2026-10-20', '2026-11-10', 'invalid'])('indisponível: %s', (date) => {
  expect(getAvailableTimes(empty(), date, now)).toEqual([]);
});
test('criar consulta retira horário da disponibilidade', () => {
  const state = bookAppointment(empty(), visit, now);
  expect(state.appointments[0]).toMatchObject({ ...visit, status: 'scheduled' });
  expect(getAvailableTimes(state, visit.date, now)).not.toContain('09:00');
});
test('horário duplicado é rejeitado', () => {
  const state = bookAppointment(empty(), visit, now);
  expect(() => bookAppointment(state, visit, now)).toThrow();
});
test('seleção que venceu durante a sessão é rejeitada', () => {
  expect(() => bookAppointment(empty(), visit, new Date(2026, 9, 22, 12))).toThrow();
});
test('cancelamento libera o horário', () => {
  const state = bookAppointment(empty(), visit, now);
  const cancelled = cancelAppointment(state, state.appointments[0].id);
  expect(getAvailableTimes(cancelled, visit.date, now)).toContain('09:00');
  expect(getNextAppointment(cancelled, now)).toBeUndefined();
});
test('próxima consulta independe da ordem de inserção', () => {
  const later = bookAppointment(empty(), { ...visit, date: '2026-10-23' }, now);
  const state = bookAppointment(later, visit, now);
  expect(getNextAppointment(state, now)?.date).toBe('2026-10-22');
  expect(getNextAppointment(state, new Date(2026, 9, 24))).toBeUndefined();
});
test('notas criadas editadas e excluídas', () => {
  const first = saveNote(empty(), { title: 'Perguntas', body: 'Exemplo' }, now);
  const edited = saveNote(first, { title: 'Revisado', body: 'Outro exemplo' }, now, first.notes[0].id);
  expect(edited.notes).toHaveLength(1);
  expect(edited.notes[0].title).toBe('Revisado');
  expect(deleteNote(edited, first.notes[0].id).notes).toEqual([]);
});
test.each([{ title: ' ', body: 'Exemplo' }, { title: 'Título', body: '  ' }])('rejeita nota vazia', (input) => {
  expect(() => saveNote(empty(), input, now)).toThrow();
});
test('preserva marcação como texto', () => {
  const saved = saveNote(empty(), { title: 'Exemplo', body: '<script>exemplo</script>' }, now);
  expect(saved.notes[0].body).toBe('<script>exemplo</script>');
});
