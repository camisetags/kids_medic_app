import { useId, type SelectHTMLAttributes, type ReactNode } from 'react';
export function SelectField({ label, children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label: string; children: ReactNode }) {
  const labelId = useId();
  return <label className="field select-field"><span id={labelId}>{label}</span><select aria-labelledby={labelId} {...props}>{children}</select></label>;
}
