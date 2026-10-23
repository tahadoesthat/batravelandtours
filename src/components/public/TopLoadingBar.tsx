'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Compass, Loader2 } from 'lucide-react';

export default function TopLoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // Turn off loading once pathname or searchParams changes
  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]);

  // Intercept all internal link clicks to immediately trigger the top loading indicator
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      const targetAttr = target.getAttribute('target');

      // Ignore external links, downloads, hash-only anchors, or new tabs
      if (
        !href ||
        href.startsWith('http') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#') ||
        targetAttr === '_blank' ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      // Check if clicking link to current exact URL
      const currentUrl = window.location.pathname + window.location.search;
      if (href === currentUrl || href === window.location.pathname) {
        return;
      }

      // Show the loading indicator popup immediately
      setIsLoading(true);
    };

    const handleCustomStart = () => setIsLoading(true);
    const handleCustomStop = () => setIsLoading(false);

    document.addEventListener('click', handleAnchorClick, { capture: true });
    window.addEventListener('app:loading:start', handleCustomStart);
    window.addEventListener('app:loading:stop', handleCustomStop);

    return () => {
      document.removeEventListener('click', handleAnchorClick, { capture: true });
      window.removeEventListener('app:loading:start', handleCustomStart);
      window.removeEventListener('app:loading:stop', handleCustomStop);
    };
  }, []);

  // Safety auto-dismiss after 10s if route never completes
  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => setIsLoading(false), 10000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Loading page content"
      className="pointer-events-none fixed inset-x-0 top-0 z-[99999] flex flex-col items-center"
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
