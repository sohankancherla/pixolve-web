import React from 'react';

import UserButton from '@/components/dashboard/user-button';
import ImageUploader from '@/components/ui/image-uploader';

export const metadata = {
  title: 'Enhance',
};

export default function EnhancePage() {
  return (
    <>
      <div className="w-full flex justify-between items-center p-4">
        <h1 className="text-4xl font-medium">Enhance</h1>
        <UserButton />
      </div>
      <div className="p-4 mt-10">
        <ImageUploader />
      </div>
    </>
  );
}
