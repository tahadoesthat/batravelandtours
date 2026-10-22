import React from 'react';
import type { Metadata } from 'next';
import { getOrCreateAdminProfile } from '@/lib/prisma';
import TopBar from '@/components/public/TopBar';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import InquiryForm from '@/components/public/InquiryForm';
import WhatsAppCTA from '@/components/public/WhatsAppCTA';
import Link from 'next/link';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Contact the Atelier | Bilawal Abdullah Travels',
  description:
    'Get in touch with Bilawal Abdullah Travels for bespoke itinerary curation, private expedition planning, and consular visa dossier assistance.',
};

export default async function ContactPage() {
  const adminProfile = await getOrCreateAdminProfile();
  const authorName = adminProfile.name || 'Bilawal Abdullah';
  const authorPhone = adminProfile.phone || '+92 300 8453303';
  const cleanPhone = authorPhone.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone || '923008453303'}?text=${encodeURIComponent(`Hello ${authorName} Travels! I would like to get in touch regarding bespoke travel or visa assistance.`)}`;

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
          <span className="text-brand-emerald font-semibold">Contact</span>
        </div>

        {/* Hero Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-emerald/10 text-brand-emerald text-xs uppercase tracking-widest font-semibold mb-3">
            <span>Direct Concierge Desk</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-brand-charcoal mb-4">
            Connect With {authorName}&apos;s Atelier
          </h1>
          <p className="font-sans text-brand-slate text-sm sm:text-base leading-relaxed">
            Whether you are embarking on a private expedition across the Amalfi Coast or preparing a Canadian or Schengen visa dossier, our consultation desk is here to assist.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: WhatsApp */}
          <div className="bg-white rounded-2xl p-6 border border-brand-stone/80 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-brand-emerald/10 text-brand-emerald flex items-center justify-center mb-4">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-brand-charcoal mb-1">
                WhatsApp Desk
              </h3>
              <p className="text-xs text-brand-slate mb-2">
                Instant preliminary scan review, inquiries &amp; rapid correspondence.
              </p>
              <span className="text-xs font-mono font-semibold text-brand-charcoal block mb-3">
                {authorPhone}
              </span>
            </div>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase font-semibold text-brand-emerald hover:text-brand-pine tracking-wider flex items-center gap-1.5"
            >
              <span>Message on WhatsApp</span>
              <span>→</span>
            </a>
          </div>

          {/* Card 2: Email */}
          <div className="bg-white rounded-2xl p-6 border border-brand-stone/80 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-brand-emerald/10 text-brand-emerald flex items-center justify-center mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-brand-charcoal mb-1">
                Email Dispatch
              </h3>
              <p className="text-xs text-brand-slate mb-4">
                Send formal proposals, partnership inquiries, or dossier scans.
              </p>
            </div>
            <a
              href="mailto:bookings@batravelandtour.com"
              className="text-xs uppercase font-semibold text-brand-emerald hover:text-brand-pine tracking-wider"
            >
              bookings@batravelandtour.com
            </a>
          </div>

          {/* Card 3: Studio Location */}
          <div className="bg-white rounded-2xl p-6 border border-brand-stone/80 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-brand-emerald/10 text-brand-emerald flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-brand-charcoal mb-1">
                Consular Atelier
              </h3>
              <p className="text-xs text-brand-slate mb-4">
                Based in Lahore, Pakistan with field operations across Bali &amp; Europe.
              </p>
            </div>
            <span className="text-xs text-brand-slate font-medium">
              By Private Appointment Only
            </span>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="w-full">
          <InquiryForm targetPackage="General Inquiry" />
        </div>
      </div>

      <WhatsAppCTA phoneNumber={adminProfile.phone} variant="floating" />
      <Footer />
    </main>
  );
}
