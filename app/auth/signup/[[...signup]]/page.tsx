'use client';

import React from 'react';

import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-[552px]">
      <SignUp />
    </div>
  );
}
