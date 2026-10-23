'use client';

import React, { useRef, useState } from 'react';
import { UploadCloud, Star, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';

interface MultiImageUploaderProps {
  images: string[];
  primeThumbnail: string;
  onImagesChange: (images: string[]) => void;
  onPrimeChange: (url: string) => void;
}

async function compressImage(file: File, maxDim = 1920, quality = 0.82): Promise<File> {
  // If file is already small (under 300KB), return as is
  if (file.size <= 300 * 1024) return file;

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file);
              return;
            }
            const compressedFile = new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = () => resolve(file);
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}

export default function MultiImageUploader({
  images,
  primeThumbnail,
  onImagesChange,
  onPrimeChange,
}: MultiImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUploadFiles = async (files: FileList | File[]) => {
    setError(null);
    const availableSlots = 10 - images.length;

    if (availableSlots <= 0) {
      setError('Maximum 10 images reached. Remove an image to upload more.');
      return;
    }

    const filesToUpload = Array.from(files).slice(0, availableSlots);
    setUploading(true);

    try {
      const uploadedUrls: string[] = [];

      for (const rawFile of filesToUpload) {
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(rawFile.type)) {
          throw new Error(`File "${rawFile.name}" is not a valid format (JPG, PNG, or WebP).`);
        }
        if (rawFile.size > 20 * 1024 * 1024) {
          throw new Error(`File "${rawFile.name}" exceeds the 20MB limit.`);
        }

        // Compress large camera photos on client to prevent payload timeout & Vercel 4.5MB limit
        const file = await compressImage(rawFile);

        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        // Safely parse JSON response to prevent "Unexpected token < in JSON"
        const text = await res.text();
        let data: any = {};
        try {
          data = text ? JSON.parse(text) : {};
        } catch {
          throw new Error(
            `Upload error (${res.status}): Server returned a non-JSON response for "${rawFile.name}". Please ensure image is under 4.5MB.`
          );
        }

        if (!res.ok) {
          throw new Error(data.error || `Upload failed with status ${res.status}`);
        }

        if (!data.url) {
          throw new Error('Upload succeeded but no image URL was returned.');
        }

        uploadedUrls.push(data.url);
      }

      const updated = [...images, ...uploadedUrls];
      onImagesChange(updated);

      // If no prime thumbnail is selected, set the first uploaded one
      if (!primeThumbnail && updated.length > 0) {
        onPrimeChange(updated[0]);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to upload image files.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = (urlToRemove: string) => {
    const updated = images.filter((img) => img !== urlToRemove);
    onImagesChange(updated);
    if (primeThumbnail === urlToRemove) {
      onPrimeChange(updated[0] || '');
    }
  };

  return (
    <div className="space-y-4">
      {/* Dropzone Container */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files) {
            handleUploadFiles(e.dataTransfer.files);
          }
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
          dragActive
            ? 'border-brand-emerald bg-emerald-50/50'
            : 'border-brand-stone hover:border-brand-emerald/60 hover:bg-brand-alabaster/60'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) handleUploadFiles(e.target.files);
          }}
        />

        <div className="flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-brand-alabaster border border-brand-stone flex items-center justify-center text-brand-emerald mb-3">
            {uploading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <UploadCloud className="w-6 h-6 stroke-[1.5]" />
            )}
          </div>
          <p className="text-xs sm:text-sm font-semibold text-brand-charcoal mb-1">
            Drag and drop destination photos or <span className="text-brand-emerald underline">click to browse</span>
          </p>
          <p className="text-[11px] text-brand-slate font-light">
            Upload up to 10 high-resolution images (JPG, PNG, WebP • Max 10MB each)
          </p>

          <div className="mt-3">
            <span className="inline-block bg-brand-alabaster border border-brand-stone text-brand-emerald text-[11px] font-bold px-3 py-1 rounded-full">
              {images.length} / 10 Images Uploaded
            </span>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-xs text-brand-crimson font-medium">{error}</p>
      )}

      {/* Uploaded Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {images.map((imgUrl, idx) => {
            const isPrime = primeThumbnail === imgUrl;
            return (
              <div
                key={idx}
                className={`group relative rounded-xl overflow-hidden border aspect-[4/3] bg-brand-stone/30 shadow-xs transition ${
                  isPrime ? 'ring-2 ring-brand-emerald border-brand-emerald' : 'border-brand-stone'
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`Destination visual ${idx + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Prime Cover Badge */}
                {isPrime && (
                  <div className="absolute top-2 left-2 bg-brand-emerald text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                    <Star className="w-3 h-3 fill-current" />
                    <span>Prime Cover</span>
                  </div>
                )}

                {/* Hover Controls */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-200 flex items-center justify-center gap-2 p-2">
                  {!isPrime && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPrimeChange(imgUrl);
                      }}
                      title="Set as Prime Cover"
                      className="p-1.5 rounded-lg bg-white/90 text-brand-charcoal hover:bg-brand-emerald hover:text-white transition text-[11px]"
                    >
                      <Star className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(imgUrl);
                    }}
                    title="Remove Photo"
                    className="p-1.5 rounded-lg bg-white/90 text-brand-crimson hover:bg-brand-crimson hover:text-white transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
