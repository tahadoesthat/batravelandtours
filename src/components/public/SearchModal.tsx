'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, MapPin, ArrowRight, Loader2 } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      return;
    }

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/plans?status=PUBLISHED&search=${encodeURIComponent(query)}&limit=6`);
        const data = await res.json();
        if (data.success) {
          setResults(data.plans || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-elevated border border-brand-stone overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-brand-stone gap-3">
          <Search className="w-5 h-5 text-brand-emerald" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search travel plans, destinations, or tips..."
            className="w-full text-base bg-transparent border-0 focus:outline-none focus:ring-0 text-brand-charcoal placeholder-brand-slate"
          />
          {loading ? (
            <Loader2 className="w-5 h-5 text-brand-slate animate-spin" />
          ) : (
            <button
              onClick={onClose}
              className="text-brand-slate hover:text-brand-charcoal transition p-1"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto p-4 divide-y divide-brand-stone/60">
          {query.trim() === '' ? (
            <div className="text-center py-10 text-brand-slate text-sm">
              <p>Type to search all published journeys and guides.</p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <span className="text-[11px] bg-brand-alabaster px-2.5 py-1 rounded-full border border-brand-stone text-brand-slate">
                  Amalfi Coast
                </span>
                <span className="text-[11px] bg-brand-alabaster px-2.5 py-1 rounded-full border border-brand-stone text-brand-slate">
                  Bali
                </span>
                <span className="text-[11px] bg-brand-alabaster px-2.5 py-1 rounded-full border border-brand-stone text-brand-slate">
                  Kyoto
                </span>
              </div>
            </div>
          ) : results.length === 0 && !loading ? (
            <div className="text-center py-10 text-brand-slate text-sm">
              No journeys found matching <span className="font-semibold text-brand-charcoal">"{query}"</span>.
            </div>
          ) : (
            results.map((plan) => (
              <Link
                key={plan.id}
                href={`/plans/${plan.slug}`}
                onClick={onClose}
                className="flex items-center gap-4 py-3 px-3 hover:bg-brand-alabaster rounded-xl transition group"
              >
                <img
                  src={plan.primeThumbnail}
                  alt={plan.title}
                  className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[10px] text-brand-emerald font-semibold uppercase tracking-wider mb-0.5">
                    <MapPin className="w-3 h-3" />
                    <span>{plan.destination}</span>
                    <span>•</span>
                    <span className="text-brand-slate">{plan.category}</span>
                  </div>
                  <h4 className="font-serif font-bold text-brand-charcoal group-hover:text-brand-emerald transition truncate text-sm">
                    {plan.title}
                  </h4>
                  <p className="text-xs text-brand-slate truncate">{plan.shortDescription}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-brand-slate group-hover:text-brand-emerald group-hover:translate-x-1 transition" />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
