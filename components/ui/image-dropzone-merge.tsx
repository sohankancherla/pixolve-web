'use client';

import React, { useCallback, useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { ArrowUpTrayIcon, MinusIcon } from '@heroicons/react/24/outline';
import { Button } from './button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<string>('');
  const [files, setFiles] = useState<Map<string, FileItem>>(new Map());
  const [buttonLoading, setButtonLoading] = useState(false);
  const { getToken } = useAuth();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFiles((prevFiles) => {
        const newFiles = new Map(prevFiles);
        const remainingSlots = 10 - newFiles.size;
        const filesToAdd = acceptedFiles.slice(0, remainingSlots);

        filesToAdd.forEach((file) => {
          newFiles.set(file.name, {
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
    disabled: files.size >= 10,
  });

  const removeFile = useCallback((name: string) => {
    setFiles((prevFiles) => {
      const newFiles = new Map(prevFiles);
      const fileItem = newFiles.get(name);
      if (fileItem) {
        URL.revokeObjectURL(fileItem.url);
      }
      newFiles.delete(name);
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
      .post('http://localhost:8000/merge', formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
        responseType: 'arraybuffer',
      })
      .then(async (response) => {
        const blob = new Blob([response.data], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
        console.log(url);
        setData(url);
        setIsLoading(false);
        setOpen(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // const handleDownload = async () => {
  //   setButtonLoading(true);
  //   try {
  //     const zip = new JSZip();

  //     if (currentPage === Object.keys(data).length - 1) {
  //       const currentCluster = data[-1];
  //       Object.keys(currentCluster).forEach((imagePath) => {
  //         const imageName = imagePath.split('/').pop();
  //         const fileItem = files.get(imageName!);
  //         if (fileItem) {
  //           zip.file(imageName!, fileItem.file);
  //         }
  //       });
  //     } else {
  //       const currentCluster = data[currentPage];
  //       Object.entries(currentCluster).forEach(([imagePath, score]) => {
  //         if (score >= parseInt(threshold)) {
  //           const imageName = imagePath.split('/').pop();
  //           const fileItem = files.get(imageName!);
  //           if (fileItem) {
  //             zip.file(imageName!, fileItem.file);
  //           }
  //         }
  //       });
  //     }

  //     const content = await zip.generateAsync({ type: 'blob' });
  //     const link = document.createElement('a');
  //     link.href = URL.createObjectURL(content);
  //     link.download = `group_${currentPage === Object.keys(data).length - 1 ? 'ungrouped' : currentPage + 1}.zip`;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } catch (error) {
  //     console.error('Error downloading images:', error);
  //   } finally {
  //     setButtonLoading(false);
  //   }
  // };

  const fileItems = useMemo(() => {
    return Array.from(files.entries()).map(([name, { file, url }]) => (
      <div key={name} className="relative w-full h-52">
        <Image
          src={url}
          alt={file.name}
          fill
          className="rounded-md object-cover border"
        />
        <button
          onClick={() => removeFile(name)}
          className="absolute top-1 right-1 p-1 rounded-md bg-gray-600 text-white hover:bg-gray-800"
        >
          <MinusIcon className="h-4 w-4" />
        </button>
      </div>
    ));
  }, [files, removeFile]);

  const isLimitReached = files.size >= 10;

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
          {files.size}/10
        </span>
      </div>
    </div>
  );

  return (
    <>
      {isLoading && (
        <div className="fixed h-screen w-screen bg-black/80 bg-opacity-75 z-10 left-0 top-0 flex items-center justify-center">
          <Loader2Icon className="h-10 w-10 animate-spin text-primary" />
        </div>
      )}
      <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl self-start">
              Merged Image
            </DialogTitle>
            <DialogDescription className="sr-only">
              This is the merged image, press the download button to save it.
            </DialogDescription>
          </DialogHeader>
          <div className="relative w-full h-72">
            <Image
              src={data}
              alt="Merged Image"
              fill
              className="rounded-md object-cover border"
            />
          </div>
          <Button disabled={buttonLoading}>
            {buttonLoading && (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Download
          </Button>
        </DialogContent>
      </Dialog>

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
                  Upload up to 10 images
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
