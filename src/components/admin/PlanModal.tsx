'use client';

import React, { useState, useEffect } from 'react';
import { X, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import MultiImageUploader from './MultiImageUploader';
import TiptapEditor from './TiptapEditor';
import TripOverviewEditor, { TripOverviewData } from './TripOverviewEditor';

const DESTINATION_SUGGESTIONS = [
  'Amalfi Coast, Italy',
  'Kyoto, Japan',
  'Bali, Indonesia',
  'Swiss Alps, Switzerland',
  'Reykjavik, Iceland',
  'Santorini, Greece',
];

const CATEGORIES = ['Destinations', 'Travel Tips', 'Itineraries', 'Photography'];

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  planToEdit?: any;
}

export default function PlanModal({
  isOpen,
  onClose,
  onSuccess,
  planToEdit,
}: PlanModalProps) {
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [category, setCategory] = useState('Destinations');
  const [shortDescription, setShortDescription] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [primeThumbnail, setPrimeThumbnail] = useState('');
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT');
  const [overview, setOverview] = useState<TripOverviewData>({ enabled: false });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (planToEdit) {
      setTitle(planToEdit.title || '');
      setDestination(planToEdit.destination || '');
      setCategory(planToEdit.category || 'Destinations');
      setShortDescription(planToEdit.shortDescription || '');
      setContent(planToEdit.content || '');
      setImages(planToEdit.images || []);
      setPrimeThumbnail(planToEdit.primeThumbnail || '');
      setStatus(planToEdit.status || 'DRAFT');
      setOverview(planToEdit.overview || { enabled: false });
    } else {
      setTitle('');
      setDestination('');
      setCategory('Destinations');
      setShortDescription('');
      setContent('');
      setImages([]);
      setPrimeThumbnail('');
      setStatus('DRAFT');
      setOverview({ enabled: false });
    }
    setError(null);
  }, [planToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (targetStatus?: 'DRAFT' | 'PUBLISHED') => {
    setError(null);
    const finalStatus = targetStatus || status;

    if (!title.trim()) {
      setError('Please provide a Travel Plan Title.');
      return;
    }
    if (!destination.trim()) {
      setError('Please specify a Destination Tag.');
      return;
    }
    if (!shortDescription.trim()) {
      setError('Please provide a brief excerpt (up to 300 characters).');
      return;
    }

    setLoading(true);

    try {
      const url = planToEdit ? `/api/plans/${planToEdit.id}` : '/api/plans';
      const method = planToEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          destination,
          category,
          shortDescription,
          content,
          images,
          primeThumbnail: primeThumbnail || images[0] || '',
          status: finalStatus,
          overview: overview.enabled ? overview : null,
        }),
      });

      // Safely parse JSON response to prevent unhandled "unexpected token" JSON errors
      const responseText = await res.text();
      let data: any = {};
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch {
        throw new Error(`Server returned invalid response (Status ${res.status}).`);
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save travel plan.');
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in"
    >
      <div className="bg-white w-full max-w-4xl rounded-2xl border border-brand-stone shadow-elevated overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* 1. Modal Header */}
        <div className="px-6 py-5 border-b border-brand-stone flex items-center justify-between flex-shrink-0 bg-brand-alabaster/50">
          <div>
            <h2 className="font-serif text-2xl font-bold text-brand-charcoal">
              {planToEdit ? 'Edit Travel Plan' : 'Create New Travel Plan'}
            </h2>
            <p className="text-xs text-brand-slate mt-0.5">
              Draft an itinerary or publish directly to the live travel blog.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Modal"
            className="text-brand-slate hover:text-brand-charcoal p-1.5 rounded-full hover:bg-brand-stone/40 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-7 overflow-y-auto flex-1">
          {error && (
            <div className="flex items-center gap-2 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* 2. Media Upload Section (Max 10 Images) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-2">
              Destination Gallery & Prime Cover (Max 10 Photos)
            </label>
            <MultiImageUploader
              images={images}
              primeThumbnail={primeThumbnail}
              onImagesChange={(imgs) => setImages(imgs)}
              onPrimeChange={(url) => setPrimeThumbnail(url)}
            />
          </div>

          {/* 3. Core Metadata Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1.5">
                Travel Plan Title <span className="text-brand-crimson">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. The Ultimate Amalfi Coast Travel Guide"
                className="w-full font-serif text-base px-4 py-2.5 rounded-[10px] border border-brand-stone focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald bg-white text-brand-charcoal"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1.5">
                  Destination Tag <span className="text-brand-crimson">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Amalfi Coast, Italy"
                  className="w-full text-sm px-4 py-2.5 rounded-[10px] border border-brand-stone focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald bg-white text-brand-charcoal"
                />
                {/* Auto Suggestions */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {DESTINATION_SUGGESTIONS.map((sugg) => (
                    <button
                      key={sugg}
                      type="button"
                      onClick={() => setDestination(sugg)}
                      className="text-[10px] bg-brand-alabaster hover:bg-brand-emerald hover:text-white border border-brand-stone text-brand-slate px-2 py-0.5 rounded-full transition"
                    >
                      + {sugg}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1.5">
                  Category Selector
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-sm px-4 py-2.5 rounded-[10px] border border-brand-stone focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald bg-white text-brand-charcoal"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal">
                  Brief Excerpt / Short Description <span className="text-brand-crimson">*</span>
                </label>
                <span
                  className={`text-[11px] font-semibold ${
                    shortDescription.length > 280 ? 'text-brand-amber' : 'text-brand-slate'
                  }`}
                >
                  {shortDescription.length} / 300
                </span>
              </div>
              <textarea
                rows={2}
                maxLength={300}
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="A 2-line summary preview for cards, social previews, and editorial intro..."
                className="w-full text-sm p-3.5 rounded-[10px] border border-brand-stone focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald bg-white text-brand-charcoal resize-none"
              />
            </div>
          </div>

          {/* 4. Quick Trip Overview Table (Optional Dossier Table) */}
          <TripOverviewEditor data={overview} onChange={(upd) => setOverview(upd)} />

          {/* 5. Rich Text Editorial Composer ("Detailed Breakdown") */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-2">
              Detailed Breakdown & Editorial Content
            </label>
            <TiptapEditor
              content={content}
              onChange={(html) => setContent(html)}
            />
          </div>
        </div>

        {/* 5. Publication Footer Bar */}
        <div className="px-6 py-4 border-t border-brand-stone bg-brand-alabaster/60 flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
          {/* Status Indicator Toggle */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-brand-charcoal">Status:</span>
            <div className="inline-flex items-center bg-white border border-brand-stone rounded-full p-1 shadow-xs">
              <button
                type="button"
                onClick={() => setStatus('DRAFT')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                  status === 'DRAFT'
                    ? 'bg-brand-stone text-brand-charcoal'
                    : 'text-brand-slate hover:text-brand-charcoal'
                }`}
              >
                Draft
              </button>
              <button
                type="button"
                onClick={() => setStatus('PUBLISHED')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                  status === 'PUBLISHED'
                    ? 'bg-brand-emerald text-white'
                    : 'text-brand-slate hover:text-brand-charcoal'
                }`}
              >
                Published
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 rounded-full border border-brand-stone text-xs font-semibold text-brand-charcoal hover:bg-brand-alabaster transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleSubmit('DRAFT')}
              disabled={loading}
              className="px-5 py-2.5 rounded-full bg-stone-200 hover:bg-stone-300 text-brand-charcoal text-xs font-semibold transition disabled:opacity-50"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={() => handleSubmit('PUBLISHED')}
              disabled={loading}
              className="px-6 py-2.5 rounded-full bg-brand-emerald hover:bg-brand-pine text-white text-xs font-bold uppercase tracking-wider transition shadow-sm disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Publish Travel Plan</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
