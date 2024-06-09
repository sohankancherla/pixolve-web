'use server';

import { redirect } from 'next/navigation';

import createClient from '@/supabase/server';

export default async function authCheck() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/auth/signup');
  }
}
