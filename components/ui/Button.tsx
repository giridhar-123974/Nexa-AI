"use client";

import React, { forwardRef, useRef, useState, MouseEvent } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glass" | "gradient";
  size?: "sm" | "md" | "lg" | "icon";
  asChild?: boolean;
  magnetic?: boolean;
  glow?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      magnetic = false,
      glow = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
      if (!magnetic || disabled) return;
      const el = buttonRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      setOffset({ x: x * 0.15, y: y * 0.15 });
    };

    const handleMouseLeave = () => {
      if (!magnetic) return;
      setOffset({ x: 0, y: 0 });
    };

    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 select-none rounded-xl active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed relative group overflow-hidden";

    const variantStyles = {
      primary:
        "bg-white text-neutral-950 hover:bg-neutral-100 shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] font-semibold",
      secondary:
        "bg-surface-100 text-neutral-100 border border-surface-border hover:bg-surface-50 hover:border-surface-border-hover shadow-sm",
      outline:
        "bg-transparent text-neutral-200 border border-white/15 hover:bg-white/[0.06] hover:border-white/30",
      ghost:
        "bg-transparent text-neutral-400 hover:text-white hover:bg-white/[0.05]",
      glass:
        "bg-white/[0.04] backdrop-blur-md text-white border border-white/10 hover:bg-white/[0.08] hover:border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.3)]",
      gradient:
        "bg-gradient-to-r from-brand-500 via-indigo-500 to-cyan-500 text-white font-semibold shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(99,102,241,0.6)] hover:brightness-110",
    };

    const sizeStyles = {
      sm: "h-9 px-3.5 text-xs gap-1.5",
      md: "h-11 px-5 text-sm gap-2",
      lg: "h-13 px-7 text-base gap-2.5 rounded-2xl",
      icon: "h-10 w-10 p-0 text-sm",
    };

    return (
      <button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          glow && "shadow-[0_0_30px_rgba(99,102,241,0.35)]",
          className
        )}
        disabled={disabled}
        {...props}
      >
        {/* Subtle shine hover effect */}
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span className="relative z-10">{children}</span>
        {rightIcon && <span className="shrink-0 transition-transform group-hover:translate-x-0.5">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
