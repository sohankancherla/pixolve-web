'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import { ArrowLongLeftIcon } from '@heroicons/react/24/outline';

export default function BackHome() {
  const pathname = usePathname();
  return (
    <a
      href={pathname.startsWith('/app') ? '/app' : '/'}
      className="flex items-center gap-1 group"
      aria-label="Back to home"
    >
      <ArrowLongLeftIcon
        className="h-6 w-6 group-hover:-translate-x-1 transition-transform duration-300 motion-reduce:translate-x-0"
        aria-hidden="true"
      />
      <span>Back to home</span>
    </a>
  );
}
