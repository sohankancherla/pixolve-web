import React from 'react';

import Link from 'next/link';

import { EnvelopeIcon } from '@heroicons/react/24/outline';

import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import CopyButton from '@/components/dashboard/settings/copy-button';
import ModeToggle from '@/components/ui/mode-toggle';
import UserButton from '@/components/dashboard/settings/user-button';

export const metadata = {
  title: 'Settings',
};

export default function SettingsPage() {
  return (
    <>
      <div className="w-full flex justify-between items-center mb-12">
        <h1 className="text-4xl font-medium">Settings</h1>
        <UserButton />
      </div>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-medium">Theme</CardTitle>
            <CardDescription>
              Select the theme you want to use for your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ModeToggle />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-medium">Contact Support</CardTitle>
            <CardDescription>
              Need help? Contact our support team.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-5">
            <CopyButton />
            <Link
              href="mailto:support@pixolve.app"
              className={buttonVariants({ variant: 'default' })}
            >
              <EnvelopeIcon className="mr-2 h-4 w-4" />
              Open
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
