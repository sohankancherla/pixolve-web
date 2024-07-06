import React from 'react';

import { UserButton } from '@clerk/nextjs';

export const metadata = {
  title: 'Organize',
};

export default function OrganizePage() {
  return (
    <div className="w-full flex justify-between items-center p-4">
      <h1 className="text-4xl font-medium">Organize</h1>
      <UserButton
        userProfileMode="navigation"
        userProfileUrl="/dashboard/settings"
      />
    </div>
  );
}
