import React from 'react';
import type { Metadata } from 'next';
import { getOrCreateAdminProfile } from '@/lib/prisma';
import TopBar from '@/components/public/TopBar';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import CreatorCard from '@/components/public/CreatorCard';
import WhatsAppCTA from '@/components/public/WhatsAppCTA';
import Link from 'next/link';
import { ArrowRight, Compass, ShieldCheck, HeartHandshake } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'About the Atelier & Bilawal Abdullah | Bilawal Abdullah Travels',
  description:
    'Learn about Bilawal Abdullah Travels — a private boutique travel publication and consular advisory atelier founded by Bilawal Abdullah.',
};

export default async function AboutPage() {
  const adminProfile = await getOrCreateAdminProfile();

  return (
    <main className="min-h-screen bg-brand-alabaster flex flex-col selection:bg-brand-emerald selection:text-white">
      <TopBar />
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-8 text-xs tracking-wider uppercase text-brand-slate font-medium">
          <Link href="/" className="hover:text-brand-emerald transition-colors">
            Home
          </Link>
          <span className="text-brand-stone">/</span>
          <span className="text-brand-emerald font-semibold">About The Atelier</span>
        </div>

        {/* Hero Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-emerald/10 text-brand-emerald text-xs uppercase tracking-widest font-semibold mb-3">
            <span>Atelier Philosophy</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-brand-charcoal mb-4">
            Curated Expeditions, Stillness &amp; Consular Rigor
          </h1>
          <p className="font-sans text-brand-slate text-sm sm:text-base leading-relaxed">
            {adminProfile.name || 'Bilawal Abdullah'} Travels was born from a desire to bring architectural elegance, honest storytelling, and meticulous consular precision to the world of bespoke luxury journeys.
          </p>
        </div>

        {/* Creator Dossier */}
        <div className="w-full">
          <CreatorCard adminProfile={adminProfile} />
        </div>

        {/* 3 Pillars of Atelier */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16">
          <div className="bg-white rounded-2xl p-6 border border-brand-stone/80 shadow-subtle">
            <div className="w-10 h-10 rounded-full bg-brand-alabaster flex items-center justify-center text-brand-emerald mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-brand-charcoal mb-2">
              Bespoke Curation
            </h3>
            <p className="text-xs text-brand-slate leading-relaxed">
              Every travel itinerary is hand-crafted from on-the-ground exploration, prioritizing quiet luxury, cultural reverence, and architectural intimacy over crowded tourist traps.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-brand-stone/80 shadow-subtle">
            <div className="w-10 h-10 rounded-full bg-brand-alabaster flex items-center justify-center text-brand-emerald mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-brand-charcoal mb-2">
              Consular Evidentiary Discipline
            </h3>
            <p className="text-xs text-brand-slate leading-relaxed">
              We approach visa documentation with forensic care. High-resolution 300 DPI flatbed scans, financial solvency ratios, and proof of ties are audited before official lodgment.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-brand-stone/80 shadow-subtle">
            <div className="w-10 h-10 rounded-full bg-brand-alabaster flex items-center justify-center text-brand-emerald mb-4">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-brand-charcoal mb-2">
              Direct Concierge Support
            </h3>
            <p className="text-xs text-brand-slate leading-relaxed">
              No generic ticket queues. Every client communicates directly with our consultation desk via private WhatsApp and email, with swift 24-hour response turnaround.
            </p>
          </div>
        </div>

        {/* Quick CTA to Visas & Contact */}
        <div className="bg-brand-emerald text-white rounded-2xl p-8 shadow-elevated flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl font-semibold mb-2">
              Ready to Plan Your Next Journey?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-lg">
              Explore our 9 consular visa guides or send a direct inquiry to discuss bespoke travel arrangements.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/visas"
              className="px-6 py-3 rounded-full bg-white text-brand-emerald hover:bg-brand-alabaster text-xs uppercase tracking-wider font-semibold transition"
            >
              Explore Visas
            </Link>
            <Link
              href="/#inquiry-form"
              className="px-6 py-3 rounded-full bg-brand-pine text-white hover:bg-white hover:text-brand-emerald text-xs uppercase tracking-wider font-semibold transition border border-white/20"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <WhatsAppCTA phoneNumber={adminProfile.phone} variant="floating" />
      <Footer />
    </main>
  );
}
