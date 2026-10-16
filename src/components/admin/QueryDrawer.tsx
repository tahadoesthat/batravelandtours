'use client';

import React from 'react';
import {
  X,
  Mail,
  Phone,
  MessageCircle,
  Calendar,
  Compass,
  Trash2,
  CheckCircle,
  Clock,
  Inbox,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface QueryDrawerProps {
  query: any | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (id: string, newStatus: string) => void;
  onDelete: (id: string) => void;
}

export default function QueryDrawer({
  query,
  isOpen,
  onClose,
  onStatusChange,
  onDelete,
}: QueryDrawerProps) {
  if (!isOpen || !query) return null;

  const cleanPhone = query.phone ? query.phone.replace(/[^0-9]/g, '') : '';
  const whatsappUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
        `Hi ${query.senderName}, thank you for inquiring about "${query.targetPackage}" with Bilawal Abdullah Travels.`
      )}`
    : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fade-in"
    >
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-xl bg-white h-full shadow-2xl border-l border-brand-stone p-6 sm:p-8 flex flex-col justify-between overflow-y-auto z-10 animate-slide-left">
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-brand-stone">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-emerald">
                Inquiry Inspection
              </span>
              <h2 className="font-serif text-2xl font-bold text-brand-charcoal mt-0.5">
                {query.senderName}
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close Drawer"
              className="p-1.5 rounded-full hover:bg-brand-alabaster text-brand-slate hover:text-brand-charcoal transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Status Selector Bar */}
          <div className="bg-brand-alabaster rounded-xl p-4 border border-brand-stone mb-6">
            <span className="block text-xs font-semibold text-brand-charcoal mb-2">
              Update Inquiry Lifecycle Status:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onStatusChange(query.id, 'UNREAD')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  query.status === 'UNREAD'
                    ? 'bg-brand-emerald text-white shadow-xs'
                    : 'bg-white border border-brand-stone text-brand-slate hover:text-brand-charcoal'
                }`}
              >
                <Inbox className="w-3.5 h-3.5" />
                <span>Unread</span>
              </button>

              <button
                type="button"
                onClick={() => onStatusChange(query.id, 'IN_PROGRESS')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  query.status === 'IN_PROGRESS'
                    ? 'bg-brand-amber text-white shadow-xs'
                    : 'bg-white border border-brand-stone text-brand-slate hover:text-brand-charcoal'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>In Progress</span>
              </button>

              <button
                type="button"
                onClick={() => onStatusChange(query.id, 'RESOLVED')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  query.status === 'RESOLVED'
                    ? 'bg-slate-700 text-white shadow-xs'
                    : 'bg-white border border-brand-stone text-brand-slate hover:text-brand-charcoal'
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Resolved</span>
              </button>
            </div>
          </div>

          {/* Associated Package & Timestamps */}
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-brand-stone">
              <Compass className="w-4 h-4 text-brand-emerald flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-slate tracking-wider">
                  Target Journey / Itinerary
                </span>
                <p className="text-sm font-semibold text-brand-charcoal">
                  {query.targetPackage || 'General Atelier Inquiry'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 bg-white rounded-xl border border-brand-stone">
                <span className="text-[10px] uppercase font-bold text-brand-slate tracking-wider block mb-1">
                  Received Date
                </span>
                <span className="text-xs font-semibold text-brand-charcoal flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand-emerald" />
                  {formatDate(query.createdAt, 'MMM d, yyyy h:mm a')}
                </span>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-brand-stone">
                <span className="text-[10px] uppercase font-bold text-brand-slate tracking-wider block mb-1">
                  Contact Phone
                </span>
                <span className="text-xs font-semibold text-brand-charcoal flex items-center gap-1.5 truncate">
                  <Phone className="w-3.5 h-3.5 text-brand-emerald" />
                  {query.phone || 'Not provided'}
                </span>
              </div>
            </div>
          </div>

          {/* Full Message Text */}
          <div className="space-y-2 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-charcoal">
              Traveler Message:
            </span>
            <div className="p-4 rounded-xl bg-brand-alabaster border border-brand-stone text-sm text-brand-charcoal leading-relaxed whitespace-pre-wrap font-light">
              {query.message}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-6 border-t border-brand-stone space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={`mailto:${query.email}?subject=${encodeURIComponent(
                `Re: Inquiring about ${query.targetPackage}`
              )}`}
              className="inline-flex items-center justify-center gap-2 bg-brand-charcoal hover:bg-black text-white text-xs font-semibold py-3 rounded-full transition shadow-xs"
            >
              <Mail className="w-4 h-4" />
              <span>Email Reply</span>
            </a>

            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-brand-emerald hover:bg-brand-pine text-white text-xs font-semibold py-3 rounded-full transition shadow-xs"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Reply</span>
              </a>
            ) : (
              <button
                disabled
                className="inline-flex items-center justify-center gap-2 bg-stone-100 text-stone-400 text-xs font-semibold py-3 rounded-full cursor-not-allowed"
              >
                <MessageCircle className="w-4 h-4" />
                <span>No Phone #</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => onDelete(query.id)}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-brand-crimson hover:bg-red-50 rounded-full transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Inquiry Lead</span>
          </button>
        </div>
      </div>
    </div>
  );
}
