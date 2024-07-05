import React from 'react';

import Image from 'next/image';

import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs';

import Spinner from '@/components/icons/spinner';

export const metadata = {
  title: 'Login',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex items-center justify-center p-0 min-h-dvh h-full overflow-y-auto bg-gradient-to-bl from-[#ffffff] to-[#f3f4f6] dark:from-[#1f1f1f] dark:to-[#121317]">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[200px] h-[200px] bg-gradient-to-r from-purple-400 to-blue-500 opacity-30 rounded-full filter blur-xl" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-gradient-to-r from-pink-400 to-red-500 opacity-30 rounded-full filter blur-2xl" />
        <div className="absolute top-1/4 right-0 w-[150px] h-[150px] bg-gradient-to-r from-yellow-400 to-orange-500 opacity-30 rounded-full filter blur-lg" />
      </div>
      <div className="w-full max-w-5xl lg:flex p-10 z-10">
        <ClerkLoading>
          <div className="h-full w-full flex items-center justify-center">
            <Spinner className="size-10 stroke-primary animate-spin " />
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          <section className="flex flex-col justify-start items-center flex-1">
            <Image
              src="/logo-purple.png"
              alt="Pixolve"
              width="150"
              height="27"
              className="flex-shrink-0 mb-12"
            />
            {children}
          </section>
        </ClerkLoaded>
      </div>
    </main>
  );
}
