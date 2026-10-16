import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, pattern = 'MMMM d, yyyy'): string {
  try {
    const d = typeof date === 'string' ? new Date(date) : date;
    return format(d, pattern);
  } catch {
    return 'Recent';
  }
}

export function formatRelativeTime(date: string | Date): string {
  try {
    const d = typeof date === 'string' ? new Date(date) : date;
    return formatDistanceToNow(d, { addSuffix: true });
  } catch {
    return 'Just now';
  }
}

export function calculateReadingTime(textOrHtml: string): number {
  if (!textOrHtml) return 3;
  // Strip HTML tags
  const plainText = textOrHtml.replace(/<[^>]*>?/gm, ' ');
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;
  // Average reading speed 200 words/min
  const minutes = Math.ceil(words / 200);
  return Math.max(1, minutes);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}
