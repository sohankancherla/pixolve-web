'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import createClient from '@/supabase/server';

export async function login(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const result = await supabase.auth.signInWithPassword(data);
  if (result.error) {
    throw new Error(result.error.message);
  } else {
    revalidatePath('/app', 'layout');
    redirect('/app');
  }
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        first_name: formData.get('firstName') as string,
        last_name: formData.get('lastName') as string,
      },
    },
  };

  const result = await supabase.auth.signUp(data);
  if (result.error) {
    throw new Error(result.error.message);
  } else {
    redirect('/auth/signup/verify-email');
  }
}
