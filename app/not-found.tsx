import React from 'react';

import BackHome from '@/components/messages/back-home';

export const metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center py-32 px-8 bg-gradient-to-bl from-[#ffffff] to-[#f3f4f6] dark:from-[#1f1f1f] dark:to-[#121317]">
      <section className="text-center font-display font-medium">
        <h2 className="text-3xl font-semibold tracking-tight">404</h2>
        <h1 className="font-display font-normal text-6xl sm:text-7xl lg:text-8xl tracking-tight leading-[1.3] sm:leading-[1.4] lg:leading-[1.5] text-transparent bg-clip-text bg-gradient-to-br from-violet-500 to-pink-400">
          Page not found
        </h1>
        <div className="mt-12 flex justify-center">
          <BackHome />
        </div>
      </section>
    </main>
  );
}
