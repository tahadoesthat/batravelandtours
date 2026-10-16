import React from 'react';
import { prisma, getOrCreateAdminProfile } from '@/lib/prisma';
import TopBar from '@/components/public/TopBar';
import Header from '@/components/public/Header';
import Hero from '@/components/public/Hero';
import LatestPostsGrid from '@/components/public/LatestPostsGrid';
import DestinationsRow from '@/components/public/DestinationsRow';
import CreatorCard from '@/components/public/CreatorCard';
import InquiryForm from '@/components/public/InquiryForm';
import WhatsAppCTA from '@/components/public/WhatsAppCTA';
import Footer from '@/components/public/Footer';

// Revalidate page data dynamically
export const revalidate = 0;

interface HomePageProps {
  searchParams: {
    category?: string;
    search?: string;
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const activeCategory = searchParams.category || 'All';
  const searchQuery = searchParams.search;

  // Build filter condition
  const where: any = {
    status: 'PUBLISHED',
  };

  if (activeCategory && activeCategory !== 'All') {
    where.category = {
      equals: activeCategory,
      mode: 'insensitive',
    };
  }

  if (searchQuery && searchQuery.trim()) {
    where.OR = [
      { title: { contains: searchQuery.trim(), mode: 'insensitive' } },
      { destination: { contains: searchQuery.trim(), mode: 'insensitive' } },
      { shortDescription: { contains: searchQuery.trim(), mode: 'insensitive' } },
    ];
  }

  // Direct PostgreSQL read via Prisma ORM - zero mock data
  let plans: any[] = [];
  try {
    plans = await prisma.travelPlan.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 12,
    });
  } catch (error) {
    console.error('Failed to query travel plans from database:', error);
    plans = [];
  }

  // Get live Admin Profile
  const adminProfile = await getOrCreateAdminProfile();

  return (
    <main className="min-h-screen bg-brand-alabaster flex flex-col selection:bg-brand-emerald selection:text-white">
      {/* 1. Top Utility Bar */}
      <TopBar />

      {/* 2. Main Site Header */}
      <Header />

      {/* 3. Hero Section with Script Kicker & Category Dock */}
      <Hero />

      {/* 4. Latest From The Blog Grid (Dynamic from DB) */}
      <LatestPostsGrid
        plans={plans}
        adminProfile={adminProfile}
        activeCategory={activeCategory}
      />

      {/* 5. Signature Destinations Showcase */}
      <DestinationsRow />

      {/* 6. Creator Dossier & Contact Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <CreatorCard adminProfile={adminProfile} />
        <InquiryForm targetPackage="General Inquiry" />
      </div>

      {/* 7. Floating WhatsApp CTA */}
      <WhatsAppCTA phoneNumber={adminProfile.phone} variant="floating" />

      {/* 8. Full Brand Footer */}
      <Footer />
    </main>
  );
}
