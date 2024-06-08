import React from 'react';

import Image from 'next/image';

import { CircleCheckBig } from 'lucide-react';

function ListItem({
  heading,
  paragraph,
}: {
  heading: string;
  paragraph: string;
}) {
  return (
    <li className="flex gap-4">
      <CircleCheckBig
        size={20}
        className="flex-shrink-0 stroke-violet-500"
        aria-hidden="true"
      />
      <div className="max-w-[360px]">
        <h6 className="text-transparent bg-clip-text bg-gradient-to-br from-violet-500 to-pink-400 mb-2">
          {heading}
        </h6>
        <p>{paragraph}</p>
      </div>
    </li>
  );
}

export default function Signup() {
  return (
    <main className="flex items-center justify-center p-4 min-h-screen h-full overflow-y-auto bg-gradient-to-bl from-[#ffffff] to-[#f3f4f6] dark:from-[#1f1f1f] dark:to-[#121317]">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[200px] h-[200px] bg-gradient-to-r from-purple-400 to-blue-500 opacity-30 rounded-full filter blur-xl" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-gradient-to-r from-pink-400 to-red-500 opacity-30 rounded-full filter blur-2xl" />
        <div className="absolute top-1/4 right-0 w-[150px] h-[150px] bg-gradient-to-r from-yellow-400 to-orange-500 opacity-30 rounded-full filter blur-lg" />
      </div>
      <div className="w-full max-w-5xl lg:flex">
        <section className="font-display text-muted-foreground lg:p-10 flex-1 flex flex-col">
          <Image
            src="/logo-purple.png"
            alt="Pixolve"
            width="150"
            height="27"
            className="flex-shrink-0 mb-12"
          />
          <ul className="hidden lg:flex flex-col gap-6">
            <ListItem
              heading="Enhance Your Images Instantly"
              paragraph="Improve the quality of your images with the magical powers of AI"
            />
            <ListItem
              heading="Perfect Group Shots"
              paragraph="Merge the best faces from a series of photos to create the perfect group shot"
            />
            <ListItem
              heading="Smart Album Organization"
              paragraph="Automate your album creation, so you spend less time managing and more time enjoying your memories"
            />
            <ListItem
              heading="Eliminate Duplicates"
              paragraph="Keep your photo library clean and organized with best picture detection"
            />
            <ListItem
              heading="100% Privacy"
              paragraph="Your photos are yours and yours alone. We never store your images"
            />
          </ul>
        </section>
        <section className="h-full w-full p-10 flex flex-col justify-center items-center flex-1 font-sans">
          Test
        </section>
      </div>
    </main>
  );
}
