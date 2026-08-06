import React from "react";

type ButtonVariant = "primary" | "ghost" | "outline" | "danger" | "icon" | "glass";
type ButtonSize = "xs" | "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-[#f95716] hover:bg-[#e04708] text-white shadow-lg shadow-[#f95716]/25 hover:shadow-[#f95716]/40",
  ghost:   "bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 hover:border-white/20",
  outline: "bg-transparent border border-white/20 text-white hover:border-white/40 hover:bg-white/5",
  danger:  "bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 hover:border-red-400/50",
  icon:    "bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10",
  glass:   "glass text-white hover:bg-white/10",
};

const SIZES: Record<ButtonSize, string> = {
  xs: "px-2.5 py-1.5 text-[11px] rounded-lg gap-1.5",
  sm: "px-3.5 py-2 text-xs rounded-xl gap-2",
  md: "px-5 py-2.5 text-sm rounded-xl gap-2",
  lg: "px-7 py-3.5 text-base rounded-2xl gap-2.5",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = "",
  disabled,
  ...props
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center font-bold transition-all duration-200 cursor-pointer select-none",
        "active:scale-95 focus-visible:ring-2 focus-visible:ring-[#f95716] focus-visible:ring-offset-1 focus-visible:ring-offset-[#07080c]",
        VARIANTS[variant],
        SIZES[size],
        isDisabled ? "opacity-50 cursor-not-allowed active:scale-100" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        leftIcon
      )}
      {children && <span>{children}</span>}
      {!isLoading && rightIcon}
    </button>
  );
};
