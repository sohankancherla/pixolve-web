import React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import Email from '@/components/icons/email';

export default function EmailVerificationPage() {
  return (
    <Card className="mx-auto max-w-sm flex flex-col justify-center items-center p-2">
      <CardContent className="flex flex-col justify-center items-center text-center gap-4">
        <Email />
        <h1 className="text-xl font-bold">Check Your Inbox</h1>
        <p className="text-muted-foreground">
          Thank you for signing up &ndash; we&apos;re almost there! Please click
          the link in your email to finish setting up your account.
        </p>
        <p className="text-muted-foreground">You can close this window.</p>
      </CardContent>
    </Card>
  );
}
