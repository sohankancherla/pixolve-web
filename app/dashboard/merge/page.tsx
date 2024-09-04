import React from 'react';

import ImageDropzone from '@/components/ui/image-dropzone-merge';

export const metadata = {
  title: 'Merge',
};

export default function MergePage() {
  return (
    <div className="h-full flex flex-col">
      <h1 className="text-4xl font-medium mb-4">Merge</h1>
      <p className="text-muted-foreground text-sm mb-6">
        Combine similar images to ensure everyone looks their absolute best!
      </p>
      <ImageDropzone />
    </div>
  );
}
