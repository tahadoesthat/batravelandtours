import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

const FEATURED_DESTINATIONS = [
  {
    name: 'Amalfi Coast, Italy',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
    tag: 'Mediterranean',
  },
  {
    name: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    tag: 'Cultural Heritage',
  },
  {
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    tag: 'Tropical Sanctuaries',
  },
  {
    name: 'Swiss Alps, Switzerland',
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80',
    tag: 'Alpine Wilderness',
  },
];

export default function DestinationsRow() {
  return (
    <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto" id="destinations">
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-brand-stone">
        <div>
          <span className="text-[11px] font-bold text-brand-emerald tracking-[0.2em] uppercase">
            Curated Atelier
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal mt-1">
            Signature Destinations
          </h2>
        </div>
        <a
          href="#latest"
          className="text-xs font-semibold text-brand-emerald tracking-wider uppercase flex items-center gap-1.5 hover:text-brand-pine"
        >
          <span>VIEW STORIES</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURED_DESTINATIONS.map((dest) => (
          <Link
            key={dest.name}
            href={`/?search=${encodeURIComponent(dest.name.split(',')[0])}#latest`}
            className="group relative rounded-2xl overflow-hidden h-72 shadow-subtle hover:shadow-elevated transition duration-500 flex flex-col justify-end p-5"
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative z-10 text-white">
              <span className="text-[10px] tracking-widest font-semibold uppercase text-emerald-300 block mb-1">
                {dest.tag}
              </span>
              <h3 className="font-serif text-lg font-bold leading-tight group-hover:text-emerald-200 transition flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{dest.name}</span>
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
