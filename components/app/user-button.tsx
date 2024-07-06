'use client';

import React from 'react';

import { useTheme } from 'next-themes';

import { UserButton as UserButtonClerk } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

import { lightTheme, darkTheme } from '@/lib/colors';

export default function UserButton() {
  const { resolvedTheme } = useTheme();

  return (
    <UserButtonClerk
      userProfileMode="navigation"
      userProfileUrl="/dashboard/settings"
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
      }}
    />
  );
}
