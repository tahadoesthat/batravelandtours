'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Compass,
  Inbox,
  User,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import LogoutModal from './LogoutModal';

interface AdminSidebarProps {
  initialUnreadCount?: number;
  adminProfile: {
    name: string;
    avatarUrl: string;
  };
}

export default function AdminSidebar({
  initialUnreadCount = 0,
  adminProfile,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Poll unread queries count every 30 seconds
  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await fetch('/api/queries?status=UNREAD');
        const data = await res.json();
        if (data.success && typeof data.unreadCount === 'number') {
          setUnreadCount(data.unreadCount);
        }
      } catch {
        // ignore
      }
    };

    fetchUnread();
    const interval = setInterval(fetchUnread, 30000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    {
      name: 'Home',
      href: '/admin',
      icon: LayoutDashboard,
      active: pathname === '/admin',
    },
    {
      name: 'Travel Plans',
      href: '/admin/plans',
      icon: Compass,
      active: pathname.startsWith('/admin/plans'),
    },
    {
      name: 'Queries',
      href: '/admin/queries',
      icon: Inbox,
      active: pathname.startsWith('/admin/queries'),
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    {
      name: 'Profile',
      href: '/admin/profile',
      icon: User,
      active: pathname.startsWith('/admin/profile'),
    },
  ];

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLogoutLoading(false);
      setLogoutOpen(false);
    }
  };

  return (
    <>
      <aside className="w-60 bg-white border-r border-brand-stone h-screen sticky top-0 flex flex-col justify-between select-none z-30">
        {/* Top Header */}
        <div>
          <div className="p-5 border-b border-brand-stone">
            <Link href="/" className="group block">
              <div className="flex items-center justify-between mb-2">
                <Image
                  src="/images/logo.svg"
                  alt="BA Travel & Tours"
                  width={140}
                  height={44}
                  className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
                  priority
                />
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] tracking-wider uppercase font-semibold text-brand-slate">
                  Admin Workspace
                </span>
                <span className="text-[9px] bg-brand-alabaster border border-brand-stone text-brand-emerald px-1.5 py-0.5 rounded-full font-bold">
                  PRO
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5" aria-label="Admin Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition ${
                    item.active
                      ? 'bg-brand-emerald text-white shadow-sm'
                      : 'text-brand-charcoal hover:bg-brand-alabaster hover:text-brand-emerald'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 stroke-[1.6]" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.active
                          ? 'bg-white text-brand-emerald'
                          : 'bg-brand-emerald text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Quick Live Site Link */}
            <Link
              href="/"
              target="_blank"
              className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-brand-slate hover:bg-brand-alabaster hover:text-brand-charcoal transition mt-4"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Public Blog</span>
            </Link>
          </nav>
        </div>

        {/* Footer: User Dossier & Sign Out */}
        <div className="p-4 border-t border-brand-stone bg-brand-alabaster/40">
          <div className="flex items-center justify-between">
            <Link
              href="/admin/profile"
              className="flex items-center space-x-2.5 min-w-0 group"
            >
              <img
                src={adminProfile.avatarUrl}
                alt={adminProfile.name}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-brand-stone"
              />
              <div className="min-w-0">
                <span className="block text-xs font-bold text-brand-charcoal truncate group-hover:text-brand-emerald transition">
                  {adminProfile.name}
                </span>
                <span className="block text-[10px] text-brand-slate truncate">
                  Administrator
                </span>
              </div>
            </Link>

            <button
              onClick={() => setLogoutOpen(true)}
              title="Sign Out"
              aria-label="Sign Out"
              className="p-2 rounded-lg text-brand-slate hover:text-brand-crimson hover:bg-red-50 transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Logout Confirmation Dialog */}
      <LogoutModal
        isOpen={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={handleLogout}
        loading={logoutLoading}
      />
    </>
  );
}
