'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppCTAProps {
  planTitle?: string;
  phoneNumber?: string;
  variant?: 'floating' | 'inline';
}

export default function WhatsAppCTA({
  planTitle,
  phoneNumber,
  variant = 'floating',
}: WhatsAppCTAProps) {
  // Clean phone number from admin profile or environment variable
  const rawNumber =
    phoneNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '15550192834';
  const cleanNumber = rawNumber.replace(/[^0-9]/g, '');

  const inquiryText = planTitle
    ? `Hi Bilawal, I'm inquiring about "${planTitle}". Could you please provide details regarding availability and bespoke itinerary curation?`
    : `Hi Bilawal, I'm reaching out from your travel atelier. I would love to discuss custom itinerary planning.`;

  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(inquiryText)}`;

  if (variant === 'inline') {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2.5 bg-brand-emerald hover:bg-brand-pine text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 group"
      >
        <MessageCircle className="w-4 h-4 fill-current group-hover:scale-110 transition" />
        <span>Chat with Bilawal on WhatsApp</span>
      </a>
    );
  }

  return (
    <aside
      aria-label="Instant WhatsApp Assistance"
      className="fixed bottom-6 right-6 z-40 flex items-center group animate-fade-in"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-brand-emerald hover:bg-brand-pine text-white px-5 py-3.5 rounded-full shadow-elevated border border-emerald-600/30 transition transform hover:scale-105"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline text-xs font-bold tracking-wider">
          Chat with Bilawal
        </span>
      </a>
    </aside>
  );
}
