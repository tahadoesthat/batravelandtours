'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowRight, Instagram, Facebook, Twitter, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#141C1A] text-white pt-20 pb-12 border-t border-[#233530]" id="newsletter">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Newsletter Section */}
        <div className="bg-[#1C2825] rounded-2xl border border-[#2D3E39] p-8 sm:p-12 mb-16 relative overflow-hidden">
          <div className="max-w-2xl">
            <span className="font-script text-2xl text-emerald-300 block mb-1">
              Join the Fellowship of Explorers
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Subscribe to Bilawal's Dispatches
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
              Receive private itinerary blueprints, photography notes, and early announcements of bespoke group expeditions delivered once a month. No spam, ever.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm bg-emerald-950/60 p-4 rounded-xl border border-emerald-800">
                <Check className="w-5 h-5" />
                <span>You're subscribed! Welcome to the fellowship.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your personal email address..."
                  className="flex-1 bg-[#121B19] border border-[#2F443E] rounded-full px-6 py-3.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-brand-emerald"
                />
                <button
                  type="submit"
                  className="bg-brand-emerald hover:bg-brand-pine text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-full transition shadow-md flex items-center justify-center gap-2"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Links & Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#233530]">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <div className="bg-white rounded-xl p-2 inline-flex items-center shadow-sm">
                <Image
                  src="/images/logo.svg"
                  alt="BA Travel and Tours"
                  width={160}
                  height={50}
                  className="h-10 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm mb-6">
              A private luxury travel publication and expedition atelier dedicated to architectural stillness, honest stories, and bespoke global journeys.
            </p>
            <div className="flex items-center space-x-3 text-gray-400">
              <span className="w-8 h-8 rounded-full bg-[#1C2825] flex items-center justify-center hover:text-white transition cursor-pointer">
                <Instagram className="w-4 h-4" />
              </span>
              <span className="w-8 h-8 rounded-full bg-[#1C2825] flex items-center justify-center hover:text-white transition cursor-pointer">
                <Facebook className="w-4 h-4" />
              </span>
              <span className="w-8 h-8 rounded-full bg-[#1C2825] flex items-center justify-center hover:text-white transition cursor-pointer">
                <Twitter className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link href="/visas" className="hover:text-emerald-300 transition font-semibold text-emerald-400/90 flex items-center gap-1.5">
                  <span>Visa Requirements (9 Guides)</span>
                </Link>
              </li>
              <li>
                <Link href="/?category=Destinations#latest" className="hover:text-white transition">
                  Signature Destinations
                </Link>
              </li>
              <li>
                <Link href="/?category=Itineraries#latest" className="hover:text-white transition">
                  Curated Itineraries
                </Link>
              </li>
              <li>
                <Link href="/?category=Travel Tips#latest" className="hover:text-white transition">
                  Travel Tips &amp; Gear
                </Link>
              </li>
              <li>
                <Link href="/?category=Photography#latest" className="hover:text-white transition">
                  Visual Monographs
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Atelier */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">
              Atelier Inquiries
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <a href="mailto:bookings@batravelandtour.com" className="hover:text-emerald-300 transition">
                  bookings@batravelandtour.com
                </a>
              </li>
              <li>
                <Link href="/admin" className="hover:text-emerald-300 transition">
                  Backend Admin Portal →
                </Link>
              </li>
              <li>
                <a href="#inquiry-form" className="hover:text-white transition">
                  Send Direct Inquiry
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} BA Travel &amp; Tours. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span>Privacy Policy</span>
            <span>Terms of Editorial</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
