'use client';

import React, { SVGProps } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  FolderIcon,
  SparklesIcon,
  Square2StackIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

import { cn } from '@/lib/utils';

const navItemsTop = [
  { name: 'Enhance', href: '/app/enhance', icon: SparklesIcon },
  { name: 'Merge', href: '/app/merge', icon: Square2StackIcon },
  { name: 'Organize', href: '/app/find', icon: FolderIcon },
];

const navItemsBottom = [
  { name: 'Profile', href: '/app/profile', icon: UserCircleIcon },
];

export function DesktopItem({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={href}
        role="menuitem"
        aria-current={pathname === href ? 'page' : undefined}
        aria-label={`Navigate to ${children}`}
        className={cn(
          'flex w-full p-4 rounded-full group/link',
          pathname === href ? 'bg-accent' : 'hover:bg-accent/50',
        )}
      >
        <Icon
          className={cn(
            'h-6 w-6 mx-1 stroke-muted-foreground',
            pathname === href &&
              'stroke-violet-500 lg:group-hover/link:stroke-violet-500',
          )}
          strokeWidth={1.75}
          aria-hidden="true"
        />
        <span
          className={cn(
            'font-display text-sm sm:text-base text-muted-foreground leading-5 tracking-tight mt-2 sm:mt-0 sm:ml-6 lg:group-hover/link:translate-x-2 lg:transistion-all duration-300 ease-in-out motion-reduce:transition-none motion-reduce:translate-x-0 motion-reduce:lg:group-hover/link:translate-x-0',
            pathname === href &&
              'text-violet-500 sm:text-transparent sm:bg-clip-text sm:bg-gradient-to-br from-violet-500 to-pink-400 lg:group-hover/link:translate-x-0',
          )}
        >
          {children}
        </span>
      </Link>
    </li>
  );
}

export function DesktopNavbar() {
  return (
    <nav
      className="hidden sm:flex flex-col min-h-screen w-56 px-2 py-6 border-r border-gray-200 dark:border-gray-800 shadow-lg dark:shadow-black"
      aria-label="Main Navigation"
    >
      <Link href="/app" className="py-4 my-4" aria-label="Pixolve Home">
        <Image
          src="/logo-purple.png"
          alt="Pixolve"
          width="120"
          height="22"
          className="mx-4"
        />
      </Link>
      <div className="flex flex-col h-full w-full justify-between py-2">
        <ul className="cursor-pointer flex flex-col gap-2">
          {navItemsTop.map((item) => (
            <DesktopItem key={item.name} href={item.href} icon={item.icon}>
              {item.name}
            </DesktopItem>
          ))}
        </ul>
        <ul className="cursor-pointer flex flex-col gap-2">
          {navItemsBottom.map((item) => (
            <DesktopItem key={item.name} href={item.href} icon={item.icon}>
              {item.name}
            </DesktopItem>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default function Sidebar() {
  return <DesktopNavbar />;
}
