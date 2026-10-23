import React from 'react';
import { Compass } from 'lucide-react';

export default function Loading() {
  return (
    <div
      aria-live="polite"
      aria-label="Loading page content"
      className="fixed inset-0 z-[99999] pointer-events-none flex flex-col items-center"
    >
      {/* 1. Ultra-sleek top edge glowing progress bar */}
      <div className="h-[3px] w-full bg-emerald-950/20 overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-emerald-500 via-teal-300 to-emerald-400 animate-pulse origin-left" />
      </div>

      {/* 2. Floating Pop-up Badge right below top edge */}
      <div className="mt-3.5 inline-flex items-center gap-2.5 rounded-full bg-[#182622]/95 px-4 py-2 text-xs font-semibold text-white shadow-2xl backdrop-blur-md border border-emerald-500/40 ring-1 ring-white/10 animate-bounce duration-1000">
        <Compass className="h-4 w-4 animate-spin text-emerald-400" />
        <span className="tracking-wide text-emerald-50">Loading...</span>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
      </div>
    </div>
  );
}
