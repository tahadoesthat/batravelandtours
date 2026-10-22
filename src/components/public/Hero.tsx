'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import CategoryDock from './CategoryDock';

const SLIDES = [
  {
    image: '/images/uzbekistan.jpg',
    tagline: 'Silk Road Splendor',
    destination: 'Samarkand & Bukhara, Uzbekistan',
    title: 'Echoes of the Ancient Silk Road',
    desc: 'Wander under turquoise domes, grand minarets, and historic madrasahs steeped in centuries of trading history and desert wonder.',
    category: 'Destinations',
  },
  {
    image: '/images/japan.jpg',
    tagline: 'Tradition Meets Tomorrow',
    destination: 'Kyoto & Tokyo, Japan',
    title: 'Between Bamboo Groves & Neon Lights',
    desc: 'From sacred shrines draped in autumn leaves to the electric pulse of futuristic metropolises, experience the harmony of old and new.',
    category: 'Destinations',
  },
  {
    image: '/images/istanbul.jpg',
    tagline: 'Where Continents Embrace',
    destination: 'Bosphorus, Istanbul, Turkey',
    title: 'Crossroads of Empires & Seas',
    desc: 'Sail the azure Bosphorus, breathe in the aromas of the Grand Bazaar, and marvel at domes that bridge Europe and Asia.',
    category: 'Destinations',
  },
  {
    image: '/images/dubai.jpg',
    tagline: 'Architectural Marvels',
    destination: 'Downtown & Dunes, Dubai, UAE',
    title: 'Futuristic Skylines & Golden Deserts',
    desc: 'Towering spires, luxury desert retreats, and boundless dunes crafted for travellers seeking both glamour and serene dune landscapes.',
    category: 'Destinations',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goToSlide = useCallback((idx: number) => {
    setCurrent(idx);
  }, []);

  // Automatic playback with 3-second delay, resets smoothly on manual action
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [current, nextSlide]);

  return (
    <section
      className="relative w-full h-[620px] md:h-[680px] bg-brand-charcoal overflow-visible select-none"
      data-purpose="hero-banner"
    >
      {/* Background Slides */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {SLIDES.map((slide, idx) => {
          const isActive = idx === current;
          return (
            <div
              key={slide.image}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={idx === 0}
                sizes="100vw"
                className={`object-cover object-center transform transition-transform duration-7000 ease-out ${isActive ? 'scale-105' : 'scale-100'
                  }`}
              />
              {/* Editorial gradient overlays for high contrast text readability */}
              <div className="absolute inset-0 hero-gradient-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-transparent to-brand-charcoal/30" />
            </div>
          );
        })}
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-8 flex flex-col justify-center pb-20">
        <div className="max-w-2xl text-white">
          {/* Destination Badge & Script Tagline */}
          <div className="flex items-center gap-3 mb-2 animate-fade-in">
            <span className="font-script text-2xl sm:text-3xl text-emerald-300 font-semibold tracking-wide card-text-shadow">
              {SLIDES[current].tagline}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
              {SLIDES[current].destination}
            </span>
          </div>

          {/* Dynamic Display Heading */}
          <h1
            key={`title-${current}`}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.12] mb-4 tracking-tight drop-shadow-md animate-fade-in"
          >
            {SLIDES[current].title}
          </h1>

          {/* Subheading Description */}
          <p
            key={`desc-${current}`}
            className="text-gray-200 text-sm sm:text-base leading-relaxed mb-8 max-w-lg font-light drop-shadow animate-fade-in"
          >
            {SLIDES[current].desc}
          </p>

          {/* Hero Actions & Slide Indicator */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#latest"
              className="inline-flex items-center gap-2.5 bg-brand-emerald hover:bg-brand-pine border border-emerald-500/50 text-white font-semibold text-xs tracking-wider uppercase px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
            >
              <span>Explore Itineraries</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md border border-white/15 rounded-full p-1 shadow-md">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous destination"
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-200 hover:text-white hover:bg-white/20 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center space-x-1.5 px-2">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === current ? 'w-6 bg-emerald-400' : 'w-1.5 bg-white/40 hover:bg-white/70'
                      }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next destination"
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-200 hover:text-white hover:bg-white/20 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating 4-item Category Dock */}
      <CategoryDock />
    </section>
  );
}
