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
        <div className="flex flex-col-reverse sm:flex-row h-dvh w-full">
          <Sidebar />
          <main className="h-full w-full overflow-auto">{children}</main>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
