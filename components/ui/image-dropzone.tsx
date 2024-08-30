'use client';

import React, { useCallback, useState, useMemo, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { ArrowUpTrayIcon, MinusIcon } from '@heroicons/react/24/outline';
import { Button } from './button';

interface FileItem {
  file: File;
  url: string;
}

export default function ImageDropzone() {
  const [files, setFiles] = useState<Map<number, FileItem>>(new Map());
  const nextIdRef = useRef(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFiles((prevFiles) => {
        const newFiles = new Map(prevFiles);
        const remainingSlots = 100 - newFiles.size;
        const filesToAdd = acceptedFiles.slice(0, remainingSlots);

        filesToAdd.forEach((file) => {
          const id = nextIdRef.current++;
          newFiles.set(id, {
            file,
            url: URL.createObjectURL(file),
          });
        });
        return newFiles;
      });
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
    disabled: files.size >= 100,
  });

  const removeFile = useCallback((id: number) => {
    setFiles((prevFiles) => {
      const newFiles = new Map(prevFiles);
      const fileItem = newFiles.get(id);
      if (fileItem) {
        URL.revokeObjectURL(fileItem.url);
      }
      newFiles.delete(id);
      return newFiles;
    });
  }, []);

  const fileItems = useMemo(() => {
    return Array.from(files.entries()).map(([id, { file, url }]) => (
      <div key={id} className="relative w-full h-52">
        <Image
          src={url}
          alt={file.name}
          fill
          className="rounded-md object-cover"
        />
        <button
          onClick={() => removeFile(id)}
          className="absolute top-1 right-1 p-1 rounded-md bg-gray-600 text-white hover:bg-gray-800"
        >
          <MinusIcon className="h-4 w-4" />
        </button>
      </div>
    ));
  }, [files, removeFile]);

  const isLimitReached = files.size >= 100;

  const uploadAreaClasses = `flex flex-col items-center justify-center rounded-md border-2 border-dashed ${
    isLimitReached ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  }`;

  const renderUploadArea = () => (
    <div
      {...(isLimitReached ? {} : getRootProps())}
      className={uploadAreaClasses}
    >
      {!isLimitReached && <input {...getInputProps()} />}
      <div className="flex flex-col items-center justify-center">
        <div className="p-4 border border-dashed rounded-full mb-4">
          <ArrowUpTrayIcon className="h-6 w-6 text-muted-foreground" />
        </div>
        <span className="text-muted-foreground text-sm text-center">
          {isLimitReached ? 'Upload limit reached' : 'Upload files'}
        </span>
        <span className="text-muted-foreground/50 text-sm text-center">
          {files.size}/100
        </span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col flex-grow overflow-hidden">
      <div className="flex-grow overflow-hidden">
        {files.size > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 rounded-md border-2 border-dashed h-full p-4 overflow-y-auto content-start">
            {renderUploadArea()}
            {fileItems}
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
