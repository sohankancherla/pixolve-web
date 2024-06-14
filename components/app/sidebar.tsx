'use client';

import React, { useRef } from 'react';

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
  { name: 'Home', href: '/app', icon: 'home' },
  { name: 'Enhance', href: '/app/enhance', icon: 'wandSparkles' },
  { name: 'Deblur', href: '/app/deblur', icon: 'droplet' },
  { name: 'Merge', href: '/app/merge', icon: 'merge' },
  { name: 'Find', href: '/app/find', icon: 'squareDashedMousePointer' },
  { name: 'Group', href: '/app/group', icon: 'images' },
];

const navItemsBottom = [
  { name: 'Profile', href: '/app/profile', icon: 'userRound' },
];

export function SidebarItem({
  href,
  icon,
  sidebarRef = null,
  children,
}: {
  href: string;
  icon: string;
  sidebarRef: React.RefObject<HTMLDivElement> | null;
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
          'flex items-center w-full py-4 px-[9.5px] rounded-full lg:hover:bg-accent/50 group/link',
          pathname === href && 'sm:bg-accent',
        )}
        onClick={() => sidebarRef?.current?.classList.remove('lg:hover:w-52')}
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
            'hidden lg:block font-display text-muted-foreground leading-5 tracking-tight ml-6 group-hover/link:text-foreground group-hover/link:translate-x-2 transistion-all duration-300 ease-in-out motion-reduce:transition-none motion-reduce:translate-x-0',
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

export default function Sidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <nav
      ref={sidebarRef}
      className="flex small:block fixed bottom-0 right-0 left-0 sm:static sm:min-h-screen sm:w-16 lg:hover:w-52 lg:overflow-x-hidden px-2 py-2 sm:py-6 border-t sm:border-r border-gray-200 dark:border-gray-800 shadow-lg dark:shadow-black transition-all duration-500 ease-in-out motion-reduce:transition-none group/nav"
      aria-label="Main Navigation"
      onMouseLeave={() => sidebarRef.current?.classList.add('lg:hover:w-52')}
    >
      <section className="flex flex-col h-full w-full">
        <Link
          href="/app"
          className="hidden sm:block my-8"
          aria-label="Pixolve Home"
        >
          <Image
            src="/icon-purple.png"
            alt="Pixolve"
            width="28"
            height="28"
            className="mx-[9.5px]"
          />
        </Link>
        <div className="flex sm:flex-col h-full w-full sm:justify-between gap-2 justify-center">
          <ul className="cursor-pointer flex justify-around sm:flex-col gap-2">
            {navItemsTop.map((item) => (
              <SidebarItem
                key={item.name}
                href={item.href}
                icon={item.icon}
                sidebarRef={sidebarRef}
              >
                {item.name}
              </SidebarItem>
            ))}
          </ul>
          <ul className="cursor-pointer flex justify-around sm:flex-col gap-2">
            {navItemsBottom.map((item) => (
              <SidebarItem
                key={item.name}
                href={item.href}
                icon={item.icon}
                sidebarRef={sidebarRef}
              >
                {item.name}
              </SidebarItem>
            ))}
          </ul>
        </div>
      </section>
    </nav>
  );
}
