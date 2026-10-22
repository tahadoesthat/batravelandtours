import React from 'react';
import Link from 'next/link';
import { Plane, MapPin, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

export default function TopBar() {
  return (
    <aside
      className="bg-[#182622] text-[#abb5b0] text-[11px] font-medium tracking-wide border-b border-[#233530] py-2 px-4 sm:px-8"
      data-purpose="top-utility-bar"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        {/* Left Notice */}
        <div className="flex items-center space-x-2">
          <Plane className="w-3.5 h-3.5 text-[#869b93]" />
          <span>Your Journey Our Passion</span>
        </div>

        {/* Center Location */}
        <div className="flex items-center space-x-1.5 hidden sm:flex">
          <MapPin className="w-3.5 h-3.5 text-[#869b93]" />
          <span>Based in Lahore, Pakistan</span>
        </div>

        {/* Right Contact & Admin Link */}
        <div className="flex items-center space-x-6">
          <a
            className="hover:text-white transition flex items-center gap-1.5"
            href="mailto:bookings@batravelandtour.com"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>bookings@batravelandtour.com</span>
          </a>
          <div className="flex items-center space-x-3 text-gray-400">
            <span className="hover:text-white transition cursor-pointer">
              <Instagram className="w-3.5 h-3.5" />
            </span>
            <span className="hover:text-white transition cursor-pointer">
              <Facebook className="w-3.5 h-3.5" />
            </span>
            <span className="hover:text-white transition cursor-pointer">
              <Twitter className="w-3.5 h-3.5" />
            </span>
            <Link
              href="/admin"
              className="text-[10px] uppercase font-bold tracking-wider text-[#869b93] hover:text-white ml-2 pl-2 border-l border-[#2e423d]"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
