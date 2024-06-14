'use client';

import React from 'react';

import createClient from '@/supabase/client';

import { Button } from '@/components/ui/button';

async function handleSignOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
}

export default function SignOut() {
  return <Button onClick={handleSignOut}>Signout</Button>;
}
