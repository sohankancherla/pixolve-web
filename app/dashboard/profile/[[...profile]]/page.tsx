import React from 'react';

import { UserProfile } from '@clerk/nextjs';

export const metadata = {
  title: 'Profile',
};

export default function ProfilePage() {
  return (
    <UserProfile
      path="/dashboard/profile"
      appearance={{
        elements: {
          cardBox: {
            boxShadow: 'none',
            borderRadius: '0rem',
            minHeight: '100vh',
            minWidth: 'calc(100vw - 14rem)',
          },
        },
      }}
    />
  );
}
