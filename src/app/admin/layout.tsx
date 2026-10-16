import React from 'react';
import { prisma, getOrCreateAdminProfile } from '@/lib/prisma';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const revalidate = 0;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let unreadCount = 0;
  try {
    unreadCount = await prisma.query.count({
      where: { status: 'UNREAD' },
    });
  } catch (err) {
    console.error('Failed to count unread queries:', err);
  }

  const adminProfile = await getOrCreateAdminProfile();

  return (
    <div className="min-h-screen bg-brand-alabaster flex text-brand-charcoal">
      {/* 240px Fixed Left Navigation Sidebar */}
      <AdminSidebar
        initialUnreadCount={unreadCount}
        adminProfile={adminProfile}
      />

      {/* Main Administrative Viewport */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6 sm:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
