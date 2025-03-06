"use client";

import { useRef } from 'react';
import Title from '@/app/components/title';
import Squares from '@/app/components/squares';
import Header from '@/app/components/header';
import BlobCursor from '@/app/components/blobcursor';
import Subtitle from '@/app/components/subtilte';

export default function Home() {
  const containerRef = useRef(null);

  return (
    <div className="relative h-full w-full">
      <Squares>
        <Header />
        <div className="h-full w-full flex flex-col items-start justify-start pt-32 pl-10 relative z-20 gap-4">
          <Title setTriggerStart={() => { }} />
          <div className="h-full w-[70%]">
            <Subtitle />
          </div>
        </div>
      </Squares>
      <BlobCursor />
    </div>
  );
}
