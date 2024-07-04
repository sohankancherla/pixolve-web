import React from 'react';

export const metadata = {
  title: 'Profile',
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
