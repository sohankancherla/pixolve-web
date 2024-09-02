'use client';

import React, { useCallback, useState, useMemo, useRef } from 'react';
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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

interface Cluster {
  [imagePath: string]: number;
}

interface Clusters {
  [id: number]: Cluster;
}

export default function ImageDropzone() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Clusters>({});
  const [files, setFiles] = useState<Map<string, FileItem>>(new Map());
  const { getToken } = useAuth();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFiles((prevFiles) => {
        const newFiles = new Map(prevFiles);
        const remainingSlots = 100 - newFiles.size;
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
    disabled: files.size >= 100,
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
      .post('http://localhost:8000/cluster', formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
        setOpen(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

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
            <DialogTitle className="text-2xl self-start">Results</DialogTitle>
            <DialogDescription className="sr-only">
              These are the results, select your threshold and download
            </DialogDescription>
          </DialogHeader>
          <Carousel>
            <CarouselContent className="w-[calc(85vw-34px)] max-w-[478px]">
              {Object.entries(data).map(([id, cluster]) => (
                <CarouselItem className="w-fit" key={id}>
                  <h3 className="text-lg font-medium mb-2">
                    {id === '-1' ? 'Ungrouped' : 'Group ' + (Number(id) + 1)}
                  </h3>
                  <div className="h-[50vh] min-h-96 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
                    {Object.entries(cluster as Cluster).map(
                      ([imagePath, count]) => {
                        const imageName = imagePath.split('/').pop();
                        const fileItem = files.get(imageName!);
                        const imageUrl = fileItem ? fileItem.url : '';

                        return (
                          <Card key={imageName} className="w-full h-fit">
                            <CardContent className="p-0 gap-2">
                              <img
                                key={imagePath}
                                src={imageUrl}
                                alt={imageName!}
                                className="rounded-md h-52 w-full object-cover"
                              />
                            </CardContent>
                            <CardFooter className="p-0">
                              <span className="m-4 text-base font-medium text-muted-foreground">{`Score: ${count}`}</span>
                            </CardFooter>
                          </Card>
                        );
                      },
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="h-8 w-8" />
            <CarouselNext />
          </Carousel>
          <Button>Download</Button>
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
