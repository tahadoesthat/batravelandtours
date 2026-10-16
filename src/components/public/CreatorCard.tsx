import React from 'react';
import { Instagram, Youtube, Twitter, Mail, Phone, MapPin } from 'lucide-react';

interface CreatorCardProps {
  adminProfile: {
    name: string;
    phone: string;
    description: string;
    avatarUrl: string;
  };
}

export default function CreatorCard({ adminProfile }: CreatorCardProps) {
  return (
    <div
      id="about-creator"
      className="bg-white rounded-2xl border border-brand-stone p-8 sm:p-10 shadow-subtle my-12"
      data-purpose="creator-profile-card"
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 text-center sm:text-left">
        {/* 80px - 96px Circular Avatar */}
        <div className="relative flex-shrink-0">
          <img
            src={adminProfile.avatarUrl}
            alt={adminProfile.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-brand-emerald/15 shadow-sm"
          />
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-brand-emerald text-white flex items-center justify-center text-xs shadow">
            ★
          </div>
        </div>

        {/* Bio Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-emerald">
                Author & Atelier Founder
              </span>
              <h3 className="font-serif text-2xl font-bold text-brand-charcoal">
                {adminProfile.name}
              </h3>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2.5 text-brand-slate">
              <span className="p-2 rounded-full hover:bg-brand-alabaster hover:text-brand-emerald transition cursor-pointer">
                <Instagram className="w-4 h-4" />
              </span>
              <span className="p-2 rounded-full hover:bg-brand-alabaster hover:text-brand-emerald transition cursor-pointer">
                <Youtube className="w-4 h-4" />
              </span>
              <span className="p-2 rounded-full hover:bg-brand-alabaster hover:text-brand-emerald transition cursor-pointer">
                <Twitter className="w-4 h-4" />
              </span>
            </div>
          </div>

          <p className="text-sm text-brand-slate leading-relaxed mb-5 font-normal">
            {adminProfile.description}
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-brand-slate pt-4 border-t border-brand-stone">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-emerald" />
              <span>Bali, Indonesia • Worldwide Expeditions</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-brand-emerald" />
              <span>{adminProfile.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
