export type VisitKind = 'first' | 'follow-up';
export type Appointment = { id: string; kind: VisitKind; date: string; time: string; status: 'scheduled' | 'cancelled' };
export type Note = { id: string; title: string; body: string; updatedAt: string };
export type DemoState = { version: 1; appointments: Appointment[]; notes: Note[] };
export type BookingInput = Pick<Appointment, 'kind' | 'date' | 'time'>;
export type NoteInput = Pick<Note, 'title' | 'body'>;
