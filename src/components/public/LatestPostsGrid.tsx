import React from 'react';
import Link from 'next/link';
import { Compass, ArrowRight, MapPin, Calendar, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface TravelPlanItem {
  id: string;
  title: string;
  slug: string;
  destination: string;
  category: string;
  primeThumbnail: string;
  shortDescription: string;
  readingTime: number;
  createdAt: string | Date;
}

interface LatestPostsGridProps {
  plans: TravelPlanItem[];
  adminProfile: {
    name: string;
    avatarUrl: string;
  };
  activeCategory?: string;
}

export default function LatestPostsGrid({
  plans,
  adminProfile,
  activeCategory = 'All',
}: LatestPostsGridProps) {
  // Empty State: zero hardcoded mock items
  if (!plans || plans.length === 0) {
    return (
      <section className="pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto" id="latest">
        <div className="flex items-center justify-between pb-6 mb-4 border-b border-brand-stone">
          <div>
            <h2 className="text-xs sm:text-sm font-bold tracking-[0.18em] text-brand-charcoal uppercase">
              LATEST FROM THE BLOG
            </h2>
            {activeCategory !== 'All' && (
              <p className="text-xs text-brand-emerald font-medium mt-1">
                Filtered by category: {activeCategory}
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-brand-stone p-12 text-center max-w-2xl mx-auto my-8 shadow-subtle">
          <div className="w-16 h-16 rounded-full bg-brand-alabaster border border-brand-stone flex items-center justify-center mx-auto mb-5 text-brand-emerald">
            <Compass className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-brand-charcoal mb-3">
            Journeys in Curation
          </h3>
          <p className="text-sm text-brand-slate leading-relaxed mb-6 font-light">
            Bilawal Abdullah is currently exploring remote destinations and drafting upcoming bespoke itineraries. No travel plans have been published under this category yet.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="#inquiry-form"
              className="bg-brand-emerald hover:bg-brand-pine text-white text-xs font-semibold px-6 py-3 rounded-full transition"
            >
              Request Custom Itinerary
            </a>
            <Link
              href="/admin/plans"
              className="border border-brand-stone text-brand-charcoal hover:bg-brand-alabaster text-xs font-semibold px-6 py-3 rounded-full transition"
            >
              + Create Plan in Admin
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const featured = plans[0];
  const gridItems = plans.slice(1, 5);
  const remainingItems = plans.slice(5);

  return (
    <section className="pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto" id="latest" data-purpose="latest-posts">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-6 mb-4">
        <div>
          <h2 className="text-xs sm:text-sm font-bold tracking-[0.18em] text-brand-charcoal uppercase">
            LATEST FROM THE BLOG
          </h2>
          {activeCategory && activeCategory !== 'All' && (
            <span className="text-xs text-brand-emerald font-semibold uppercase tracking-wider block mt-1">
              Category: {activeCategory}
            </span>
          )}
        </div>
        <Link
          href="/#destinations"
          className="group text-xs font-semibold text-brand-emerald tracking-wider uppercase flex items-center gap-1.5 hover:text-brand-pine"
        >
          <span>EXPLORE ALL DESTINATIONS</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition duration-300" />
        </Link>
      </div>

      {/* Main Grid: 1 Large Left Card (5 cols) + 4 Right Compact Cards (7 cols in 2x2) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Large Featured Card (Left Column) - Entire card clickable */}
        <Link
          href={`/plans/${featured.slug}`}
          className="lg:col-span-5 relative rounded-2xl overflow-hidden min-h-[460px] lg:min-h-[520px] shadow-sm hover:shadow-elevated transition duration-500 group flex flex-col justify-end p-6 sm:p-8 cursor-pointer block"
          data-purpose="featured-post-card"
        >
          <img
            alt={featured.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
            src={featured.primeThumbnail}
          />
          {/* Dark bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

          {/* Content Overlay */}
          <div className="relative z-10 text-white">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block bg-brand-emerald/90 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                {featured.category || 'DESTINATIONS'}
              </span>
              <span className="text-[11px] text-gray-300 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-400" />
                {featured.destination}
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-snug mb-2 card-text-shadow group-hover:text-emerald-200 transition">
              {featured.title}
            </h3>

            <p className="text-gray-200 text-xs sm:text-sm mb-5 font-light line-clamp-2">
              {featured.shortDescription}
            </p>

            {/* Author Info */}
            <div className="flex items-center justify-between text-xs text-gray-300 pt-3 border-t border-white/10">
              <div className="flex items-center space-x-2.5">
                <img
                  src={adminProfile.avatarUrl}
                  alt={adminProfile.name}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-white/50"
                />
                <div className="text-[11px]">
                  <span className="text-white font-medium">By {adminProfile.name}</span>
                  <span className="mx-1 text-gray-400">•</span>
                  <time className="text-gray-300">{formatDate(featured.createdAt)}</time>
                </div>
              </div>
              <span className="text-[11px] text-gray-300 flex items-center gap-1">
                <Clock className="w-3 h-3 text-emerald-400" />
                {featured.readingTime} min read
              </span>
            </div>
          </div>
        </Link>

        {/* 4 Compact Cards (Right Column: 2x2 grid) - Entire card clickable */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {gridItems.map((plan) => (
            <Link
              key={plan.id}
              href={`/plans/${plan.slug}`}
              className="relative rounded-2xl overflow-hidden min-h-[250px] shadow-sm hover:shadow-elevated transition duration-500 group flex flex-col justify-end p-5 cursor-pointer block"
              data-purpose="grid-post-card"
            >
              <img
                alt={plan.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
                src={plan.primeThumbnail}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
              <div className="relative z-10 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block bg-brand-emerald/90 text-[9px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full">
                    {plan.category || 'DESTINATIONS'}
                  </span>
                  <span className="text-[10px] text-gray-300 truncate">
                    {plan.destination}
                  </span>
                </div>
                <h4 className="font-serif text-lg font-bold leading-tight mb-3 group-hover:text-emerald-200 transition">
                  {plan.title}
                </h4>
                <div className="flex items-center justify-between text-[10px] text-gray-300 pt-2 border-t border-white/10">
                  <div className="flex items-center space-x-2">
                    <img
                      src={adminProfile.avatarUrl}
                      alt={adminProfile.name}
                      className="w-5 h-5 rounded-full object-cover ring-1 ring-white/50"
                    />
                    <span>By {adminProfile.name}</span>
                  </div>
                  <span>{formatDate(plan.createdAt)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Additional remaining plans if any - Entire card clickable */}
      {remainingItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {remainingItems.map((plan) => (
            <Link
              key={plan.id}
              href={`/plans/${plan.slug}`}
              className="bg-white rounded-2xl overflow-hidden border border-brand-stone hover:shadow-elevated transition group flex flex-col cursor-pointer block"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={plan.primeThumbnail}
                  alt={plan.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-brand-emerald text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {plan.category}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] text-brand-emerald font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{plan.destination}</span>
                  </div>
                  <h4 className="font-serif font-bold text-xl text-brand-charcoal group-hover:text-brand-emerald transition mb-2">
                    {plan.title}
                  </h4>
                  <p className="text-xs text-brand-slate line-clamp-2 leading-relaxed">
                    {plan.shortDescription}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-brand-stone text-xs text-brand-slate">
                  <span>{formatDate(plan.createdAt)}</span>
                  <span className="text-brand-emerald font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition">
                    Read Plan →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
