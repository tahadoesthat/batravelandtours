import React from 'react';
import Link from 'next/link';
import TopBar from '@/components/public/TopBar';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-brand-alabaster flex flex-col selection:bg-brand-emerald selection:text-white">
      <TopBar />
      <Header />

      <div className="flex-1 max-w-3xl mx-auto px-4 py-24 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-brand-emerald/10 text-brand-emerald flex items-center justify-center mb-6">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>
        <span className="text-xs uppercase tracking-widest font-mono font-semibold text-brand-emerald mb-2">
          Error 404 • Lost in Transit
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-charcoal mb-4">
          Dossier or Page Not Found
        </h1>
        <p className="text-sm text-brand-slate max-w-md mx-auto mb-8 leading-relaxed">
          The destination or consular guide you requested does not exist or has been relocated to another dossier route.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-brand-emerald hover:bg-brand-pine text-white text-xs uppercase tracking-wider font-semibold transition shadow-md flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Sanctuary</span>
          </Link>
          <Link
            href="/visas"
            className="px-6 py-3 rounded-full bg-white hover:bg-brand-alabaster text-brand-emerald border border-brand-stone text-xs uppercase tracking-wider font-semibold transition shadow-sm"
          >
            <span>Explore Visas Directory</span>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
