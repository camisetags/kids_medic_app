import type { ReactNode } from 'react';
import { Sprout } from 'lucide-react';
export function EmptyState({ title, description, children }: { title: string; description: string; children?: ReactNode }) {
  return <div className="empty-state"><Sprout size={36} strokeWidth={1.4} /><h3>{title}</h3><p>{description}</p>{children}</div>;
}
