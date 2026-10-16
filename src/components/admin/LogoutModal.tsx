'use client';

import React from 'react';
import { LogOut, X } from 'lucide-react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function LogoutModal({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
}: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
    >
      <div className="bg-white w-full max-w-md rounded-2xl border border-brand-stone p-6 shadow-elevated">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-brand-stone">
          <div className="flex items-center gap-2.5 text-brand-crimson">
            <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
              <LogOut className="w-4 h-4 text-brand-crimson" />
            </div>
            <h3 id="logout-title" className="font-serif text-lg font-bold text-brand-charcoal">
              Sign out of Bilawal Abdullah Travels?
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Cancel"
            className="text-brand-slate hover:text-brand-charcoal transition p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-brand-slate leading-relaxed mb-6 font-normal">
          Your current session will end. Unsaved changes are preserved locally in drafting mode.
        </p>

        <div className="flex items-center justify-end gap-3">
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
            onClick={onConfirm}
            disabled={loading}
            className="px-6 py-2.5 rounded-full bg-brand-crimson hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition shadow-sm"
          >
            {loading ? 'Signing Out...' : 'Sign Out'}
          </button>
        </div>
      </div>
    </div>
  );
}
