import React from "react";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-brand-500 text-white rounded-lg font-medium shadow-lg outline-none ring-2 ring-white"
    >
      Skip to main content
    </a>
  );
}
