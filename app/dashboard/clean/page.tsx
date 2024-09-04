import React from 'react';

import ImageDropzone from '@/components/ui/image-dropzone';

export const metadata = {
  title: 'Clean',
};

export default function ScorePage() {
  return (
    <div className="h-full flex flex-col">
      <h1 className="text-4xl font-medium mb-4">Clean</h1>
      <p className="text-muted-foreground text-sm mb-6">
        Dump your images here and have AI find the best ones for you!
      </p>
      <ImageDropzone />
    </div>
  );
}
