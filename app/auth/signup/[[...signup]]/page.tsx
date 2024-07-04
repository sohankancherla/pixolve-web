'use client';

import React from 'react';

import { SignUp } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

import { lightTheme, darkTheme } from '@/lib/colors';

export default function SignUpPage() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="min-h-[552px]">
      <SignUp
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
              border: `1px solid ${resolvedTheme === 'dark' ? darkTheme.border : lightTheme.border}`,
            },
            header: {
              textAlign: 'left',
              fontSize: '1.25rem',
            },
          },
        }}
      />
    </div>
  );
}
