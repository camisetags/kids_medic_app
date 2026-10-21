import { createContext } from 'react';
import type { BookingInput, DemoState, NoteInput } from '../demo/types';
export type DemoValue = { state: DemoState; notice: string | null; book: (input: BookingInput) => void; cancel: (id: string) => void; save: (input: NoteInput, id?: string) => void; remove: (id: string) => void; reset: () => void };
export const DemoContext = createContext<DemoValue | undefined>(undefined);
