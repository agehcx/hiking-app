import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

const paddings = {
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export function Card({ children, className = "", hover = false, padding = "md" }: CardProps) {
  return (
    <div 
      className={`rounded-xl border border-[var(--color-border)] bg-white shadow-sm transition-all duration-200 ${
        hover ? "hover:shadow-md hover:border-[var(--color-primary-200)] cursor-pointer" : ""
      } ${paddings[padding]} ${className}`}
    >
      {children}
    </div>
  );
}
