'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import Image from 'next/image';
import Link from 'next/link';

import { Loader2 } from 'lucide-react';
import Alert from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Google from '@/components/icons/google';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  email: z.string().min(1, "Email can't be blank"),
  password: z.string().min(1, "Password can't be blank"),
});

export default function LogInPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorAlert, setErrorAlert] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setErrorAlert(null);

    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);

    const error = 'change';
    setLoading(false);
    if (error) {
      setErrorAlert(error);
    }
  };

  return (
    <>
      <Image
        src="/logo-purple.png"
        alt="Pixolve"
        width="150"
        height="27"
        className="flex-shrink-0 mb-12"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-xl">Log In</CardTitle>
              <CardDescription>
                Welcome back! Enter your details to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Button variant="outline" className="w-full">
                  <Google />
                  Continue with Google
                </Button>
                <div className="flex mt-2 w-full items-center justify-center">
                  <div className="bg-input w-full h-[1px]" />
                  <span className="text-muted-foreground text-sm px-6">or</span>
                  <div className="bg-input w-full h-[1px]" />
                </div>
                {errorAlert && <Alert color="red" text={errorAlert} />}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="jdoe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        <Link
                          href="/auth/login/forgot-password"
                          className="ml-auto inline-block text-sm underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={loading} type="submit" className="w-full">
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Log In
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link href="/auth/signup" className="underline">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  );
}
