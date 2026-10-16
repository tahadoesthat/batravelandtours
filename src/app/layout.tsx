import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans, Caveat } from 'next/font/google';
import './globals.css';
import AnalyticsTracker from '@/components/public/AnalyticsTracker';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bilawal Abdullah Travels | Travel Photographer & Bespoke Itineraries',
  description:
    'Inspiring travel stories, honest destination guides, curated photography, and bespoke luxury itineraries by Bilawal Abdullah.',
  keywords: [
    'travel blog',
    'luxury travel',
    'itineraries',
    'travel photography',
    'Bilawal Abdullah',
    'Amalfi Coast',
    'Bali',
    'Kyoto',
  ],
  authors: [{ name: 'Bilawal Abdullah' }],
  openGraph: {
    title: 'Bilawal Abdullah Travels | Travel Blog & Bespoke Itineraries',
    description:
      'Inspiring stories, useful travel tips, and breathtaking destinations to fuel your wanderlust.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Bilawal Abdullah Travels',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${plusJakarta.variable} ${playfair.variable} ${caveat.variable} font-sans bg-brand-alabaster text-brand-charcoal min-h-screen selection:bg-brand-emerald selection:text-white`}
      >
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
