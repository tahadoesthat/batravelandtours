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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fade-in"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close Lightbox"
        className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition z-50"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation - Prev */}
      {images.length > 1 && (
        <button
          onClick={() => onIndexChange((currentIndex - 1 + images.length) % images.length)}
          aria-label="Previous Photo"
          className="absolute left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition z-50"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Image Preview Container */}
      <div className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center select-none">
        <img
          src={images[currentIndex]}
          alt={`Visual ${currentIndex + 1}`}
          className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl"
        />
        <div className="mt-4 text-xs font-medium text-white/70 tracking-widest uppercase">
          Photo {currentIndex + 1} of {images.length}
        </div>
      </div>

      {/* Navigation - Next */}
      {images.length > 1 && (
        <button
          onClick={() => onIndexChange((currentIndex + 1) % images.length)}
          aria-label="Next Photo"
          className="absolute right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition z-50"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
