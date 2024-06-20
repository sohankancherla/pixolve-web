'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Droplet,
  Home,
  Images,
  Merge,
  SquareDashedMousePointer,
  UserRound,
  WandSparkles,
} from 'lucide-react';

import { cn } from '@/lib/utils';

const icons = {
  droplet: Droplet,
  home: Home,
  images: Images,
  merge: Merge,
  squareDashedMousePointer: SquareDashedMousePointer,
  userRound: UserRound,
  wandSparkles: WandSparkles,
};

const navItemsTop = [
  // { name: 'Home', href: '/app', icon: 'home' },
  { name: 'Enhance', href: '/app/enhance', icon: 'wandSparkles' },
  // { name: 'Deblur', href: '/app/deblur', icon: 'droplet' },
  { name: 'Merge', href: '/app/merge', icon: 'merge' },
  { name: 'Find', href: '/app/find', icon: 'squareDashedMousePointer' },
  // { name: 'Group', href: '/app/group', icon: 'images' },
];

const navItemsBottom = [
  { name: 'Profile', href: '/app/profile', icon: 'userRound' },
];

export function SidebarItem({
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
    <li>
      <Link
        href={href}
        role="button"
        aria-current={pathname === href ? 'page' : undefined}
        aria-label={`Navigate to ${children}`}
        className={cn(
          'flex flex-col sm:flex-row items-center w-[83px]  sm:w-full p-2 sm:py-4 sm:px-3 rounded-full lg:hover:bg-accent/50 group/link',
          pathname === href && 'sm:bg-accent',
        )}
      >
        <Icon
          className={cn(
            'h-6 w-6 sm:h-5 sm:w-5 mx-1 flex-shrink-0 stroke-muted-foreground lg:group-hover/link:stroke-foreground',
            pathname === href &&
              'stroke-violet-500 lg:group-hover/link:stroke-violet-500',
          )}
          aria-hidden="true"
        />
        <span
          className={cn(
            'font-display text-muted-foreground leading-5 tracking-tight mt-2 sm:mt-0 sm:ml-6 lg:group-hover/link:text-foreground lg:group-hover/link:translate-x-2 lg:transistion-all duration-300 ease-in-out motion-reduce:transition-none motion-reduce:translate-x-0',
            pathname === href &&
              'text-violet-500 sm:text-transparent sm:bg-clip-text sm:bg-gradient-to-br from-violet-500 to-pink-400 lg:group-hover/link:text-transparent',
          )}
        >
          {children}
        </span>
      </Link>
    </li>
  );
}

export default function Sidebar() {
  return (
    <nav
      className="flex small:block fixed bottom-0 right-0 left-0 sm:static sm:min-h-screen sm:w-56 px-2 py-2 sm:py-6 border-t sm:border-r border-gray-200 dark:border-gray-800 shadow-lg dark:shadow-black group/nav"
      aria-label="Main Navigation"
    >
      <section className="flex flex-col h-full w-full">
        <Link
          href="/app"
          className="hidden sm:block my-8"
          aria-label="Pixolve Home"
        >
          <Image
            src="/logo-purple.png"
            alt="Pixolve"
            width="120"
            height="22"
            className="mx-4"
          />
        </Link>
        <div className="flex sm:flex-col h-full w-full sm:justify-between sm:py-2">
          <ul
            className={cn(
              'cursor-pointer flex justify-around sm:flex-col sm:gap-2 sm:flex-none',
              `flex-[${navItemsTop.length}]`,
            )}
          >
            {navItemsTop.map((item) => (
              <SidebarItem key={item.name} href={item.href} icon={item.icon}>
                {item.name}
              </SidebarItem>
            ))}
          </ul>
          <ul
            className={cn(
              'cursor-pointer flex justify-around sm:flex-col sm:gap-2 flex-1 sm:flex-none',
              `flex-[${navItemsBottom.length}]`,
            )}
          >
            {navItemsBottom.map((item) => (
              <SidebarItem key={item.name} href={item.href} icon={item.icon}>
                {item.name}
              </SidebarItem>
            ))}
          </ul>
        </div>
      </section>
    </nav>
  );
}
