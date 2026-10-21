import type { ReactNode } from 'react';
export function Heading({ eyebrow, title, description, children }: { eyebrow?: string; title: string; description?: string; children?: ReactNode }) {
  return <header className="page-heading"><div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h1>{title}</h1>{description && <p>{description}</p>}</div>{children}</header>;
}
