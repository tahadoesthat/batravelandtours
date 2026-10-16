'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  ExternalLink,
  Eye,
  MapPin,
  Calendar,
  Loader2,
  Compass,
} from 'lucide-react';
import PlanModal from '@/components/admin/PlanModal';
import { formatDate } from '@/lib/utils';

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT'>('ALL');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any | null>(null);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (statusFilter !== 'ALL') queryParams.set('status', statusFilter);
      if (search.trim()) queryParams.set('search', search.trim());

      const res = await fetch(`/api/plans?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success) {
        setPlans(data.plans || []);
      }
    } catch (err) {
      console.error('Failed to fetch travel plans:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [statusFilter]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPlans();
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Close 3-dot dropdown on external click
  useEffect(() => {
    const closeMenu = () => setActiveMenuId(null);
    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, []);

  const counts = {
    all: plans.length,
    published: plans.filter((p) => p.status === 'PUBLISHED').length,
    drafts: plans.filter((p) => p.status === 'DRAFT').length,
  };

  const handleToggleStatus = async (plan: any) => {
    const nextStatus = plan.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    try {
      await fetch(`/api/plans/${plan.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      fetchPlans();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (plan: any) => {
    if (!confirm(`Are you sure you want to delete "${plan.title}"?`)) return;
    try {
      await fetch(`/api/plans/${plan.id}`, { method: 'DELETE' });
      fetchPlans();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header & Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-stone">
        <div>
          <span className="text-[11px] font-bold text-brand-emerald tracking-[0.2em] uppercase">
            Travel Dossier Atelier
          </span>
          <h1 className="font-serif text-3xl font-bold text-brand-charcoal mt-0.5">
            Travel Plans
          </h1>
        </div>

        <button
          onClick={() => {
            setEditingPlan(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-2 bg-brand-emerald hover:bg-brand-pine text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ New Travel Plan</span>
        </button>
      </div>

      {/* Toolbar: Search & Segmented Filter Pills */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-brand-slate absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search travel plans, destinations..."
            className="w-full text-xs pl-10 pr-4 py-2.5 rounded-full border border-brand-stone bg-white text-brand-charcoal focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald"
          />
        </div>

        {/* Filter Pills */}
        <div className="bg-white p-1 rounded-full border border-brand-stone shadow-xs inline-flex items-center">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              statusFilter === 'ALL'
                ? 'bg-brand-emerald text-white'
                : 'text-brand-slate hover:text-brand-charcoal'
            }`}
          >
            All Plans ({counts.all})
          </button>
          <button
            onClick={() => setStatusFilter('PUBLISHED')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              statusFilter === 'PUBLISHED'
                ? 'bg-brand-emerald text-white'
                : 'text-brand-slate hover:text-brand-charcoal'
            }`}
          >
            Published ({counts.published})
          </button>
          <button
            onClick={() => setStatusFilter('DRAFT')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              statusFilter === 'DRAFT'
                ? 'bg-brand-emerald text-white'
                : 'text-brand-slate hover:text-brand-charcoal'
            }`}
          >
            Drafts ({counts.drafts})
          </button>
        </div>
      </div>

      {/* Plans Card Grid */}
      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-brand-emerald animate-spin" />
        </div>
      ) : plans.length === 0 ? (
        /* Zero Mock Data: Clean On-Brand Empty State */
        <div className="bg-white rounded-2xl border border-brand-stone p-12 text-center max-w-xl mx-auto my-12 shadow-subtle">
          <div className="w-16 h-16 rounded-full bg-brand-alabaster border border-brand-stone flex items-center justify-center mx-auto mb-4 text-brand-emerald">
            <Compass className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-brand-charcoal mb-2">
            No Travel Plans Found
          </h3>
          <p className="text-xs sm:text-sm text-brand-slate leading-relaxed mb-6 font-light">
            Your PostgreSQL database does not have any travel plans matching the selected filter. Create your first bespoke itinerary to publish to the live site.
          </p>
          <button
            onClick={() => {
              setEditingPlan(null);
              setModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-brand-emerald hover:bg-brand-pine text-white text-xs font-semibold px-6 py-3 rounded-full transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create First Travel Plan</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isPublished = plan.status === 'PUBLISHED';
            return (
              <div
                key={plan.id}
                className="bg-white rounded-2xl border border-brand-stone overflow-hidden shadow-subtle hover:shadow-elevated transition duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* 16:9 Prime Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-brand-stone/30">
                    <img
                      src={plan.primeThumbnail}
                      alt={plan.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />

                    {/* Destination Tag */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur text-brand-emerald text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs flex items-center gap-1 border border-brand-stone">
                      <MapPin className="w-3 h-3" />
                      <span>{plan.destination}</span>
                    </div>

                    {/* Status Pill Badge */}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs ${
                          isPublished
                            ? 'bg-brand-emerald text-white'
                            : 'bg-stone-600 text-white'
                        }`}
                      >
                        {plan.status}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <span className="text-[10px] font-semibold text-brand-slate uppercase tracking-wider block mb-1">
                      {plan.category}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-brand-charcoal mb-2 line-clamp-1 group-hover:text-brand-emerald transition">
                      {plan.title}
                    </h3>
                    <p className="text-xs text-brand-slate line-clamp-2 leading-relaxed font-light">
                      {plan.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Footer Attribution & 3-Dot Dropdown */}
                <div className="p-5 pt-0 border-t border-brand-stone/60 mt-3 pt-3 flex items-center justify-between text-xs text-brand-slate">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <Calendar className="w-3.5 h-3.5 text-brand-emerald" />
                    <span>{formatDate(plan.createdAt)}</span>
                  </div>

                  {/* 3-Dot Action Menu */}
                  <div className="relative" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() =>
                        setActiveMenuId(activeMenuId === plan.id ? null : plan.id)
                      }
                      aria-label="Options"
                      className="p-1.5 rounded-full hover:bg-brand-alabaster transition text-brand-slate hover:text-brand-charcoal"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {activeMenuId === plan.id && (
                      <div className="absolute right-0 bottom-full mb-1 w-48 bg-white rounded-xl border border-brand-stone shadow-elevated py-1.5 z-30 animate-fade-in text-xs">
                        <button
                          onClick={() => {
                            setEditingPlan(plan);
                            setModalOpen(true);
                            setActiveMenuId(null);
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-brand-alabaster text-brand-charcoal transition text-left"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-brand-emerald" />
                          <span>Edit Plan</span>
                        </button>

                        {isPublished && (
                          <Link
                            href={`/plans/${plan.slug}`}
                            target="_blank"
                            className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-brand-alabaster text-brand-charcoal transition text-left"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-brand-slate" />
                            <span>View Live</span>
                          </Link>
                        )}

                        <button
                          onClick={() => {
                            handleToggleStatus(plan);
                            setActiveMenuId(null);
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-brand-alabaster text-brand-charcoal transition text-left"
                        >
                          <Eye className="w-3.5 h-3.5 text-brand-slate" />
                          <span>{isPublished ? 'Unpublish to Draft' : 'Publish Plan'}</span>
                        </button>

                        <div className="h-px bg-brand-stone my-1" />

                        <button
                          onClick={() => {
                            handleDelete(plan);
                            setActiveMenuId(null);
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-red-50 text-brand-crimson transition text-left"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Plan</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Creation & Edit Modal */}
      <PlanModal
        isOpen={modalOpen}
        planToEdit={editingPlan}
        onClose={() => {
          setModalOpen(false);
          setEditingPlan(null);
        }}
        onSuccess={() => {
          fetchPlans();
        }}
      />
    </div>
  );
}
