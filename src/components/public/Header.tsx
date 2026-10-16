'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import SearchModal from './SearchModal';

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header
        className="bg-white/95 backdrop-blur sticky top-0 z-40 border-b border-brand-stone shadow-sm"
        data-purpose="site-navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Mountain circle emblem */}
            <div className="w-10 h-10 rounded-full border border-brand-stone flex items-center justify-center bg-brand-alabaster text-brand-pine group-hover:border-brand-emerald transition">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M14 6l-3.8 5.7 1.5 2.2L10 16.5 4 19h16l-6-13zm-5.7 7.7L10 11.2l2.3 3.5-4 1.3v-2.3z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-brand-charcoal group-hover:text-brand-emerald transition">
                Bilawal Abdullah
              </span>
              <span className="text-[9px] tracking-[0.25em] font-bold text-brand-slate uppercase -mt-0.5">
                TRAVEL BLOG
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs font-semibold tracking-wider text-brand-charcoal">
            <Link
              href="/"
              className="text-brand-emerald relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand-emerald"
            >
              HOME
            </Link>
            <Link href="/?category=Destinations" className="hover:text-brand-emerald transition">
              DESTINATIONS
            </Link>
            <Link href="/?category=Travel Tips" className="hover:text-brand-emerald transition">
              TRAVEL TIPS
            </Link>
            <Link href="/?category=Itineraries" className="hover:text-brand-emerald transition">
              ITINERARIES
            </Link>
            <Link href="/?category=Photography" className="hover:text-brand-emerald transition">
              PHOTOGRAPHY
            </Link>
            <a href="#about-creator" className="hover:text-brand-emerald transition">
              ABOUT ME
            </a>
            <a href="#inquiry-form" className="hover:text-brand-emerald transition">
              CONTACT
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-5">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="text-brand-slate hover:text-brand-emerald text-sm p-1.5 rounded-full hover:bg-brand-alabaster transition"
            >
              <Search className="w-4 h-4" />
            </button>
            <a
              href="#newsletter"
              className="bg-brand-emerald hover:bg-brand-pine text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-wider transition shadow-sm hover:shadow"
            >
              SUBSCRIBE
            </a>
          </div>
        </div>
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
