import React from 'react';

export const metadata = {
  title: 'Account',
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="h-dvh w-full">{children}</main>;
}
