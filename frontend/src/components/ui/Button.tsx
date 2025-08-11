import { ButtonHTMLAttributes } from "react";
import { Icon } from './Icon';

type ButtonVariant = "default" | "primary" | "success" | "danger" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
}

const variants = {
  default: "bg-white border-gray-300 text-gray-700 hover:bg-wilderness-green-50 hover:border-wilderness-green-300 hover:text-wilderness-green-600",
  primary: "bg-wilderness-green-600 border-transparent text-white hover:bg-wilderness-green-700 shadow-md hover:shadow-lg",
  success: "bg-green-500 border-transparent text-white hover:bg-green-600 shadow-md hover:shadow-lg",
  danger: "bg-red-500 border-transparent text-white hover:bg-red-600 shadow-md hover:shadow-lg",
  outline: "bg-transparent border-wilderness-green-500 text-wilderness-green-500 hover:bg-wilderness-green-50 hover:border-wilderness-green-600",
  ghost: "bg-transparent border-transparent text-wilderness-green-600 hover:bg-wilderness-green-100",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2.5",
};

export function Button({ 
  className = "", 
  variant = "default", 
  size = "md", 
  loading = false,
  disabled,
  children,
  icon,
  iconPosition = 'left',
  ...props 
}: ButtonProps) {
  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 20
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md border font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Loading...
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <Icon name={icon} size={iconSizes[size]} />
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <Icon name={icon} size={iconSizes[size]} />
          )}
        </>
      )}
    </button>
  );
}

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  ariaLabel: string;
}

export function IconButton({
  icon,
  variant = "ghost",
  size = "md",
  className = "",
  ariaLabel,
  ...props
}: IconButtonProps) {
  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };
  
  const buttonSizes = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3",
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md border font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 ${variants[variant]} ${buttonSizes[size]} ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      <Icon name={icon} size={iconSizes[size]} />
    </button>
  );
}
