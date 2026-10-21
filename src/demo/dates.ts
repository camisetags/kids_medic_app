import type { DemoState } from './types';
export const times = ['09:00', '10:00', '11:00', '14:00', '15:00'];
export function dateKey(date: Date): string {
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
}
export function addDays(date: Date, count: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + count, 12);
}
export function getDemoDays(now: Date): string[] {
  return Array.from({ length: 14 }, (_, index) => dateKey(addDays(now, index + 1)));
}
export function isWeekday(date: string): boolean {
  const day = new Date(`${date}T12:00:00`).getDay();
  return day > 0 && day < 6;
}
export function getAvailableTimes(state: DemoState, date: string, now: Date): string[] {
  if (!getDemoDays(now).includes(date) || !isWeekday(date)) return [];
  const reserved = state.appointments.filter((item) => item.date === date && item.status === 'scheduled');
  return times.filter((time) => !reserved.some((item) => item.time === time));
}
export function formatDate(date: string, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('pt-BR', options ?? { day: 'numeric', month: 'long' }).format(new Date(`${date}T12:00:00`));
}
export function appointmentTime(date: string, time: string): number {
  return new Date(`${date}T${time}:00`).getTime();
}
