import React from 'react';

import SignOut from '@/components/app/profile/signout';

export const metadata = {
  title: 'Profile',
};

export default function ProfilePage() {
  return (
    <>
      <h1>Profile</h1>
      <SignOut />
    </>
  );
}
