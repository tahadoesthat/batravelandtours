'use client';

import React, { useState } from 'react';
import { Camera, Maximize2 } from 'lucide-react';
import LightboxModal from './LightboxModal';

interface PlanGalleryMasonryProps {
  images: string[];
  title: string;
}

export default function PlanGalleryMasonry({ images, title }: PlanGalleryMasonryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const handleOpen = (idx: number) => {
    setSelectedIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-brand-stone">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-charcoal">
          <Camera className="w-4 h-4 text-brand-emerald" />
          <span>Trip Visuals ({images.length} {images.length === 1 ? 'Photo' : 'Photos'})</span>
        </div>
        <span className="text-[11px] text-brand-slate font-medium">Click to expand</span>
      </div>

      {/* Masonry / Staggered Layout */}
      <div className="columns-1 sm:columns-2 gap-4 space-y-4">
        {images.slice(0, 10).map((imgUrl, idx) => (
          <div
            key={idx}
            onClick={() => handleOpen(idx)}
            className="group relative overflow-hidden rounded-xl cursor-pointer break-inside-avoid shadow-sm hover:shadow-elevated transition duration-500 bg-brand-stone/30"
          >
            <img
              src={imgUrl}
              alt={`${title} photo ${idx + 1}`}
              className="w-full h-auto object-cover rounded-xl group-hover:scale-105 transition duration-700 ease-out"
              loading="lazy"
            />
            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center rounded-xl">
              <div className="w-10 h-10 rounded-full bg-white/90 text-brand-charcoal flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition duration-300">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox */}
      <LightboxModal
        images={images}
        currentIndex={selectedIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={(idx) => setSelectedIndex(idx)}
      />
    </div>
  );
}
