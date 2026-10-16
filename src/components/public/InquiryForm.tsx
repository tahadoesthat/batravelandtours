'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface InquiryFormProps {
  targetPackage?: string;
  destination?: string;
}

export default function InquiryForm({
  targetPackage = 'General Inquiry',
  destination,
}: InquiryFormProps) {
  const [formData, setFormData] = useState({
    senderName: '',
    email: '',
    phone: '',
    message: targetPackage !== 'General Inquiry'
      ? `Hi Bilawal, I am inquiring about "${targetPackage}". I would love custom dates, availability, and bespoke recommendations.`
      : '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.senderName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please provide your name, email, and message.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderName: formData.senderName,
          email: formData.email,
          phone: formData.phone,
          targetPackage,
          message: formData.message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="inquiry-form"
      className="bg-white rounded-2xl border border-brand-stone p-8 sm:p-10 shadow-subtle my-12"
      data-purpose="inquiry-form-card"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-emerald">
            Direct Atelier Inquiry
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal mt-1">
            {targetPackage !== 'General Inquiry'
              ? `Inquire About ${targetPackage}`
              : 'Plan Your Next Bespoke Journey'}
          </h3>
          <p className="text-xs sm:text-sm text-brand-slate mt-2 max-w-lg mx-auto font-light">
            {destination
              ? `Interested in curated private arrangements for ${destination}? Send a message directly to Bilawal's atelier.`
              : 'Looking for tailored recommendations, private expedition planning, or photographic inquiries? Get in touch.'}
          </p>
        </div>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center animate-fade-in">
            <CheckCircle2 className="w-12 h-12 text-brand-emerald mx-auto mb-3" />
            <h4 className="font-serif text-xl font-bold text-brand-charcoal mb-2">
              Inquiry Dispatched to Bilawal
            </h4>
            <p className="text-sm text-brand-slate max-w-md mx-auto mb-6">
              Thank you, <span className="font-semibold text-brand-charcoal">{formData.senderName}</span>. Your inquiry regarding{' '}
              <span className="font-semibold text-brand-charcoal">"{targetPackage}"</span> has been logged directly into our system. Bilawal will reply to{' '}
              <span className="font-semibold text-brand-charcoal">{formData.email}</span> shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ senderName: '', email: '', phone: '', message: '' });
              }}
              className="text-xs font-semibold text-brand-emerald hover:text-brand-pine underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                  Full Name <span className="text-brand-crimson">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.senderName}
                  onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full text-sm px-4 py-2.5 rounded-[10px] border border-brand-stone focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald bg-white text-brand-charcoal"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                  Email Address <span className="text-brand-crimson">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. sarah.j@example.com"
                  className="w-full text-sm px-4 py-2.5 rounded-[10px] border border-brand-stone focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald bg-white text-brand-charcoal"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                Phone Number (WhatsApp preferred)
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. +1 415 555 2671"
                className="w-full text-sm px-4 py-2.5 rounded-[10px] border border-brand-stone focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald bg-white text-brand-charcoal"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                Your Message & Dates <span className="text-brand-crimson">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your desired travel dates, party size, special requirements..."
                className="w-full text-sm p-4 rounded-[10px] border border-brand-stone focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald bg-white text-brand-charcoal resize-none"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[11px] text-brand-slate">
                Encrypted & dispatched directly to Bilawal Abdullah's admin inbox.
              </span>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-emerald hover:bg-brand-pine text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-full shadow transition disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
