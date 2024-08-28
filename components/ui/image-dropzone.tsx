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
    <div>
      <div
        {...getRootProps()}
        className={`flex flex-col aspect-square h-52 w-full items-center justify-center rounded-md border-2 border-dashed cursor-pointer mb-4 ${folderUploaded ? 'pointer-events-none opacity-50' : ''}`}
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
      <Card>
        <CardHeader className="z-10 shadow dark:shadow-black border-x rounded-md">
          <CardTitle>Uploaded Photos</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-4 gap-8 overflow-y-auto h-[420px] p-8">
          {files.length > 0 &&
            files.map((file) => (
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
                <p>{file.name}</p>
              </div>
            ))}
        </CardContent>
        <CardFooter className="border-t border-border p-4 flex justify-end">
          <Button className="mr-4">Generate</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
