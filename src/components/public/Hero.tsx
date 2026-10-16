import React from 'react';
import { ArrowRight } from 'lucide-react';
import CategoryDock from './CategoryDock';

export default function Hero() {
  return (
    <section
      className="relative w-full h-[600px] md:h-[660px] bg-brand-charcoal overflow-visible"
      data-purpose="hero-banner"
    >
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          alt="Mountain lake landscape with wanderlust traveler"
          className="w-full h-full object-cover object-center scale-105 transform animate-fade-in"
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85"
        />
        {/* Editorial gradient overlay */}
        <div className="absolute inset-0 hero-gradient-overlay" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-8 flex flex-col justify-center pb-16">
        <div className="max-w-xl text-white">
          {/* Cursive Script Tagline */}
          <p className="font-script text-2xl sm:text-3xl text-[#d4e5de] mb-1 font-semibold tracking-wide">
            Adventure is Worthwhile
          </p>

          {/* Main Display Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] mb-4 tracking-tight">
            Explore. Dream.
            <br />
            Discover.
          </h1>

          {/* Subheading Description */}
          <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-8 max-w-md font-light">
            Inspiring stories, useful travel tips, and breathtaking destinations to fuel your wanderlust and help you travel smarter.
          </p>

          {/* Hero CTA Button */}
          <div>
            <a
              href="#latest"
              className="inline-flex items-center gap-2.5 bg-brand-emerald hover:bg-brand-pine border border-emerald-600/40 text-white font-semibold text-xs tracking-wider uppercase px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
            >
              <span>EXPLORE STORIES</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Floating 4-item Category Dock */}
      <CategoryDock />
    </section>
  );
}
