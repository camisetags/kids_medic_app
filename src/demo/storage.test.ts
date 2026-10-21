import { expect, test, vi } from 'vitest';
import { loadDemo, persistDemo } from './storage';
const now = new Date(2026, 9, 21, 12);
const empty = { version: 1 as const, appointments: [], notes: [] };
const storage = (value: string | null) => ({ getItem: () => value, setItem: vi.fn() }) as unknown as Storage;
const blocked = () => { throw new Error('Blocked'); };
test('recupera estado válido', () => {
  expect(loadDemo(storage(JSON.stringify(empty)), now).state).toEqual(empty);
});
test.each(['invalid', '{"version":2}', '{"version":1,"appointments":[],"notes":[{}]}'])('recupera dados inválidos', (value) => {
  const loaded = loadDemo(storage(value), now);
  expect(loaded.state.version).toBe(1);
  expect(loaded.notice).toBeTruthy();
});
test('sem armazenamento mantém demo em memória', () => {
  expect(loadDemo(undefined, now).state.version).toBe(1);
  expect(persistDemo(undefined, empty)).toBe(false);
});
test('leitura bloqueada recupera exemplos com aviso', () => {
  expect(loadDemo({ getItem: blocked } as unknown as Storage, now).notice).toBeTruthy();
});
test('gravação bloqueada não derruba a aplicação', () => {
  expect(persistDemo({ setItem: blocked } as unknown as Storage, empty)).toBe(false);
});
test('grava esquema e chave versionados', () => {
  const store = storage(null);
  expect(persistDemo(store, empty)).toBe(true);
  expect(store.setItem).toHaveBeenCalledWith('kids-medic-demo:v1', JSON.stringify(empty));
});
