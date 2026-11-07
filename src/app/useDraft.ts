import { useState } from 'react';
import { useUnsavedGuard } from './useUnsavedGuard';
function commitDraft<T>(input: T, save: (input: T) => void, close: () => void, error: (message: string) => void) {
  try { save(input); close(); }
  catch (failure) {
    error(failure instanceof Error ? failure.message : 'Não foi possível salvar. Tente novamente.');
    window.setTimeout(() => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(), 0);
  }
}
export function useDraft<T>(initial: T, onSave: (input: T) => void, onClose: () => void) {
  const [input, change] = useState(initial);
  const [error, setError] = useState(''), [discarding, setDiscarding] = useState(false);
  const dirty = JSON.stringify(input) !== JSON.stringify(initial);
  const blocker = useUnsavedGuard(dirty);
  return { input, error, change, dirty, discarding, blocked: blocker.state === 'blocked', save: () => commitDraft(input, onSave, onClose, setError), close: () => dirty ? setDiscarding(true) : onClose(), discard: () => blocker.state === 'blocked' ? blocker.proceed() : onClose(), keep: () => { setDiscarding(false); blocker.reset?.(); } };
}
export type DraftModel<T> = ReturnType<typeof useDraft<T>>;
