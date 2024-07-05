'use client';

import React from 'react';

import { SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

import { lightTheme, darkTheme } from '@/lib/colors';

export default function SignInPage() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="min-h-[470px]">
      <SignIn
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
            cardBox: `border border-${resolvedTheme === 'dark' ? 'dark' : 'light'}`,
            header: 'text-left text-xl tracking-tight',
          },
        }}
      />
    </div>
  );
}
