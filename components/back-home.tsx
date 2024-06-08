'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import { MoveLeft } from 'lucide-react';

export default function BackHome() {
  const pathname = usePathname();
  return (
    <a
      href={pathname.startsWith('/app') ? '/app' : '/'}
      className="flex items-center gap-1 group"
      aria-label="Back to home"
    >
      <MoveLeft
        size={16}
        className="group-hover:-translate-x-1 transition-transform duration-300 motion-reduce:translate-x-0"
        aria-hidden="true"
      />
      <span>Back to home</span>
    </a>
  );
}
