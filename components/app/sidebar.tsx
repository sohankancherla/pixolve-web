'use client';

import React, { SVGProps } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import { UserCircle, UserCircleFilled } from '../icons/user-circle';
import { Folder, FolderFilled } from '../icons/folder';
import { Sparkles, SparklesFilled } from '../icons/sparkles';
import { Square2Stack, Square2StackFilled } from '../icons/square-2-stack';

const navItemsTop = [
  {
    name: 'Enhance',
    href: '/dashboard/enhance',
    icon: Sparkles,
    filled: SparklesFilled,
  },
  {
    name: 'Merge',
    href: '/dashboard/merge',
    icon: Square2Stack,
    filled: Square2StackFilled,
  },
  {
    name: 'Organize',
    href: '/dashboard/organize',
    icon: Folder,
    filled: FolderFilled,
  },
];

const navItemsBottom = [
  {
    name: 'Profile',
    href: '/dashboard/profile',
    icon: UserCircle,
    filled: UserCircleFilled,
  },
];

export function MobileItem({
  href,
  icon: Icon,
  filled: Filled,
  children,
}: {
  href: string;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  filled: React.ComponentType<SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <li className="w-full">
      <Link
        href={href}
        role="menuitem"
        aria-current={pathname.includes(href) ? 'page' : undefined}
        aria-label={`Navigate to ${children}`}
        className="flex flex-col items-center group/link"
      >
        {!pathname.includes(href) ? (
          <Icon
            className="h-6 w-6 mx-1 stroke-muted-foreground"
            aria-hidden="true"
          />
        ) : (
          <Filled className="h-6 w-6 mx-1 text-primary" aria-hidden="true" />
        )}
        <span
          className={cn(
            'font-display text-xs text-muted-foreground leading-5 tracking-tight',
            pathname.includes(href) && 'text-primary',
          )}
        >
          {children}
        </span>
      </Link>
    </li>
  );
}

export function MobileNavbar() {
  return (
    <nav
      className="sm:hidden fixed bottom-0 w-full border-t border-gray-200 dark:border-gray-800 shadow-lg dark:shadow-black"
      aria-label="Main Navigation"
    >
      <ul className="cursor-pointer w-full flex py-2">
        {navItemsTop.map((item) => (
          <MobileItem
            key={item.name}
            href={item.href}
            icon={item.icon}
            filled={item.filled}
          >
            {item.name}
          </MobileItem>
        ))}
        {navItemsBottom.map((item) => (
          <MobileItem
            key={item.name}
            href={item.href}
            icon={item.icon}
            filled={item.filled}
          >
            {item.name}
          </MobileItem>
        ))}
      </ul>
    </nav>
  );
}

export function DesktopItem({
  href,
  icon: Icon,
  filled: Filled,
  children,
}: {
  href: string;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  filled: React.ComponentType<SVGProps<SVGSVGElement>>;
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
          'flex w-full items-center p-4 rounded-full group/link',
          pathname.includes(href) ? 'bg-accent' : 'hover:bg-accent/50',
        )}
      >
        {!pathname.includes(href) ? (
          <Icon
            className="h-6 w-6 mx-1 stroke-muted-foreground"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        ) : (
          <Filled
            className="h-6 w-6 mx-1 text-primary"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        )}
        <span
          className={cn(
            'font-display text-muted-foreground leading-5 tracking-tight ml-6 transistion-all duration-300 ease-in-out',
            pathname.includes(href)
              ? 'text-primary'
              : 'group-hover/link:translate-x-2 motion-reduce:group-hover/link:translate-x-0',
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
      className="hidden sm:flex flex-col min-h-screen min-w-56 px-2 py-6 border-r border-gray-200 dark:border-gray-800 shadow-lg dark:shadow-black"
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
            <DesktopItem
              key={item.name}
              href={item.href}
              icon={item.icon}
              filled={item.filled}
            >
              {item.name}
            </DesktopItem>
          ))}
        </ul>
        <ul className="cursor-pointer flex flex-col gap-2">
          {navItemsBottom.map((item) => (
            <DesktopItem
              key={item.name}
              href={item.href}
              icon={item.icon}
              filled={item.filled}
            >
              {item.name}
            </DesktopItem>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default function Sidebar() {
  return (
    <>
      <MobileNavbar />
      <DesktopNavbar />
    </>
  );
}
