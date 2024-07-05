import React from 'react';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { ClerkProvider } from '@clerk/nextjs';

import ThemeProvider from '@/components/theme-provider';

import { cn } from '@/lib/utils';

import '@/styles/globals.css';

const inter = localFont({
  src: '../fonts/Inter-Variable.ttf',
  variable: '--font-inter',
});

const poppins = localFont({
  src: '../fonts/Poppins-Variable.ttf',
  variable: '--font-poppins',
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    absolute: 'Pixolve | AI Image Solutions',
    template: '%s | Pixolve',
    default: 'Pixolve | AI Image Solutions',
  },
  description:
    "Discover Pixolve, the cutting-edge AI Image App designed to transform your digital images. Elevate your photos with our powerful image enhancer that sharpens and improves pixelated images. Utilize our precision deblur tool to clear up blurry pictures effortlessly. Merge multiple photos to create the perfect group shot with everyone looking their best, or let our smart picker find the best photo from duplicates. Streamline your photo organization with our intuitive album generator that automatically sorts images into albums. Improve your photo gallery with Pixolve's advanced AI technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            inter.variable,
            poppins.variable,
            'min-h-screen min-w-screen bg-background font-sans',
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {process.env.VERCEL_URL && (
              <>
                <SpeedInsights />
                <Analytics />
              </>
            )}
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
