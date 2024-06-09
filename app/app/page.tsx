import React from 'react';

import authCheck from '@/supabase/auth-check';

export const metadata = {
  title: 'Home',
};

export default async function Home() {
  await authCheck();
  return <h1>Home</h1>;
}
