import type { ButtonHTMLAttributes } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
export function Button({ className = '', onClick, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={`button ${className}`} onClick={onClick} {...props} />;
}
export function ActionLink({ className = '', ...props }: LinkProps) {
  return <Link className={`button ${className}`} {...props} />;
}
