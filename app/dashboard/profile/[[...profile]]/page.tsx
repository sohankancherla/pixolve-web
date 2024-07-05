'use client';

import React from 'react';

import { useTheme } from 'next-themes';

import { UserProfile } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

import { lightTheme, darkTheme } from '@/lib/colors';

export default function ProfilePage() {
  const { resolvedTheme } = useTheme();

  return (
    <UserProfile
      path="/dashboard/profile"
      appearance={{
        baseTheme: resolvedTheme === 'dark' ? dark : undefined,
        variables: {
          colorPrimary:
            resolvedTheme === 'dark' ? darkTheme.primary : lightTheme.primary,
          colorDanger:
            resolvedTheme === 'dark'
              ? darkTheme.destructive
              : lightTheme.destructive,
          colorText:
            resolvedTheme === 'dark'
              ? darkTheme.cardForeground
              : lightTheme.cardForeground,
          colorTextOnPrimaryBackground:
            resolvedTheme === 'dark'
              ? darkTheme.primaryForeground
              : lightTheme.primaryForeground,
          colorTextSecondary:
            resolvedTheme === 'dark'
              ? darkTheme.mutedForeground
              : lightTheme.mutedForeground,
          colorBackground:
            resolvedTheme === 'dark' ? darkTheme.card : lightTheme.card,
          fontSize: '14px',
          borderRadius: lightTheme.radius,
        },
        elements: {
          rootBox: 'h-[calc(100%-61px)] sm:h-full w-full',
          cardBox: 'h-full min-w-full shadow-none rounded-none',
          navbar: 'pt-12 pb-4 pl-4 pr-3',
          header: 'mt-7 text-xl tracking-tight',
        },
      }}
    />
  );
}
