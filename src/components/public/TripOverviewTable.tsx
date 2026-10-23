import React from 'react';
import {
  Calendar,
  Clock,
  Plane,
  Building2,
  Tag,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import type { TripOverviewData } from '@/components/admin/TripOverviewEditor';

interface TripOverviewTableProps {
  overview?: TripOverviewData | null;
  planTitle?: string;
  destination?: string;
}

export default function TripOverviewTable({
  overview,
  planTitle,
  destination,
}: TripOverviewTableProps) {
  if (!overview || !overview.enabled) {
    return null;
  }

  const {
    travelDatesText,
    startDate,
    endDate,
    duration,
    route,
    hotels,
    pricePkr,
    priceUsd,
    totalSlots,
  } = overview;

  // Filter out empty route stops and empty hotels
  const cleanRoute = (route || []).map((r) => r.trim()).filter(Boolean);
  const cleanHotels = (hotels || []).map((h) => h.trim()).filter(Boolean);

  // Check if at least one field has data to display
  const hasDates = Boolean(travelDatesText || (startDate && endDate));
  const hasDuration = Boolean(duration);
  const hasRoute = cleanRoute.length > 0;
  const hasHotels = cleanHotels.length > 0;
  const hasPrice = Boolean(pricePkr || priceUsd);
  const hasSlots = Boolean(totalSlots);

  if (!hasDates && !hasDuration && !hasRoute && !hasHotels && !hasPrice && !hasSlots) {
    return null;
  }

  // Format dates display
  let datesDisplay = travelDatesText;
  if (!datesDisplay && startDate && endDate) {
    try {
      const d1 = new Date(startDate + 'T00:00:00');
      const d2 = new Date(endDate + 'T00:00:00');
      const opt: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
      datesDisplay = `${d1.toLocaleDateString('en-US', opt)} – ${d2.toLocaleDateString('en-US', opt)}`;
    } catch {
      datesDisplay = `${startDate} – ${endDate}`;
    }
  }

  return (
    <div
      id="quick-trip-overview"
      className="bg-white rounded-2xl border border-brand-stone/90 shadow-subtle p-6 sm:p-8 mb-10 overflow-hidden relative"
      data-purpose="quick-trip-overview"
    >
      {/* Top Accent Strip */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-emerald via-emerald-400 to-teal-500" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-brand-stone gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-emerald/10 text-brand-emerald text-[11px] font-bold uppercase tracking-widest mb-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Quick Trip Overview</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-charcoal">
            Curated Journey Dossier
          </h3>
        </div>

        {hasSlots && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{totalSlots}</span>
          </div>
        )}
      </div>

      {/* Structured Overview Table / Grid */}
      <div className="divide-y divide-brand-stone/70 text-sm">
        {/* 1. Travel Dates */}
        {hasDates && (
          <div className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center">
            <dt className="sm:col-span-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-slate">
              <Calendar className="w-4 h-4 text-brand-emerald flex-shrink-0" />
              <span>Travel Dates</span>
            </dt>
            <dd className="sm:col-span-8 font-serif text-brand-charcoal text-base font-semibold">
              {datesDisplay}
            </dd>
          </div>
        )}

        {/* 2. Duration */}
        {hasDuration && (
          <div className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center">
            <dt className="sm:col-span-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-slate">
              <Clock className="w-4 h-4 text-brand-emerald flex-shrink-0" />
              <span>Duration</span>
            </dt>
            <dd className="sm:col-span-8 flex items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-lg bg-brand-alabaster border border-brand-stone text-brand-charcoal font-semibold text-xs tracking-wide">
                {duration}
              </span>
            </dd>
          </div>
        )}

        {/* 3. Flight Route */}
        {hasRoute && (
          <div className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-start">
            <dt className="sm:col-span-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-slate pt-1">
              <Plane className="w-4 h-4 text-brand-emerald flex-shrink-0" />
              <span>Flight Route</span>
            </dt>
            <dd className="sm:col-span-8">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
                {cleanRoute.map((stop, i) => {
                  const isLast = i === cleanRoute.length - 1 && cleanRoute.length > 1;
                  return (
                    <React.Fragment key={i}>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border ${
                          isLast
                            ? 'bg-brand-emerald text-white border-brand-emerald shadow-sm font-semibold'
                            : 'bg-white text-brand-charcoal border-brand-stone'
                        }`}
                      >
                        {isLast && <span className="text-[10px] uppercase font-bold tracking-wider">Destination:</span>}
                        <span>{stop}</span>
                      </span>
                      {i < cleanRoute.length - 1 && (
                        <ArrowRight className="w-3.5 h-3.5 text-brand-emerald flex-shrink-0" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </dd>
          </div>
        )}

        {/* 4. Hotel Accommodation */}
        {hasHotels && (
          <div className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-start">
            <dt className="sm:col-span-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-slate pt-1">
              <Building2 className="w-4 h-4 text-brand-emerald flex-shrink-0" />
              <span>Accommodation</span>
            </dt>
            <dd className="sm:col-span-8">
              <ul className="space-y-1.5">
                {cleanHotels.map((hotel, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-brand-charcoal font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald flex-shrink-0" />
                    <span>{hotel}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        )}

        {/* 5. Per Person Package Price (Bold Pricing!) */}
        {hasPrice && (
          <div className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center bg-brand-alabaster/40 -mx-6 sm:-mx-8 px-6 sm:px-8">
            <dt className="sm:col-span-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-slate">
              <Tag className="w-4 h-4 text-brand-emerald flex-shrink-0" />
              <span>Package Price</span>
            </dt>
            <dd className="sm:col-span-8 flex flex-wrap items-baseline gap-2">
              {pricePkr && (
                <span className="font-serif text-xl sm:text-2xl font-black text-brand-charcoal tracking-tight">
                  {pricePkr}
                </span>
              )}
              {priceUsd && (
                <span className="text-xs sm:text-sm font-semibold text-brand-slate">
                  ({priceUsd})
                </span>
              )}
              <span className="text-xs text-brand-slate font-medium">per person</span>
            </dd>
          </div>
        )}

        {/* 6. Total Slots (if present and not already displayed above) */}
        {hasSlots && (
          <div className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center">
            <dt className="sm:col-span-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-slate">
              <Users className="w-4 h-4 text-brand-emerald flex-shrink-0" />
              <span>Group Capacity</span>
            </dt>
            <dd className="sm:col-span-8 text-xs font-semibold text-brand-charcoal">
              {totalSlots}
            </dd>
          </div>
        )}
      </div>

      {/* Direct Booking Link Button */}
      <div className="mt-6 pt-4 border-t border-brand-stone flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-50/50 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-5 sm:p-6 rounded-b-2xl">
        <span className="text-xs text-brand-slate text-center sm:text-left">
          Tailored adjustments and private departures available upon request.
        </span>
        <a
          href="#inquiry-form"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-brand-emerald hover:bg-brand-pine text-white text-xs font-bold uppercase tracking-wider transition shadow-sm"
        >
          <span>Inquire About This Journey</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
