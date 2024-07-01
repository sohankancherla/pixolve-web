import React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import Email from '@/components/icons/email';

export default function EmailVerificationPage() {
  return (
    <Card className="mx-auto max-w-sm flex flex-col justify-center items-center p-2">
      <CardContent className="flex flex-col justify-center gap-4">
        <Email className="h-52 w-52 mx-auto" />
        <h1 className="text-xl font-semibold tracking-tight">
          Please check your inbox
        </h1>
        <p className="text-muted-foreground leading-6">
          Thank you for signing up &ndash; we&apos;re almost there! Please click
          the link in your email to finish setting up your account.
        </p>
        <p className="text-muted-foreground">You can close this window.</p>
      </CardContent>
    </Card>
  );
}
