import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import ModeToggle from '@/components/ui/mode-toggle';
import UserButton from '@/components/dashboard/user-button';

export const metadata = {
  title: 'Settings',
};

export default function SettingsPage() {
  return (
    <>
      <div className="w-full flex justify-between items-center mb-12">
        <h1 className="text-4xl font-semibold tracking-tight">Settings</h1>
        <UserButton />
      </div>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Theme</CardTitle>
            <CardDescription>
              Select the theme you want to use for your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ModeToggle />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>
              Need help? Contact our support team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <Input placeholder="Message" />
            </form>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button>Send</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
