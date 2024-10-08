import React from 'react';

import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs';

import Sidebar from '@/components/dashboard/sidebar';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SignedIn>
        <div className="flex flex-col-reverse sm:flex-row h-dvh w-full">
          <Sidebar />
          <main className="h-screen w-full overflow-auto p-6 sm:p-10">
            {children}
          </main>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
