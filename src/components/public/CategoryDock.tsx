import React from 'react';
import Link from 'next/link';
import { MapPin, Briefcase, Compass, Globe } from 'lucide-react';

const DOCK_ITEMS = [
  {
    title: 'DESTINATIONS',
    subtitle: 'Explore places',
    icon: MapPin,
    href: '/?category=Destinations#latest',
  },
  {
    title: 'TRAVEL TIPS',
    subtitle: 'Tips & guides',
    icon: Briefcase,
    href: '/?category=Travel Tips#latest',
  },
  {
    title: 'ITINERARIES',
    subtitle: 'Plan your trip',
    icon: Compass,
    href: '/?category=Itineraries#latest',
  },
  {
    title: 'RESOURCES',
    subtitle: 'Tools & more',
    icon: Globe,
    href: '/?category=Photography#latest',
  },
];

export default function CategoryDock() {
  return (
    <div className="absolute -bottom-8 left-0 right-0 z-20 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-full shadow-elevated border border-brand-stone py-4 px-6 sm:px-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-brand-stone/60">
        {DOCK_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center space-x-3 group pt-2 sm:pt-0 ${
                idx > 0 ? 'sm:pl-4' : 'sm:pl-2'
              } first:pt-0`}
            >
              <div className="text-brand-emerald text-xl group-hover:scale-110 transition duration-300">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal group-hover:text-brand-emerald transition">
                  {item.title}
                </span>
                <span className="block text-[11px] text-brand-slate font-medium">
                  {item.subtitle}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
