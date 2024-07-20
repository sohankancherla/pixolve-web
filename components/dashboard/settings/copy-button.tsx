'use client';

import React from 'react';

import { ClipboardIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function CopyButton() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        navigator.clipboard.writeText('support@pixolve.app');
        toast({
          description: 'Copied to clipboard.',
        });
      }}
    >
      <ClipboardIcon className="mr-2 h-4 w-4" /> Copy
    </Button>
  );
}
