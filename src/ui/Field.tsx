import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
export function Field({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return <label className="field"><span>{label}</span><input {...props} /></label>;
}
export function TextareaField({ label, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return <label className="field"><span>{label}</span><textarea className="resize-none" style={{ resize: 'none' }} {...props} /></label>;
}
