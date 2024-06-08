'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Droplet,
  Home,
  Images,
  Merge,
  SquareDashedMousePointer,
  WandSparkles,
} from 'lucide-react';

import { cn } from '@/lib/utils';

const icons = {
  droplet: Droplet,
  home: Home,
  images: Images,
  merge: Merge,
  squareDashedMousePointer: SquareDashedMousePointer,
  wandSparkles: WandSparkles,
};

export default function SidebarItem({
  href,
  icon,
  children,
}: {
  href: string;
  icon: string;
  children: React.ReactNode;
}) {
  const Icon = icons[icon as keyof typeof icons];
  const pathname = usePathname();
  return (
    <li role="none">
      <Link
        href={href}
        role="menuitem"
        aria-current={pathname === href ? 'page' : undefined}
        aria-label={`Navigate to ${children}`}
        className={cn(
          'flex items-center w-full py-4 px-[9.5px] rounded-full lg:hover:bg-accent/50 group/link',
          pathname === href && 'sm:bg-accent',
        )}
      >
        <Icon
          strokeWidth={1.75}
          className={cn(
            'h-6 w-6 sm:h-5 sm:w-5 mx-1 flex-shrink-0 stroke-muted-foreground lg:group-hover/link:stroke-foreground',
            pathname === href && 'stroke-violet-500',
          )}
          aria-hidden="true"
        />
        <span
          className={cn(
            'hidden lg:block font-display text-lg text-muted-foreground leading-5 tracking-tight ml-6 group-hover/link:text-foreground group-hover/link:translate-x-2 transistion-all duration-300 ease-in-out motion-reduce:transition-none motion-reduce:translate-x-0',
            pathname === href &&
              'text-transparent bg-clip-text bg-gradient-to-br from-violet-500 to-pink-400',
          )}
        >
          {children}
        </span>
      </Link>
    </li>
  );
}
