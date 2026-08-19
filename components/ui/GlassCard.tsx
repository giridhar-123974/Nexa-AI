"use client";

import React, { useRef, useState, MouseEvent } from "react";
import { cn } from "@/lib/utils";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  spotlight?: boolean;
  borderGlow?: boolean;
  hoverScale?: boolean;
  hoverElevation?: boolean;
}

export function GlassCard({
  className,
  spotlight = true,
  borderGlow = false,
  hoverScale = false,
  hoverElevation = false,
  children,
  ...props
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!spotlight || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative rounded-2xl bg-surface-200/80 backdrop-blur-xl border border-white/[0.08] transition-all duration-300 overflow-hidden",
        (hoverScale || hoverElevation) && "hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]",
        borderGlow && isHovered && "border-brand-500/40 shadow-[0_0_30px_rgba(99,102,241,0.15)]",
        className
      )}
      {...props}
    >
      {/* Dynamic mouse spotlight reflection */}
      {spotlight && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.12), transparent 80%)`,
          }}
        />
      )}

      {/* Surface ambient gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
