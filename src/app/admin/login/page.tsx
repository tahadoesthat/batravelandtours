'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      router.push(from);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-alabaster flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="bg-white rounded-2xl border border-brand-stone p-3 inline-flex items-center justify-center shadow-sm mb-3">
            <Image
              src="/images/logo.svg"
              alt="BA Travel & Tours"
              width={180}
              height={58}
              className="h-12 w-auto object-contain"
              priority
            />
          </div>
          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-emerald">
            Admin Workspace Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl border border-brand-stone p-8 shadow-elevated">
          <div className="mb-6">
            <h2 className="font-serif text-xl font-bold text-brand-charcoal">
              Administrator Sign In
            </h2>
            <p className="text-xs text-brand-slate mt-1">
              Enter your authorized credentials to access the editorial suite.
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs mb-5">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-brand-charcoal mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-brand-slate absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bilawalabdullah.com"
                  className="w-full text-sm pl-10 pr-4 py-2.5 rounded-[10px] border border-brand-stone focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald text-brand-charcoal bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-charcoal mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-brand-slate absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full text-sm pl-10 pr-4 py-2.5 rounded-[10px] border border-brand-stone focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald text-brand-charcoal bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-brand-emerald hover:bg-brand-pine text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-full shadow transition disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Session...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-brand-stone text-center">
            <a
              href="/"
              className="text-xs text-brand-slate hover:text-brand-emerald transition"
            >
              ← Return to Public Blog
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
