import React from 'react';

import ImageDropzone from '@/components/ui/image-dropzone';

export const metadata = {
  title: 'Enhance',
};

export default function EnhancePage() {
  return (
    <>
      <h1 className="text-4xl font-medium mb-12">Enhance</h1>
      <ImageDropzone />
    </>
  );
}
