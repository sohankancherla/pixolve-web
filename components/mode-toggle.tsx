'use client';

import * as React from 'react';

import { useTheme } from 'next-themes';

import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

const modes = [
  {
    name: 'Light',
    icon: SunIcon,
  },
  {
    name: 'Dark',
    icon: MoonIcon,
  },
  {
    name: 'System',
    icon: ComputerDesktopIcon,
  },
];

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="grid grid-cols-3 gap-x-5 gap-y-2 text-center text-muted-foreground">
      {modes.map((mode) => {
        const Icon = mode.icon;

        return (
          <Button
            key={mode.name}
            variant="outline"
            className={cn(
              'h-16 w-16 group/button',
              theme === mode.name.toLowerCase()
                ? 'bg-accent'
                : 'hover:bg-accent/50',
            )}
            onClick={() => setTheme(mode.name.toLowerCase())}
          >
            <Icon
              className={cn(
                'h-6 w-6',
                theme === mode.name.toLowerCase()
                  ? 'stroke-primary'
                  : 'stroke-muted-foreground sm:group-hover/button:-translate-y-1 sm:transistion-all sm:duration-300 ease-in-out sm:motion-reduce:group-hover/button:translate-x-0',
              )}
            />
          </Button>
        );
      })}
      {modes.map((mode) => (
        <p
          key={mode.name}
          className={cn(theme === mode.name.toLowerCase() && 'text-primary')}
        >
          {mode.name}
        </p>
      ))}
    </div>
  );
}
