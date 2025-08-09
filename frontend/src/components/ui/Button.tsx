import { ButtonHTMLAttributes } from "react";

export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
  className={`inline-flex items-center justify-center rounded-md border border-[var(--color-border)] bg-white px-3 py-2 text-sm font-medium text-[var(--color-foreground)] shadow-sm transition-colors hover:bg-[var(--color-primary-50)] disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}
