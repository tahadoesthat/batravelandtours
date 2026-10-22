import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { VISAS_DATA } from '@/data/visasData';
import { getOrCreateAdminProfile } from '@/lib/prisma';
import TopBar from '@/components/public/TopBar';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import WhatsAppCTA from '@/components/public/WhatsAppCTA';
import FlagIcon from '@/components/public/FlagIcon';
import { ArrowRight, ShieldCheck, Clock, Coins, FileCheck, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Consular Visa Services & Document Requirements | Bilawal Abdullah Travels',
  description:
    'Official document requirements, certified scan standards, and consular dossier curation for Canada, Schengen Europe, USA, Turkey, Thailand, Japan, Australia, Malaysia, and South Africa.',
};

export default async function VisasIndexPage() {
  const adminProfile = await getOrCreateAdminProfile();
  const visaList = Object.values(VISAS_DATA);

  return (
    <main className="min-h-screen bg-brand-alabaster flex flex-col selection:bg-brand-emerald selection:text-white">
      <TopBar />
      <Header />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-emerald/10 text-brand-emerald text-xs uppercase tracking-widest font-semibold mb-3">
            <span>Official Consular Atelier</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-brand-charcoal mb-4">
            Visa Services &amp; Document Requirements
          </h1>
          <p className="font-sans text-brand-slate text-sm sm:text-base leading-relaxed">
            Consular-grade document checklists, high-resolution scan standards, and verified dossier curation across 9 premiere global destinations.
          </p>
        </div>

        {/* Grid of Visa Guides */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {visaList.map((visa) => (
            <Link
              key={visa.slug}
              href={`/visas/${visa.slug}`}
              className="bg-white rounded-2xl p-6 border border-brand-stone/80 shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <FlagIcon countryCode={visa.countryCode} size="lg" alt={visa.name} />
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-brand-emerald/10 text-brand-emerald">
                    {visa.countryCode}
                  </span>
                </div>

                <h2 className="font-serif text-xl sm:text-2xl font-semibold text-brand-charcoal mb-1 group-hover:text-brand-emerald transition-colors">
                  {visa.name}
                </h2>
                <span className="text-xs text-brand-emerald font-semibold uppercase tracking-wider block mb-3">
                  {visa.visaType}
                </span>

                <p className="text-xs text-brand-slate line-clamp-2 mb-5 leading-relaxed">
                  {visa.subheadline}
                </p>

                {/* Metrics */}
                <div className="space-y-2 py-3 border-y border-brand-stone/50 text-xs text-brand-charcoal mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-brand-slate flex items-center gap-1.5">
                      <Coins className="w-3.5 h-3.5 text-brand-emerald" />
                      Application Charges
                    </span>
                    <span className="font-semibold">{visa.applicationFee}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-slate flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-brand-emerald" />
                      Processing Time
                    </span>
                    <span className="font-semibold">{visa.processingWindow}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-slate flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-brand-emerald" />
                      Format
                    </span>
                    <span className="font-semibold truncate max-w-[140px] text-right">
                      {visa.submissionStandard}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-brand-emerald group-hover:text-brand-pine pt-2">
                <span>View Full 9-Point Dossier</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Pre-Submission Audit Guarantee Banner */}
        <div className="bg-brand-emerald text-white rounded-2xl p-8 shadow-elevated flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-brand-stone block mb-1">
              Atelier Pre-Submission Audit
            </span>
            <h3 className="font-serif text-2xl font-semibold mb-2">
              Have Scans Ready For Review?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Dispatch your high-resolution passport, bank statement, and tax scans to our consular desk for a preliminary solvency &amp; compliance review before official lodgment.
            </p>
          </div>
          <Link
            href="/visas/canada#intake-form"
            className="shrink-0 px-8 py-3.5 rounded-full bg-white text-brand-emerald hover:bg-brand-alabaster font-semibold text-xs tracking-wider uppercase transition shadow-md"
          >
            Initiate Dossier Review
          </Link>
        </div>
      </div>

      <WhatsAppCTA phoneNumber={adminProfile.phone} variant="floating" />
      <Footer />
    </main>
  );
}
