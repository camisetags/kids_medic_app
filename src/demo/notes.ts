import type { DemoState, NoteInput } from './types';
function cleanInput(input: NoteInput): NoteInput {
  const cleaned = { title: input.title.trim(), body: input.body.trim() };
  if (!cleaned.title || !cleaned.body) throw new Error('Preencha o título e a anotação para salvar.');
  return cleaned;
}
export function saveNote(state: DemoState, input: NoteInput, now: Date, id?: string): DemoState {
  if (id && !state.notes.some((note) => note.id === id && note.childId === state.activeChildId)) throw new Error('Anotação não encontrada nesta família.');
  const cleaned = cleanInput(input);
  const note = { ...cleaned, childId: state.activeChildId, id: id ?? crypto.randomUUID(), updatedAt: now.toISOString() };
  const notes = state.notes.some((item) => item.id === id) ? state.notes.map((item) => item.id === id ? note : item) : [note, ...state.notes];
  return { ...state, notes };
}
export function deleteNote(state: DemoState, id: string): DemoState {
  return { ...state, notes: state.notes.filter((item) => item.id !== id || item.childId !== state.activeChildId) };
}
