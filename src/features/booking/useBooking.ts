import { useState, type Dispatch, type SetStateAction } from 'react';
import { useDemo } from '../../app/useDemo';
import type { BookingInput } from '../../demo/types';
function completeBooking(input: BookingInput, book: (input: BookingInput) => void, setStep: (step: number) => void, setError: (error: string) => void) {
  try { book(input); setStep(3); }
  catch (error) { setError(error instanceof Error ? error.message : 'Não foi possível concluir. Tente outro horário.'); }
}
function changeBooking(setInput: Dispatch<SetStateAction<BookingInput>>, setError: (error: string) => void, patch: Partial<BookingInput>) {
  setInput((current) => ({ ...current, ...patch }));
  setError('');
}
export function useBooking() {
  const [input, setInput] = useState<BookingInput>({ kind: 'first', date: '', time: '' });
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
  const { book } = useDemo();
  return { input, step, error, setStep, change: (patch: Partial<BookingInput>) => changeBooking(setInput, setError, patch), finish: () => completeBooking(input, book, setStep, setError) };
}
export type BookingModel = ReturnType<typeof useBooking>;
