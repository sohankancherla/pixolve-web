import React from 'react';

import ImageDropzone from '@/components/ui/image-dropzone';

export const metadata = {
  title: 'Clean',
};

export default function ScorePage() {
  return (
    <div className="h-full flex flex-col">
      <h1 className="text-4xl font-medium mb-12">Clean</h1>
      <ImageDropzone />
    </div>
  );
}
