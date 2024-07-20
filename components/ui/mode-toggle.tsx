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
  { name: 'Light', icon: SunIcon },
  { name: 'Dark', icon: MoonIcon },
  { name: 'System', icon: ComputerDesktopIcon },
];

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-3 gap-x-5 gap-y-2 text-center text-muted-foreground w-fit">
        {modes.map((mode) => (
          <Button
            key={mode.name}
            variant="outline"
            className="h-12 w-12 sm:h-16 sm:w-16 group/button"
          >
            <mode.icon className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
          </Button>
        ))}
        {modes.map((mode) => (
          <p key={mode.name}>{mode.name}</p>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-x-5 gap-y-2 text-center text-muted-foreground w-fit">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isActive = theme === mode.name.toLowerCase();

        return (
          <Button
            key={mode.name}
            variant="outline"
            className={cn(
              'h-12 w-12 sm:h-16 sm:w-16 group/button',
              isActive ? 'bg-accent' : 'hover:bg-accent/50',
            )}
            onClick={() => setTheme(mode.name.toLowerCase())}
          >
            <Icon
              className={cn(
                'h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0',
                isActive
                  ? 'stroke-primary'
                  : 'stroke-muted-foreground sm:group-hover/button:-translate-y-1 sm:transition-all sm:duration-300 ease-in-out sm:motion-reduce:group-hover/button:translate-x-0',
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
