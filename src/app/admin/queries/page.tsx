'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Inbox,
  Clock,
  CheckCircle,
  Eye,
  Loader2,
  Mail,
  Phone,
  Compass,
} from 'lucide-react';
import QueryDrawer from '@/components/admin/QueryDrawer';
import { formatDate } from '@/lib/utils';

export default function AdminQueriesPage() {
  const [queries, setQueries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'UNREAD' | 'IN_PROGRESS' | 'RESOLVED'>('ALL');
  const [search, setSearch] = useState('');
  const [selectedQuery, setSelectedQuery] = useState<any | null>(null);

  const fetchQueries = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (statusFilter !== 'ALL') queryParams.set('status', statusFilter);
      if (search.trim()) queryParams.set('search', search.trim());

      const res = await fetch(`/api/queries?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success) {
        setQueries(data.queries || []);
      }
    } catch (err) {
      console.error('Failed to fetch inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, [statusFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchQueries();
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/queries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedQuery((prev: any) => (prev ? { ...prev, status: newStatus } : null));
        fetchQueries();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this traveler query?')) return;
    try {
      await fetch(`/api/queries/${id}`, { method: 'DELETE' });
      setSelectedQuery(null);
      fetchQueries();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-stone">
        <div>
          <span className="text-[11px] font-bold text-brand-emerald tracking-[0.2em] uppercase">
            Traveler Inquiries Desk
          </span>
          <h1 className="font-serif text-3xl font-bold text-brand-charcoal mt-0.5">
            Queries & Leads
          </h1>
        </div>
      </div>

      {/* Toolbar: Search & Status Filter Tabs */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-brand-slate absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by sender, email, package..."
            className="w-full text-xs pl-10 pr-4 py-2.5 rounded-full border border-brand-stone bg-white text-brand-charcoal focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald"
          />
        </div>

        {/* Filter Tabs */}
        <div className="bg-white p-1 rounded-full border border-brand-stone shadow-xs inline-flex items-center">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              statusFilter === 'ALL'
                ? 'bg-brand-emerald text-white'
                : 'text-brand-slate hover:text-brand-charcoal'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter('UNREAD')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              statusFilter === 'UNREAD'
                ? 'bg-brand-emerald text-white'
                : 'text-brand-slate hover:text-brand-charcoal'
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setStatusFilter('IN_PROGRESS')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              statusFilter === 'IN_PROGRESS'
                ? 'bg-brand-amber text-white'
                : 'text-brand-slate hover:text-brand-charcoal'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setStatusFilter('RESOLVED')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              statusFilter === 'RESOLVED'
                ? 'bg-slate-700 text-white'
                : 'text-brand-slate hover:text-brand-charcoal'
            }`}
          >
            Resolved
          </button>
        </div>
      </div>

      {/* Editorial Data Table */}
      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-brand-emerald animate-spin" />
        </div>
      ) : queries.length === 0 ? (
        /* Zero Mock Data: Clean On-Brand Empty State */
        <div className="bg-white rounded-2xl border border-brand-stone p-12 text-center max-w-xl mx-auto my-12 shadow-subtle">
          <div className="w-16 h-16 rounded-full bg-brand-alabaster border border-brand-stone flex items-center justify-center mx-auto mb-4 text-brand-emerald">
            <Inbox className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-brand-charcoal mb-2">
            No Inquiries in this Queue
          </h3>
          <p className="text-xs sm:text-sm text-brand-slate leading-relaxed font-light">
            There are currently no inquiry submissions in the database matching this status filter. When travelers submit the booking form on the public site, their inquiries will appear here immediately.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-brand-stone shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-brand-stone bg-brand-alabaster/60 text-brand-slate uppercase text-[10px] tracking-wider font-bold">
                  <th className="py-4 px-6">Sender Details</th>
                  <th className="py-4 px-6">Target Journey</th>
                  <th className="py-4 px-6">Message Excerpt</th>
                  <th className="py-4 px-6">Date Received</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-stone/60">
                {queries.map((q) => {
                  const isUnread = q.status === 'UNREAD';
                  const isInProgress = q.status === 'IN_PROGRESS';
                  const isResolved = q.status === 'RESOLVED';

                  const badgeStyle = isUnread
                    ? 'bg-emerald-50 text-brand-emerald border-emerald-200'
                    : isInProgress
                    ? 'bg-amber-50 text-brand-amber border-amber-200'
                    : 'bg-slate-100 text-slate-700 border-slate-200';

                  return (
                    <tr
                      key={q.id}
                      onClick={() => setSelectedQuery(q)}
                      className="hover:bg-brand-alabaster/50 transition cursor-pointer group"
                    >
                      {/* Sender */}
                      <td className="py-4 px-6 font-medium text-brand-charcoal">
                        <div className="flex items-center gap-2">
                          {isUnread && (
                            <span className="w-2 h-2 rounded-full bg-brand-emerald flex-shrink-0" />
                          )}
                          <div>
                            <span className="block font-bold text-sm text-brand-charcoal group-hover:text-brand-emerald transition">
                              {q.senderName}
                            </span>
                            <span className="text-[11px] text-brand-slate block">
                              {q.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Package */}
                      <td className="py-4 px-6">
                        <span className="inline-block bg-brand-stone/40 text-brand-charcoal px-2.5 py-1 rounded-full text-[11px] font-medium max-w-[160px] truncate">
                          {q.targetPackage || 'General'}
                        </span>
                      </td>

                      {/* Message Excerpt */}
                      <td className="py-4 px-6 max-w-xs truncate text-brand-slate font-light">
                        "{q.message}"
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 text-brand-slate whitespace-nowrap">
                        {formatDate(q.createdAt, 'MMM d, yyyy')}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider inline-block ${badgeStyle}`}
                        >
                          {q.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedQuery(q);
                          }}
                          className="px-3.5 py-1.5 rounded-full bg-brand-alabaster hover:bg-brand-emerald hover:text-white border border-brand-stone text-xs font-semibold text-brand-charcoal transition"
                        >
                          Open Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Slide-out Inspection Drawer */}
      <QueryDrawer
        query={selectedQuery}
        isOpen={Boolean(selectedQuery)}
        onClose={() => setSelectedQuery(null)}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  );
}
