'use client';

import Image from 'next/image';
import { Upload } from 'lucide-react';

export default function ImageDropzone() {
  return (
    <button className="flex flex-col aspect-square h-52 w-full items-center justify-center rounded-md border-2 border-dashed">
      <div className="p-4 border border-dashed rounded-full mb-4">
        <Upload className="h-6 w-6 text-muted-foreground" />
      </div>
      <span className="sr-only">Upload</span>
      <span className="text-muted-foreground">
        Drag 'n' drop files here, or click to select files
      </span>
      <span className="text-muted-foreground/50 text-sm">Upload one image</span>
    </button>
  );
}
