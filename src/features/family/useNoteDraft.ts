import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { useDemo } from '../../app/useDemo';
import type { Note, NoteInput } from '../../demo/types';
type Draft = { input: NoteInput; error: string; discarding: boolean };
type SetDraft = Dispatch<SetStateAction<Draft>>;
function preventUnload(event: BeforeUnloadEvent) {
  event.preventDefault();
  event.returnValue = '';
}
function useUnsavedGuard(dirty: boolean) {
  useEffect(() => {
    if (dirty) window.addEventListener('beforeunload', preventUnload);
    return () => window.removeEventListener('beforeunload', preventUnload);
  }, [dirty]);
}
function initialInput(note: Note | undefined, title: string): NoteInput {
  return { title: note?.title ?? title, body: note?.body ?? '' };
}
function requestClose(dirty: boolean, setDraft: SetDraft, close: () => void) {
  if (dirty) setDraft((current) => ({ ...current, discarding: true }));
  else close();
}
function saveDraft(input: NoteInput, save: (input: NoteInput, id?: string) => void, id: string | undefined, setDraft: SetDraft, close: () => void) {
  try { save(input, id); close(); }
  catch (error) { setDraft((current) => ({ ...current, error: (error as Error).message })); document.querySelector<HTMLInputElement>(!input.title.trim() ? '#note-title' : '#note-body')?.focus(); }
}
export function useNoteDraft(note: Note | undefined, title: string, close: () => void) {
  const [draft, setDraft] = useState<Draft>({ input: initialInput(note, title), error: '', discarding: false });
  const { save } = useDemo();
  const dirty = draft.input.title !== initialInput(note, title).title || draft.input.body !== initialInput(note, title).body;
  useUnsavedGuard(dirty);
  return { ...draft, dirty, change: (input: NoteInput) => setDraft((current) => ({ ...current, input, error: '' })), close: () => requestClose(dirty, setDraft, close), save: () => saveDraft(draft.input, save, note?.id, setDraft, close), keep: () => setDraft((current) => ({ ...current, discarding: false })) };
}
