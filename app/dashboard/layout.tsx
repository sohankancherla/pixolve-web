import React from 'react';

import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs';

import Sidebar from '@/components/app/sidebar';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SignedIn>
        <div className="sm:flex h-full w-full">
          <Sidebar />
          <main className="w-full">{children}</main>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
