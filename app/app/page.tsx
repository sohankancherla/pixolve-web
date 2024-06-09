import React from 'react';

import { redirect } from 'next/navigation';

import createClient from '@/supabase/server';

export const metadata = {
  title: 'Home',
};

export default async function Home() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/auth/signup');
  }
  console.log(data);

  return <h1>Home</h1>;
}
