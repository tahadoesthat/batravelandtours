'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Camera, Check, Loader2, AlertCircle } from 'lucide-react';

export default function AdminProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load singleton profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/profile');
        const data = await res.json();
        if (data.success && data.profile) {
          setName(data.profile.name || 'Bilawal Abdullah');
          setPhone(data.profile.phone || '+1 (555) 019-2834');
          setDescription(data.profile.description || '');
          setAvatarUrl(data.profile.avatarUrl || '/images/default-avatar.png');
        }
      } catch (err) {
        console.error('Failed to load admin profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleAvatarFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Avatar upload failed');

      setAvatarUrl(data.url);
    } catch (err: any) {
      setError(err.message || 'Failed to upload photo.');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          description,
          avatarUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update profile');

      setToastMessage('Profile updated successfully.');
      setTimeout(() => setToastMessage(null), 4000);
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-brand-emerald text-white text-xs font-semibold px-5 py-3 rounded-full shadow-elevated flex items-center gap-2 border border-emerald-600 animate-slide-left">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="text-center pb-4 border-b border-brand-stone">
        <span className="text-[11px] font-bold text-brand-emerald tracking-[0.2em] uppercase">
          Identity & Atelier Settings
        </span>
        <h1 className="font-serif text-3xl font-bold text-brand-charcoal mt-0.5">
          Profile Settings
        </h1>
        <p className="text-xs text-brand-slate mt-1">
          Manage your author identity, contact phone, and public bio across Bilawal Abdullah Travels.
        </p>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-brand-emerald animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-brand-stone p-8 sm:p-10 shadow-subtle">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs mb-6">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-7">
            {/* 110px Circular Avatar Section */}
            <div className="flex flex-col items-center justify-center select-none">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="group relative w-28 h-28 rounded-full overflow-hidden border-2 border-brand-stone ring-4 ring-brand-alabaster cursor-pointer shadow-sm hover:border-brand-emerald transition"
              >
                <img
                  src={avatarUrl}
                  alt={name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-200 flex flex-col items-center justify-center text-white">
                  {uploadingAvatar ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <Camera className="w-6 h-6 mb-1" />
                      <span className="text-[10px] font-bold tracking-wider uppercase">
                        Change
                      </span>
                    </>
                  )}
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleAvatarFile}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingAvatar}
                className="mt-3 text-xs font-semibold text-brand-emerald hover:text-brand-pine transition"
              >
                {uploadingAvatar ? 'Uploading Image...' : 'Change Photo'}
              </button>
            </div>

            {/* Field 1: Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1.5">
                Full Name <span className="text-brand-crimson">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Bilawal Abdullah"
                className="w-full text-sm px-4 py-3 rounded-[10px] border border-brand-stone focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald bg-white text-brand-charcoal"
              />
            </div>

            {/* Field 2: Phone Number */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal">
                  Phone Number (WhatsApp Direct) <span className="text-brand-crimson">*</span>
                </label>
                <span className="text-[11px] text-brand-slate">
                  Powers the live WhatsApp CTA
                </span>
              </div>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 019-2834"
                className="w-full text-sm px-4 py-3 rounded-[10px] border border-brand-stone focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald bg-white text-brand-charcoal"
              />
            </div>

            {/* Field 3: Description / Bio */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal">
                  Description / Bio (Strictly 300 Characters)
                </label>
                <span
                  className={`text-[11px] font-semibold ${
                    description.length > 280 ? 'text-brand-amber' : 'text-brand-slate'
                  }`}
                >
                  {description.length} / 300
                </span>
              </div>
              <textarea
                rows={4}
                maxLength={300}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Travel photographer, storyteller, and explorer sharing honest advice and bespoke itineraries..."
                className="w-full text-sm p-4 rounded-[10px] border border-brand-stone focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald bg-white text-brand-charcoal resize-none leading-relaxed"
              />
            </div>

            {/* Primary Action */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-emerald hover:bg-brand-pine text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-full shadow transition disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Profile...</span>
                  </>
                ) : (
                  <span>Save Profile</span>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
