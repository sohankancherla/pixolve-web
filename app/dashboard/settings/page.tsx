import React from 'react';

import UserButton from '@/components/dashboard/user-button';

export const metadata = {
  title: 'Settings',
};

export default function SettingsPage() {
  return (
    <div className="w-full flex justify-between items-center p-4">
      <h1 className="text-4xl font-medium">Settings</h1>
      <UserButton />
    </div>
  );
}
