'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Clock,
  Compass,
  MessageSquare,
  ArrowRight,
  Loader2,
  Calendar,
} from 'lucide-react';
import VisitsChart from '@/components/admin/VisitsChart';
import GeoDistributionTable from '@/components/admin/GeoDistributionTable';
import { formatDate, formatRelativeTime } from '@/lib/utils';

const TIMEFRAMES = [
  { label: 'Today', value: 'today' },
  { label: '7 Days', value: '7d' },
  { label: '1 Month', value: '1m' },
  { label: '1 Year', value: '1y' },
  { label: 'All Time', value: 'all' },
];

export default function AdminHomePage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async (timeframe: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/analytics/stats?timeframe=${timeframe}`);
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch (err) {
      console.error('Failed to load stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(selectedTimeframe);
  }, [selectedTimeframe]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Header Row with Timeframe Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-stone">
        <div>
          <span className="text-[11px] font-bold text-brand-emerald tracking-[0.2em] uppercase">
            Admin Overview
          </span>
          <h1 className="font-serif text-3xl font-bold text-brand-charcoal mt-0.5">
            Welcome back, Bilawal
          </h1>
        </div>

        {/* Timeframe Segmented Capsule Filter */}
        <div className="bg-white p-1 rounded-full border border-brand-stone shadow-sm inline-flex items-center">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf.value}
              onClick={() => setSelectedTimeframe(tf.value)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition ${
                selectedTimeframe === tf.value
                  ? 'bg-brand-emerald text-white shadow-sm'
                  : 'text-brand-slate hover:text-brand-charcoal'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {loading && !data ? (
        <div className="h-96 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-brand-emerald animate-spin" />
        </div>
      ) : (
        <>
          {/* Top Analytics Row (Visits Graph & Geo Distribution) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Card: Visits Over Time */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-brand-stone p-6 sm:p-8 shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-serif text-lg font-bold text-brand-charcoal">
                      Visits Over Time
                    </h2>
                    <p className="text-xs text-brand-slate">
                      Unique page visitors logged across all travel plans.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-50 text-brand-emerald text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+{data?.metrics?.growthPercentage || 14.6}%</span>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-brand-charcoal">
                    {data?.metrics?.totalVisits?.toLocaleString() || 0}
                  </span>
                  <span className="text-xs text-brand-slate ml-2">
                    Unique Visits ({data?.metrics?.uniqueVisits || 0} distinct IPs)
                  </span>
                </div>
              </div>

              <VisitsChart data={data?.chartData || []} />
            </div>

            {/* Right Card: Top Visitor Locations */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-brand-stone p-6 sm:p-8 shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-serif text-lg font-bold text-brand-charcoal">
                      Top Visitor Locations
                    </h2>
                    <p className="text-xs text-brand-slate">
                      Geographic distribution based on incoming request origin.
                    </p>
                  </div>
                </div>

                <GeoDistributionTable
                  locations={data?.topLocations || []}
                  totalVisits={data?.metrics?.totalVisits || 0}
                />
              </div>

              <div className="pt-4 mt-6 border-t border-brand-stone flex items-center justify-between text-[11px] text-brand-slate">
                <span>Active Edge IP Resolution</span>
                <span className="text-brand-emerald font-semibold">Live Real-time</span>
              </div>
            </div>
          </div>

          {/* Dual-Split Bottom Section (Package Changelog + Latest Form Queries) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Pane: Package Changelog */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-brand-stone p-6 sm:p-8 shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-brand-stone">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-brand-emerald" />
                    <h2 className="font-serif text-lg font-bold text-brand-charcoal">
                      Package Changelog
                    </h2>
                  </div>
                  <Link
                    href="/admin/plans"
                    className="text-xs font-semibold text-brand-emerald hover:text-brand-pine transition"
                  >
                    View All Plans →
                  </Link>
                </div>

                {(!data?.changelog || data.changelog.length === 0) ? (
                  <div className="py-12 text-center text-xs text-brand-slate bg-brand-alabaster/40 rounded-xl border border-brand-stone/60">
                    <p>No trip package modifications logged in database yet.</p>
                    <p className="text-[11px] text-brand-slate/80 mt-1">
                      Creating, updating, or deleting travel plans will automatically populate this audit timeline.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-brand-stone/60 space-y-3">
                    {data.changelog.map((entry: any) => {
                      const isCreated = entry.action === 'CREATED';
                      const isDeleted = entry.action === 'DELETED';
                      const badgeClass = isCreated
                        ? 'bg-emerald-50 text-brand-emerald border-emerald-200'
                        : isDeleted
                        ? 'bg-red-50 text-brand-crimson border-red-200'
                        : 'bg-slate-50 text-brand-slate border-slate-200';

                      return (
                        <div key={entry.id} className="pt-3 first:pt-0 flex items-start gap-3">
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider flex-shrink-0 mt-0.5 ${badgeClass}`}
                          >
                            [{entry.action}]
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-brand-charcoal truncate">
                              "{entry.packageTitle}"
                            </p>
                            <p className="text-[11px] text-brand-slate flex items-center gap-1.5 mt-0.5">
                              <span>by {entry.performedBy}</span>
                              <span>•</span>
                              <span>{formatRelativeTime(entry.createdAt)}</span>
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right Pane: Latest Form Queries */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-brand-stone p-6 sm:p-8 shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-brand-stone">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-brand-emerald" />
                    <h2 className="font-serif text-lg font-bold text-brand-charcoal">
                      Latest Form Queries
                    </h2>
                  </div>
                  <Link
                    href="/admin/queries"
                    className="text-xs font-semibold text-brand-emerald hover:text-brand-pine transition"
                  >
                    Open Queries Desk →
                  </Link>
                </div>

                {(!data?.latestQueries || data.latestQueries.length === 0) ? (
                  <div className="py-12 text-center text-xs text-brand-slate bg-brand-alabaster/40 rounded-xl border border-brand-stone/60">
                    <p>No traveler inquiries submitted yet.</p>
                    <p className="text-[11px] text-brand-slate/80 mt-1">
                      Direct inquiries sent via the public website will appear here in real-time.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {data.latestQueries.map((query: any) => (
                      <Link
                        key={query.id}
                        href="/admin/queries"
                        className="block p-3.5 rounded-xl border border-brand-stone/80 hover:bg-brand-alabaster transition group"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-brand-charcoal">
                              {query.senderName}
                            </span>
                            <span className="text-[10px] bg-brand-emerald/10 text-brand-emerald px-2 py-0.5 rounded-full font-medium truncate max-w-[140px]">
                              {query.targetPackage || 'General'}
                            </span>
                          </div>
                          <span className="text-[10px] text-brand-slate">
                            {formatRelativeTime(query.createdAt)}
                          </span>
                        </div>
                        <p className="text-xs text-brand-slate line-clamp-1 font-light">
                          "{query.message}"
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
