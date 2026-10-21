import type { ButtonHTMLAttributes } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
export function Button({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={`button ${className}`} {...props} />;
}
export function ActionLink({ className = '', ...props }: LinkProps) {
  return <Link className={`button ${className}`} {...props} />;
}
