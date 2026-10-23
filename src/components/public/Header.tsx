'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import SearchModal from './SearchModal';
import FlagIcon from './FlagIcon';

interface VisaNavItem {
  name: string;
  flag: string;
  countryCode: string;
  slug: string;
  feeHint: string;
}

const VISA_NAV_ITEMS: VisaNavItem[] = [
  { name: 'Canada', flag: '🇨🇦', countryCode: 'ca', slug: 'canada', feeHint: 'PKR 50,000' },
  { name: 'Europe (Schengen)', flag: '🇪🇺', countryCode: 'eu', slug: 'schengen', feeHint: 'PKR 25,000' },
  { name: 'USA', flag: '🇺🇸', countryCode: 'us', slug: 'usa', feeHint: 'PKR 25,000' },
  { name: 'Turkey', flag: '🇹🇷', countryCode: 'tr', slug: 'turkey', feeHint: 'PKR 15,000' },
  { name: 'Thailand', flag: '🇹🇭', countryCode: 'th', slug: 'thailand', feeHint: 'PKR 18,500' },
  { name: 'South Africa', flag: '🇿🇦', countryCode: 'za', slug: 'south-africa', feeHint: 'PKR 25,000' },
  { name: 'Japan', flag: '🇯🇵', countryCode: 'jp', slug: 'japan', feeHint: 'PKR 25,000' },
  { name: 'Australia', flag: '🇦🇺', countryCode: 'au', slug: 'australia', feeHint: 'PKR 35,000' },
  { name: 'Malaysia', flag: '🇲🇾', countryCode: 'my', slug: 'malaysia', feeHint: 'PKR 20,000+' },
];

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [visasDropdownOpen, setVisasDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileVisasOpen, setMobileVisasOpen] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isVisasActive = pathname?.startsWith('/visas');
  const isHomeActive = pathname === '/';

  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setVisasDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setVisasDropdownOpen(false);
  }, [pathname]);

  // Smart Hide on Scroll Down, Show on Scroll Up
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Always stay visible if mobile menu or visas dropdown is open
          if (mobileMenuOpen || visasDropdownOpen) {
            setHeaderVisible(true);
            lastScrollY.current = currentScrollY;
            ticking = false;
            return;
          }

          // Near top: always keep header visible
          if (currentScrollY <= 40) {
            setHeaderVisible(true);
          } else if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 5) {
            // Scrolling down -> hide completely
            setHeaderVisible(false);
          } else if (currentScrollY < lastScrollY.current) {
            // Scrolling up even a bit -> show header
            setHeaderVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen, visasDropdownOpen]);

  return (
    <>
      <header
        className={`bg-white/95 backdrop-blur sticky top-0 z-40 border-b border-brand-stone shadow-sm transition-transform duration-300 ease-in-out ${
          headerVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        data-purpose="site-navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/images/logo.svg"
              alt="BA Travel and Tours"
              width={160}
              height={52}
              className="h-11 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              priority
            />
          </Link>

          {/* Desktop Navigation Links: Only Home, Visas, About, Contact */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold tracking-wider text-brand-charcoal">
            {/* 1. HOME */}
            <Link
              href="/"
              className={`py-1 transition hover:text-brand-emerald ${
                isHomeActive
                  ? "text-brand-emerald font-bold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand-emerald"
                  : ''
              }`}
            >
              HOME
            </Link>

            {/* 2. VISAS (Dropdown) */}
            <div
              ref={dropdownRef}
              className="relative py-1"
              onMouseEnter={() => setVisasDropdownOpen(true)}
              onMouseLeave={() => setVisasDropdownOpen(false)}
            >
              <div className="flex items-center gap-1">
                <Link
                  href="/visas"
                  className={`py-1 uppercase tracking-wider transition hover:text-brand-emerald ${
                    isVisasActive
                      ? "text-brand-emerald font-bold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand-emerald"
                      : ''
                  }`}
                >
                  VISAS
                </Link>
                <button
                  type="button"
                  onClick={() => setVisasDropdownOpen((prev) => !prev)}
                  aria-label="Toggle Visas Menu"
                  aria-haspopup="true"
                  aria-expanded={visasDropdownOpen}
                  className="p-1 text-brand-slate hover:text-brand-emerald transition"
                >
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      visasDropdownOpen ? 'rotate-180 text-brand-emerald' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Dropdown Menu Panel */}
              {visasDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[420px] z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-white rounded-2xl shadow-elevated border border-brand-stone/90 p-4 overflow-hidden">
                    <div className="flex items-center justify-between px-3 pb-2.5 mb-2 border-b border-brand-stone/60">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-slate">
                        Consular Document Checklists
                      </span>
                      <Link
                        href="/visas"
                        onClick={() => setVisasDropdownOpen(false)}
                        className="text-[11px] font-semibold text-brand-emerald hover:text-brand-pine flex items-center gap-1"
                      >
                        All Guides <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      {VISA_NAV_ITEMS.map((item) => {
                        const isCurrent = pathname === `/visas/${item.slug}`;
                        return (
                          <Link
                            key={item.slug}
                            href={`/visas/${item.slug}`}
                            onClick={() => setVisasDropdownOpen(false)}
                            className={`flex items-center gap-2.5 p-2 rounded-xl transition-all ${
                              isCurrent
                                ? 'bg-brand-emerald/10 text-brand-emerald font-bold'
                                : 'hover:bg-brand-alabaster text-brand-charcoal'
                            }`}
                          >
                            <FlagIcon countryCode={item.countryCode} size="md" alt={item.name} />
                            <div className="min-w-0 flex-1">
                              <span className="block text-xs font-semibold truncate leading-tight">
                                {item.name}
                              </span>
                              <span className="text-[10px] text-brand-slate block mt-0.5">
                                {item.feeHint}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-brand-stone/60 px-3 flex items-center justify-between text-[11px] text-brand-slate bg-brand-alabaster/70 -mx-4 -mb-4 p-3 rounded-b-2xl">
                      <span>9 Verbatim Requirements</span>
                      <span className="font-mono text-brand-emerald font-semibold">
                        300 DPI Scan Standard
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. ABOUT */}
            <Link
              href="/about"
              className={`py-1 uppercase tracking-wider transition hover:text-brand-emerald ${
                pathname === '/about'
                  ? "text-brand-emerald font-bold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand-emerald"
                  : ''
              }`}
            >
              ABOUT
            </Link>

            {/* 4. CONTACT */}
            <Link
              href="/contact"
              className={`py-1 uppercase tracking-wider transition hover:text-brand-emerald ${
                pathname === '/contact'
                  ? "text-brand-emerald font-bold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand-emerald"
                  : ''
              }`}
            >
              CONTACT
            </Link>
          </nav>

          {/* Right Actions: Search & Subscribe (Zero user login/account UI) */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="text-brand-slate hover:text-brand-emerald text-sm p-1.5 rounded-full hover:bg-brand-alabaster transition"
            >
              <Search className="w-4 h-4" />
            </button>
            <a
              href="/#newsletter"
              className="hidden sm:inline-flex bg-brand-emerald hover:bg-brand-pine text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-wider transition shadow-sm hover:shadow"
            >
              SUBSCRIBE
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Mobile Menu"
              className="lg:hidden p-2 rounded-xl text-brand-charcoal hover:bg-brand-alabaster transition"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer: Only Home, Visas, About, Contact */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-brand-stone/80 px-4 py-5 shadow-lg max-h-[calc(100vh-70px)] overflow-y-auto animate-in fade-in duration-200">
            <nav className="flex flex-col space-y-4 text-xs font-semibold tracking-wider text-brand-charcoal">
              {/* Home */}
              <Link
                href="/"
                className={`py-1 transition hover:text-brand-emerald ${isHomeActive ? 'text-brand-emerald font-bold' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                HOME
              </Link>

              {/* Visas Accordion */}
              <div className="border-y border-brand-stone/60 py-2">
                <button
                  onClick={() => setMobileVisasOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between text-left py-1 text-brand-emerald font-bold"
                >
                  <span className="flex items-center gap-1.5">
                    VISAS (9 DESTINATIONS)
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileVisasOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {mobileVisasOpen && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-3 pl-2">
                    {VISA_NAV_ITEMS.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/visas/${item.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-brand-alabaster"
                      >
                        <span className="flex items-center gap-2 text-xs">
                          <FlagIcon countryCode={item.countryCode} size="sm" alt={item.name} />
                          <span>{item.name}</span>
                        </span>
                        <span className="text-[10px] text-brand-slate font-mono">
                          {item.feeHint}
                        </span>
                      </Link>
                    ))}
                    <Link
                      href="/visas"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xs text-brand-emerald font-bold p-2 hover:underline flex items-center gap-1"
                    >
                      View All Visa Guides &amp; Requirements →
                    </Link>
                  </div>
                )}
              </div>

              {/* About */}
              <Link
                href="/about"
                className={`py-1 transition hover:text-brand-emerald ${pathname === '/about' ? 'text-brand-emerald font-bold' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                ABOUT
              </Link>

              {/* Contact */}
              <Link
                href="/contact"
                className={`py-1 transition hover:text-brand-emerald ${pathname === '/contact' ? 'text-brand-emerald font-bold' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                CONTACT
              </Link>

              {/* Subscribe CTA */}
              <a
                href="/#newsletter"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-brand-emerald text-white py-3 rounded-full text-xs font-bold tracking-wider mt-3"
              >
                SUBSCRIBE TO MONOGRAPH
              </a>
            </nav>
          </div>
        )}
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
