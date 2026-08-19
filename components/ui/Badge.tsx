import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "brand" | "cyan" | "emerald" | "amber" | "neutral" | "outline";
  dot?: boolean;
  pulse?: boolean;
}

export function Badge({
  className,
  variant = "brand",
  dot = false,
  pulse = false,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    brand: "bg-brand-500/10 text-brand-300 border-brand-500/20",
    cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    neutral: "bg-white/[0.05] text-neutral-300 border-white/10",
    outline: "bg-transparent text-neutral-400 border-white/15",
  };

  const dotStyles = {
    brand: "bg-brand-400",
    cyan: "bg-cyan-400",
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
    neutral: "bg-neutral-400",
    outline: "bg-neutral-400",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border tracking-wide",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          {pulse && (
            <span
              className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                dotStyles[variant]
              )}
            />
          )}
          <span
            className={cn(
              "relative inline-flex rounded-full h-1.5 w-1.5",
              dotStyles[variant]
            )}
          />
        </span>
      )}
      {children}
    </div>
  );
}
