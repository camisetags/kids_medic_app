import { Info } from 'lucide-react';
export function StatusMessage({ message }: { message: string | null }) {
  return <div className={message ? 'status-message' : 'sr-only'} role="status" aria-live="polite">{message && <><Info size={17} /><span>{message}</span></>}</div>;
}
