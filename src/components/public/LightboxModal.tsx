'use client';

import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxModalProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export default function LightboxModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onIndexChange,
}: LightboxModalProps) {
  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        onIndexChange((currentIndex - 1 + images.length) % images.length);
      }
      if (e.key === 'ArrowRight') {
        onIndexChange((currentIndex + 1) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onIndexChange]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox Preview"
      onClick={onClose}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fade-in select-none cursor-zoom-out"
    >
      {/* 1. Highly visible Top-Right Close Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        type="button"
        aria-label="Close Lightbox"
        className="fixed top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-emerald-300 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 transition duration-200 z-[100000] flex items-center gap-2 text-xs font-bold tracking-wider uppercase shadow-2xl cursor-pointer"
      >
        <X className="w-5 h-5 text-white stroke-[2.5]" />
        <span>Close</span>
      </button>

      {/* Navigation - Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onIndexChange((currentIndex - 1 + images.length) % images.length);
          }}
          type="button"
          aria-label="Previous Photo"
          className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 text-white/90 hover:text-white p-3 sm:p-4 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/20 transition z-[100000] shadow-xl cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      )}

      {/* Image Preview Container (Stops propagation so clicking photo does not accidentally close) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center cursor-default"
      >
        <img
          src={images[currentIndex]}
          alt={`Visual ${currentIndex + 1}`}
          className="max-h-[75vh] sm:max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl ring-1 ring-white/10"
        />
        
        <div className="mt-4 flex flex-col items-center gap-1.5 text-center">
          <div className="text-xs font-semibold text-white/90 tracking-widest uppercase">
            Photo {currentIndex + 1} of {images.length}
          </div>
          <div className="text-[11px] text-white/50 tracking-wide">
            Click anywhere outside or press <span className="underline">Esc</span> to close
          </div>
        </div>
      </div>

      {/* Navigation - Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onIndexChange((currentIndex + 1) % images.length);
          }}
          type="button"
          aria-label="Next Photo"
          className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 text-white/90 hover:text-white p-3 sm:p-4 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/20 transition z-[100000] shadow-xl cursor-pointer"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      )}
    </div>
  );
}
