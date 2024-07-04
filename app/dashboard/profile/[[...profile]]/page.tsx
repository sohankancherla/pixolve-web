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
        layout: {
          logoPlacement: 'none',
        },
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
          cardBox: {
            boxShadow: 'none',
            borderRadius: '0rem',
            minHeight: '100vh',
            minWidth: 'calc(100vw - 14rem)',
          },
          navbar: {
            padding: '48px 20px 16px 12px',
          },
          header: {
            marginTop: '24px',
            fontSize: '1.25rem',
            letterSpacing: '-0.025em',
          },
        },
      }}
    />
  );
}
