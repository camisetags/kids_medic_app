import type { BookingInput, DemoState, NoteInput, ChildInput, SlotInput } from '../demo/types';
import { bookAppointment, cancelAppointment, rescheduleAppointment } from '../demo/appointments';
import { saveNote, deleteNote } from '../demo/notes';
import { createDemoState } from '../demo/seed';
import { saveChild, selectChild } from '../demo/children';
type Commit = (state: DemoState) => void;
function appointmentActions(state: DemoState, commit: Commit) {
  return { reschedule: (id: string, input: SlotInput) => commit(rescheduleAppointment(state, id, input, new Date())), book: (input: BookingInput) => commit(bookAppointment(state, input, new Date())), cancel: (id: string) => commit(cancelAppointment(state, id)) };
}
function noteActions(state: DemoState, commit: Commit) {
  return { save: (input: NoteInput, id?: string) => commit(saveNote(state, input, new Date(), id)), remove: (id: string) => commit(deleteNote(state, id)) };
}
export function demoActions(state: DemoState, commit: Commit) {
  return { saveChild: (input: ChildInput, id?: string) => commit(saveChild(state, input, id)), selectChild: (id: string) => commit(selectChild(state, id)), ...appointmentActions(state, commit), ...noteActions(state, commit), reset: () => commit(createDemoState(new Date())) };
}
