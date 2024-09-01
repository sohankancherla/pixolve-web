'use client';

import React, { useCallback, useState, useMemo, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { ArrowUpTrayIcon, MinusIcon } from '@heroicons/react/24/outline';
import { Button } from './button';
import JSZip from 'jszip';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { Loader2Icon } from 'lucide-react';

interface FileItem {
  file: File;
  url: string;
}

export default function ImageDropzone() {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<Map<number, FileItem>>(new Map());
  const nextIdRef = useRef(0);
  const { getToken } = useAuth();

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

  const handleClick = async () => {
    setIsLoading(true);
    const zip = new JSZip();

    Array.from(files.values()).forEach((fileItem) => {
      zip.file(fileItem.file.name, fileItem.file);
    });

    const zipBlob = await zip.generateAsync({ type: 'blob' });

    const formData = new FormData();
    formData.append('file', zipBlob, 'images.zip');

    axios
      .post('http://localhost:8000/cluster', formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })
      .then((response) => {
        console.log(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

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
          {isDragActive
            ? 'Drop the files here ...'
            : isLimitReached
              ? 'Upload limit reached'
              : 'Upload files'}
        </span>
        <span className="text-muted-foreground/50 text-sm text-center">
          {files.size}/100
        </span>
      </div>
    </div>
  );

  return (
    <>
      {isLoading && (
        <div className="fixed h-screen w-screen bg-gray-500 bg-opacity-50 backdrop-blur z-10 left-0 top-0 flex items-center justify-center">
          <Loader2Icon className="h-10 w-10 animate-spin text-primary" />
        </div>
      )}
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
          <Button onClick={handleClick} disabled={files.size < 2}>
            Generate
          </Button>
        </div>
      </div>
    </>
  );
}
