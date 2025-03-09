"use client";

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import Title from '@/app/components/title';
import Squares from '@/app/components/squares';
import Header from '@/app/components/header';
import BlobCursor from '@/app/components/blobcursor';
import Subtitle from '@/app/components/subtilte';
import Cards from '@/app/components/cards';
import Loading from "./loading";
import Globe from '@/app/components/globe';
import Particles from '@/app/components/particles';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!loading) {
      const tl = gsap.timeline({ defaults: { duration: 3, ease: "power3.out" } });
      tl.from(containerRef.current, { opacity: 0, y: 30 });
    }
  }, [loading]);

  return (
    <div>
      {loading && <Loading onComplete={() => setLoading(false)} />}

      {!loading && (
        <div className='overflow-hidden'>
          <BlobCursor />
          <Squares id="first-section" className='relative z-20 h-screen w-screen'>
            <div ref={containerRef} className="relative h-full w-full">
              <Header className='fixed top-0 left-0 w-full flex items-center justify-between px-8 py-2 bg-[#2a322f]/50 shadow-2xl z-50 border border-gray-700/30' />
              <div className="h-full w-full flex flex-col items-start justify-start pt-24 pl-10 relative z-20 gap-4">
                <Title setTriggerStart={() => { }} />
                <Subtitle className="mt-6 w-[70%] relative z-20" />
                <Cards className='mt-12 flex gap-8' />
              </div>
              <div className="absolute bottom-0 right-0 h-full w-full z-10 overflow-x-hidden">
                {!loading && <Globe className="absolute bottom-[-1000px] right-[-950px] w-[2000px] h-[2000px] z-10 pointer-events-none" />}
              </div>
            </div>
          </Squares>
          <div id="second-section" className="h-screen w-screen">
            <Particles className='h-full w-full' />
            <h3 className='text-white'>
              CamelSec
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
