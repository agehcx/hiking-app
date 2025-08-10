import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "default" | "primary" | "success" | "danger" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variants = {
  default: "bg-white border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--color-primary-50)]",
  primary: "bg-[var(--color-primary-500)] border-transparent text-white hover:bg-[var(--color-primary-600)] shadow-md",
  success: "bg-green-500 border-transparent text-white hover:bg-green-600 shadow-md",
  danger: "bg-red-500 border-transparent text-white hover:bg-red-600 shadow-md",
  outline: "bg-transparent border-[var(--color-primary-500)] text-[var(--color-primary-500)] hover:bg-[var(--color-primary-50)]",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({ 
  className = "", 
  variant = "default", 
  size = "md", 
  loading = false,
  disabled,
  children,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md border font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
      {children}
    </button>
  );
}
