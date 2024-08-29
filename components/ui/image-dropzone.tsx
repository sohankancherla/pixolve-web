'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { ArrowUpTrayIcon, MinusIcon } from '@heroicons/react/24/outline';
import { Button } from './button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export default function ImageDropzone() {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
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
    <div className="flex flex-col flex-grow overflow-hidden">
      <div className="flex-grow overflow-hidden">
        {files.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 rounded-md border-2 border-dashed h-full p-4 overflow-y-auto content-start">
            <div
              {...getRootProps()}
              className="flex flex-col items-center justify-center rounded-md border-2 border-dashed cursor-pointer"
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center">
                <div className="p-4 border border-dashed rounded-full mb-4">
                  <ArrowUpTrayIcon className="h-6 w-6 text-muted-foreground" />
                </div>
                <span className="text-muted-foreground/50 text-sm text-center">
                  Upload up to 100 images
                </span>
              </div>
            </div>
            {files.map((file) => (
              <div key={file.name} className="relative w-full h-52">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="rounded-md object-cover h-full w-full"
                />
                <button
                  onClick={() => removeFile(file.name)}
                  className="absolute top-1 right-1 p-1 rounded-md bg-gray-600 text-white hover:bg-gray-800"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
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
              <span className="text-muted-foreground text-center mb-1 px-2">
                {isDragActive
                  ? 'Drop the files here ...'
                  : "Drag 'n' drop a folder here, or click to select images"}
              </span>
              <span className="text-muted-foreground/50 text-sm text-center">
                Upload up to 100 images
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-end py-4">
        <Button>Generate</Button>
      </div>
    </div>
  );
}
