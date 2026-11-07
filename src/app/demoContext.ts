import { createContext } from 'react';
import type { BookingInput, DemoState, NoteInput, ChildInput, SlotInput } from '../demo/types';
export type DemoValue = { state: DemoState; notice: string | null; book: (input: BookingInput) => void; cancel: (id: string) => void; save: (input: NoteInput, id?: string) => void; remove: (id: string) => void; saveChild: (input: ChildInput, id?: string) => void; selectChild: (id: string) => void; reschedule: (id: string, input: SlotInput) => void; reset: () => void };
export const DemoContext = createContext<DemoValue | undefined>(undefined);
