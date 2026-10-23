import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma, getOrCreateAdminProfile } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import TopBar from '@/components/public/TopBar';
import Header from '@/components/public/Header';
import PlanGalleryMasonry from '@/components/public/PlanGalleryMasonry';
import CreatorCard from '@/components/public/CreatorCard';
import InquiryForm from '@/components/public/InquiryForm';
import WhatsAppCTA from '@/components/public/WhatsAppCTA';
import Footer from '@/components/public/Footer';
import TripOverviewTable from '@/components/public/TripOverviewTable';
import { ChevronRight, Clock, MapPin, Calendar, Compass, Share2 } from 'lucide-react';

export const revalidate = 0;

interface PlanDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PlanDetailPageProps) {
  const plan = await prisma.travelPlan.findUnique({
    where: { slug: params.slug },
  });

  if (!plan) return { title: 'Plan Not Found | Bilawal Abdullah Travels' };

  return {
    title: `${plan.title} | Bilawal Abdullah Travels`,
    description: plan.shortDescription,
    openGraph: {
      title: plan.title,
      description: plan.shortDescription,
      images: [plan.primeThumbnail],
    },
  };
}

export default async function PlanDetailPage({ params }: PlanDetailPageProps) {
  const { slug } = params;

  // 1. Fetch the requested plan from PostgreSQL
  const plan = await prisma.travelPlan.findUnique({
    where: { slug },
  });

  if (!plan || plan.status !== 'PUBLISHED') {
    notFound();
  }

  // 2. Fetch live AdminProfile
  const adminProfile = await getOrCreateAdminProfile();

  // 3. Fetch 3 other published plans for "More Journeys & Guides" section
  const morePlans = await prisma.travelPlan.findMany({
    where: {
      status: 'PUBLISHED',
      NOT: { id: plan.id },
    },
    orderBy: { createdAt: 'desc' },
    take: 3,
  });

  // Prepare images array: primeThumbnail + any other gallery images, max 10
  const allImages = Array.from(new Set([plan.primeThumbnail, ...(plan.images || [])])).filter(Boolean);

  return (
    <main className="min-h-screen bg-brand-alabaster flex flex-col selection:bg-brand-emerald selection:text-white">
      <TopBar />
      <Header />

      <article className="max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center space-x-2 text-xs text-brand-slate mb-6 flex-wrap"
        >
          <Link href="/" className="hover:text-brand-emerald transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-brand-stone" />
          <Link
            href={`/?category=${encodeURIComponent(plan.category)}#latest`}
            className="hover:text-brand-emerald transition"
          >
            {plan.category || 'Destinations'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-brand-stone" />
          <span className="text-brand-charcoal font-medium truncate max-w-xs">
            {plan.destination}
          </span>
        </nav>

        {/* Top Header Block: Category & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-brand-emerald/10 text-brand-emerald text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-brand-emerald/20">
              {plan.category || 'Destinations'}
            </span>
            <span className="text-xs text-brand-slate flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-emerald" />
              {plan.destination}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[44px] font-bold text-brand-charcoal leading-[1.15] tracking-tight mb-5">
            {plan.title}
          </h1>

          {/* Author & Date Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-brand-stone text-xs text-brand-slate">
            <div className="flex items-center space-x-3">
              <img
                src={adminProfile.avatarUrl}
                alt={adminProfile.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-emerald/20"
              />
              <div>
                <span className="block text-sm font-semibold text-brand-charcoal">
                  By {adminProfile.name}
                </span>
                <span className="text-[11px] text-brand-slate">Atelier Founder & Expedition Guide</span>
              </div>
            </div>

            <div className="flex items-center space-x-5 text-xs">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-brand-emerald" />
                <span>{formatDate(plan.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-emerald" />
                <span>{plan.readingTime} min read</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Photo Gallery (shows cleanly at top on small screens) */}
        <div className="block lg:hidden mb-10">
          <PlanGalleryMasonry images={allImages} title={plan.title} />
        </div>

        {/* Main 2-Column Split: Editorial Left (60%) + Masonry Right (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT COLUMN: 60% width Editorial Story */}
          <div className="lg:col-span-7">
            {/* 1. Quick Trip Overview Section (if enabled in Admin) */}
            <TripOverviewTable
              overview={(plan as any).overview}
              planTitle={plan.title}
              destination={plan.destination}
            />

            {/* Lead Summary in Serif Italic */}
            {plan.shortDescription && (
              <div className="bg-white rounded-2xl border border-brand-stone p-6 sm:p-8 mb-8 shadow-subtle">
                <p className="font-serif italic text-lg sm:text-xl text-brand-charcoal leading-relaxed">
                  "{plan.shortDescription}"
                </p>
              </div>
            )}

            {/* Rich Editorial Content Flow */}
            <div
              className="editorial-content"
              dangerouslySetInnerHTML={{ __html: plan.content }}
            />

            {/* End of Story Inline WhatsApp CTA */}
            <div className="mt-10 p-6 bg-emerald-50/60 rounded-2xl border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-serif font-bold text-base text-brand-charcoal">
                  Have questions regarding this journey?
                </h4>
                <p className="text-xs text-brand-slate mt-0.5">
                  Connect directly with Bilawal for bespoke customizations & availability.
                </p>
              </div>
              <WhatsAppCTA
                planTitle={plan.title}
                phoneNumber={adminProfile.phone}
                variant="inline"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: 40% width Photo Visuals Gallery & Highlights */}
          <div className="hidden lg:block lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-brand-stone p-6 shadow-subtle">
              <PlanGalleryMasonry images={allImages} title={plan.title} />
            </div>

            {/* Quick Trip Highlights Card */}
            <div className="bg-white rounded-2xl border border-brand-stone p-6 shadow-subtle">
              <h4 className="font-serif font-bold text-base text-brand-charcoal mb-3">
                Curated Dossier Summary
              </h4>
              <dl className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-brand-stone">
                  <dt className="text-brand-slate">Destination</dt>
                  <dd className="font-semibold text-brand-charcoal">{plan.destination}</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-brand-stone">
                  <dt className="text-brand-slate">Category</dt>
                  <dd className="font-semibold text-brand-emerald">{plan.category}</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-brand-stone">
                  <dt className="text-brand-slate">Published On</dt>
                  <dd className="font-semibold text-brand-charcoal">{formatDate(plan.createdAt)}</dd>
                </div>
                <div className="flex justify-between py-1">
                  <dt className="text-brand-slate">Reading Duration</dt>
                  <dd className="font-semibold text-brand-charcoal">{plan.readingTime} Minutes</dd>
                </div>
              </dl>
              <div className="mt-4 pt-4 border-t border-brand-stone">
                <a
                  href="#inquiry-form"
                  className="w-full inline-flex items-center justify-center bg-brand-emerald hover:bg-brand-pine text-white text-xs font-semibold py-3 rounded-full transition"
                >
                  Book Private Consultation
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* End-of-Post Sequence In Exact Order (Requirement 6.B): */}
        {/* 1. Creator Card */}
        <CreatorCard adminProfile={adminProfile} />

        {/* 2. More Postings Section (3-Column Grid) */}
        {morePlans.length > 0 && (
          <section className="my-16" aria-label="More Journeys & Guides">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-brand-stone">
              <div>
                <span className="text-[10px] font-bold text-brand-emerald uppercase tracking-widest">
                  Continue Reading
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-charcoal mt-0.5">
                  More Journeys & Guides
                </h3>
              </div>
              <Link
                href="/"
                className="text-xs font-semibold text-brand-emerald hover:text-brand-pine transition"
              >
                View All Plans →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {morePlans.map((item) => (
                <Link
                  key={item.id}
                  href={`/plans/${item.slug}`}
                  className="bg-white rounded-2xl overflow-hidden border border-brand-stone hover:shadow-elevated transition duration-300 group flex flex-col cursor-pointer block"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={item.primeThumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-brand-emerald text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] text-brand-emerald font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{item.destination}</span>
                      </div>
                      <h4 className="font-serif font-bold text-lg text-brand-charcoal group-hover:text-brand-emerald transition line-clamp-2 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-brand-slate line-clamp-2 font-light">
                        {item.shortDescription}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-brand-stone text-[11px] text-brand-slate">
                      <div className="flex items-center gap-1.5">
                        <img
                          src={adminProfile.avatarUrl}
                          alt={adminProfile.name}
                          className="w-4 h-4 rounded-full object-cover"
                        />
                        <span>{adminProfile.name}</span>
                      </div>
                      <span>{item.readingTime} min</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 3. Direct Package Inquiry Form */}
        <InquiryForm targetPackage={plan.title} destination={plan.destination} />

        {/* 4. Direct WhatsApp Chat CTA (floating) */}
        <WhatsAppCTA
          planTitle={plan.title}
          phoneNumber={adminProfile.phone}
          variant="floating"
        />
      </article>

      <Footer />
    </main>
  );
}
