'use client';

import React from 'react';

import { useTheme } from 'next-themes';

import { SignUp } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

import { lightTheme, darkTheme } from '@/lib/colors';

export default function SignUpPage() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="min-h-[552px]">
      <SignUp
      // appearance={{
      //   baseTheme: resolvedTheme === 'dark' ? dark : undefined,
      //   layout: {
      //     logoPlacement: 'none',
      //   },
      //   variables: {
      //     colorPrimary:
      //       resolvedTheme === 'dark' ? darkTheme.primary : lightTheme.primary,
      //     colorDanger:
      //       resolvedTheme === 'dark'
      //         ? darkTheme.destructive
      //         : lightTheme.destructive,
      //     colorText:
      //       resolvedTheme === 'dark'
      //         ? darkTheme.cardForeground
      //         : lightTheme.cardForeground,
      //     colorTextOnPrimaryBackground:
      //       resolvedTheme === 'dark'
      //         ? darkTheme.primaryForeground
      //         : lightTheme.primaryForeground,
      //     colorTextSecondary:
      //       resolvedTheme === 'dark'
      //         ? darkTheme.mutedForeground
      //         : lightTheme.mutedForeground,
      //     colorBackground:
      //       resolvedTheme === 'dark' ? darkTheme.card : lightTheme.card,
      //     fontSize: '14px',
      //     borderRadius: lightTheme.radius,
      //   },
      //   elements: {
      //     cardBox: `sm:shadow-none border border-${resolvedTheme === 'dark' ? 'dark' : 'light'}`,
      //     header: 'text-left text-xl tracking-tight',
      //   },
      // }}
      />
    </div>
  );
}
