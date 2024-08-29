'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { ArrowUpTrayIcon, MinusIcon } from '@heroicons/react/24/outline';
import { Button } from './button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ImageDropzone() {
  const [files, setFiles] = useState<File[]>([]);
  const [folderUploaded, setFolderUploaded] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFiles(acceptedFiles);
      setFolderUploaded(true);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
      'image/heic': [],
      'image/jfif': [],
    },
    multiple: true,
  });

  const removeFile = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  return (
    <Card className="flex flex-col h-full border-none shadow-none">
      <CardContent className="h-full min-h-80">
        {files.length > 0 ? (
          <div className="grid grid-cols-4 gap-4">
            {files.map((file) => (
              <div
                key={file.name}
                className="flex flex-col gap-2 items-start h-52"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                  <button
                    onClick={() => removeFile(file.name)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-gray-600 text-white hover:bg-gray-800"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">{file.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <div
            {...getRootProps()}
            className="flex flex-col aspect-square h-full w-full items-center justify-center rounded-md border-2 border-dashed cursor-pointer mb-4"
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center">
              <div className="p-4 border border-dashed rounded-full mb-4">
                <ArrowUpTrayIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <span className="sr-only">Upload</span>
              <span className="text-muted-foreground">
                {isDragActive
                  ? 'Drop the files here ...'
                  : "Drag 'n' drop a folder here, or click to select images"}
              </span>
              <span className="text-muted-foreground/50 text-sm">
                Upload up to 100 images
              </span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Generate</Button>
      </CardFooter>
    </Card>
  );
}
