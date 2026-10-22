import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { VISAS_DATA } from '@/data/visasData';
import { getOrCreateAdminProfile } from '@/lib/prisma';
import TopBar from '@/components/public/TopBar';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import WhatsAppCTA from '@/components/public/WhatsAppCTA';
import VisaDossierView from '@/components/public/visa/VisaDossierView';

export const revalidate = 0;

interface VisaDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return Object.keys(VISAS_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: VisaDetailPageProps): Promise<Metadata> {
  const country = VISAS_DATA[params.slug.toLowerCase()];
  if (!country) {
    return {
      title: 'Visa Guide Not Found | Bilawal Abdullah Travels',
    };
  }

  return {
    title: `${country.name} Visa Document Requirements | Bilawal Abdullah Travels`,
    description: country.subheadline,
    keywords: [
      `${country.name} visa`,
      `${country.name} visa requirements`,
      `${country.name} tourist visa`,
      'Pakistan to ' + country.name + ' visa',
      'visa document checklist',
      'Bilawal Abdullah Travels',
    ],
    openGraph: {
      title: `${country.flag} ${country.name} — Visa Document Requirements`,
      description: country.subheadline,
      type: 'website',
      siteName: 'Bilawal Abdullah Travels',
    },
  };
}

export default async function VisaDetailPage({ params }: VisaDetailPageProps) {
  const country = VISAS_DATA[params.slug.toLowerCase()];

  if (!country) {
    notFound();
  }

  const adminProfile = await getOrCreateAdminProfile();

  return (
    <main className="min-h-screen bg-brand-alabaster flex flex-col selection:bg-brand-emerald selection:text-white">
      {/* 1. Top Utility Bar */}
      <TopBar />

      {/* 2. Main Site Header with Visas Dropdown */}
      <Header />

      {/* 3. High-Fidelity Consular Dossier View */}
      <VisaDossierView country={country} adminProfile={adminProfile} />

      {/* 4. Floating WhatsApp CTA */}
      <WhatsAppCTA phoneNumber={adminProfile.phone} variant="floating" />

      {/* 5. Full Brand Footer */}
      <Footer />
    </main>
  );
}
