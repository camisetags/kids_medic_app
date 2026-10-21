import type { BookingInput, DemoState, NoteInput } from '../demo/types';
import { bookAppointment, cancelAppointment } from '../demo/appointments';
import { saveNote, deleteNote } from '../demo/notes';
import { createDemoState } from '../demo/seed';
type Commit = (state: DemoState) => void;
function appointmentActions(state: DemoState, commit: Commit) {
  return { book: (input: BookingInput) => commit(bookAppointment(state, input, new Date())), cancel: (id: string) => commit(cancelAppointment(state, id)) };
}
function noteActions(state: DemoState, commit: Commit) {
  return { save: (input: NoteInput, id?: string) => commit(saveNote(state, input, new Date(), id)), remove: (id: string) => commit(deleteNote(state, id)) };
}
export function demoActions(state: DemoState, commit: Commit) {
  return { ...appointmentActions(state, commit), ...noteActions(state, commit), reset: () => commit(createDemoState(new Date())) };
}
