'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import createClient from '@/supabase/server';

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        full_name: `${formData.get('firstName')} ${formData.get('lastName')}`,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);
  if (error) {
    throw new Error(error.message);
  } else {
    redirect('/auth/email-verification');
  }
}
