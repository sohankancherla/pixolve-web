'use client';

import React from 'react';

import Link from 'next/link';
import { useTheme } from 'next-themes';

import { UserProfile } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

import { GearFilled } from '@/components/icons/gear';
import ModeToggle from '@/components/mode-toggle';

import { lightTheme, darkTheme } from '@/lib/colors';

export default function ProfilePage() {
  const { resolvedTheme } = useTheme();

  return (
    <UserProfile
      path="/dashboard/settings"
      routing="path"
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
          rootBox: 'h-full w-full',
          cardBox: 'h-full min-w-full sm:w-full shadow-none rounded-none',
          navbar: 'sm:pt-12 sm:pb-12 sm:pl-4 sm:pr-3',
          header: 'sm:mt-7',
        },
      }}
    >
      <UserProfile.Page
        label="Settings"
        labelIcon={<GearFilled />}
        url="/settings"
      >
        <h1 className="clerk-h1 sm:mt-7 ">Settings</h1>
        <div className="clerk-section">
          <p className="clerk-section-title">Appearance</p>
          <div className="clerk-section-content">
            <ModeToggle />
          </div>
        </div>
        <div className="clerk-section">
          <p className="clerk-section-title">Support</p>
          <div className="clerk-section-content">
            <Link href="mailto:support@pixolve.app" className="clerk-button">
              Contact support
            </Link>
          </div>
        </div>
      </UserProfile.Page>
    </UserProfile>
  );
}
