'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    // Only track public visits, avoid duplicate tracking for the same path
    if (pathname && !pathname.startsWith('/admin') && !pathname.startsWith('/api') && lastPath.current !== pathname) {
      lastPath.current = pathname;
      try {
        fetch('/api/analytics/visit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: pathname }),
          // keepalive ensures the request finishes even if user navigates away
          keepalive: true,
        }).catch(() => {
          // silently catch
        });
      } catch {
        // silently catch
      }
    }
  }, [pathname]);

  return null;
}
