import React from 'react';

export default function Signup() {
  return (
    <main className="flex items-center justify-center p-4 min-h-screen overflow-y-auto bg-gradient-to-bl from-[#ffffff] to-[#f3f4f6] dark:from-[#1f1f1f] dark:to-[#121317]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[200px] h-[200px] bg-gradient-to-r from-purple-400 to-blue-500 opacity-30 rounded-full filter blur-xl" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-gradient-to-r from-pink-400 to-red-500 opacity-30 rounded-full filter blur-2xl" />
        <div className="absolute top-1/4 right-0 w-[150px] h-[150px] bg-gradient-to-r from-yellow-400 to-orange-500 opacity-30 rounded-full filter blur-lg" />
      </div>
    </main>
  );
}
