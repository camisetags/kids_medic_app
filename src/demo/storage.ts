import type { DemoState } from './types';
import { createDemoState } from './seed';
import { isDemoState } from './validation';
export const storageKey = 'kids-medic-demo:v1';
const memoryNotice = 'As mudanças ficam disponíveis nesta sessão. Seu navegador não permitiu salvar os exemplos.';
function readDemo(storage: Storage | undefined, now: Date) {
  if (!storage) throw new Error('Storage unavailable');
  const raw = storage.getItem(storageKey);
  const state: unknown = raw === null ? createDemoState(now) : JSON.parse(raw);
  if (!isDemoState(state)) throw new Error('Invalid demo state');
  return { state, notice: null };
}
export function loadDemo(storage: Storage | undefined, now: Date): { state: DemoState; notice: string | null } {
  try { return readDemo(storage, now); }
  catch { return { state: createDemoState(now), notice: storage ? 'Os exemplos foram restaurados porque os dados salvos não puderam ser lidos.' : memoryNotice }; }
}
export function persistDemo(storage: Storage | undefined, state: DemoState): boolean {
  try {
    if (!storage) return false;
    storage.setItem(storageKey, JSON.stringify(state));
    return true;
  } catch { return false; }
}
export function browserStorage(): Storage | undefined {
  try { return window.localStorage; }
  catch { return undefined; }
}
