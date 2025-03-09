"use client";

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import Title from '@/app/components/title';
import Squares from '@/app/components/squares';
import Header from '@/app/components/header';
import BlobCursor from '@/app/components/blobcursor';
import Subtitle from '@/app/components/subtilte';
import DecayCard from '@/app/components/decaycard';
import Loading from "./loading";
import Globe from '@/app/components/globe';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!loading) {
      // Timeline para uma animação sequencial e suave
      const tl = gsap.timeline({ defaults: { duration: 1.5, ease: "power3.out" } });

      // Animação do container principal
      tl.from(containerRef.current, { opacity: 0, y: 30 });

      // Se quiser animar os elementos internos individualmente,
      // adicione classes aos elementos e use o stagger:
      // tl.from(containerRef.current.querySelectorAll('.child-animate'), { opacity: 0, y: 20, stagger: 0.2 }, "-=1");
    }
  }, [loading]);

  return (
    <div>
      {loading && <Loading onComplete={() => setLoading(false)} />}

      {!loading && (
        <Squares>
          <div ref={containerRef} className="relative h-full w-full">
            <Header />
            <div className="h-full w-full flex flex-col items-start justify-start pt-24 pl-10 relative z-20 gap-4">
              <Title setTriggerStart={() => { }} />
              <Subtitle className="mt-6 w-[70%] relative z-20" />
              <div className="mt-12 flex gap-8">
                <DecayCard className="relative z-10" width={300} height={300}>
                  <div className="flex flex-col gap-4 px-8 text-center">
                    <img
                      src="/images/despesas.svg"
                      alt="Ícone decorativo"
                      className="absolute top-[-100px] left-1/2 transform -translate-x-1/2 size-20"
                    />
                    <span className='text-white'>
                      Reduza <span className='bg-techGreen text-black px-1'>despesas</span>,<br />não segurança.
                    </span>
                    <p className='text-white/90 text-sm font-light mb-[-10px]'>
                      Tenha resultados de alto nível sem o custo e a complexidade de construir uma equipe interna de alto nível.
                    </p>
                  </div>
                </DecayCard>
                <DecayCard className="relative z-10" width={300} height={300}>
                  <div className="flex flex-col gap-4 px-7 text-center">
                    <img
                      src="/images/padrao.svg"
                      alt="Ícone decorativo"
                      className="absolute top-[-100px] left-1/2 transform -translate-x-1/2 size-20"
                    />
                    <span className='text-white'>
                      Se adeque ao padrão de <span className='bg-techGreen text-black px-1'>mercado</span>.
                    </span>
                    <p className='text-white/90 text-sm font-light mb-[-10px]'>
                      Implemente práticas de segurança sob medida, trazendo conformidade em relação às leis e normas do mercado.
                    </p>
                  </div>
                </DecayCard>
                <DecayCard className="relative z-10" width={300} height={300}>
                  <div className="flex flex-col gap-4 px-8 text-center">
                    <img
                      src="/images/trabalhe.svg"
                      alt="Ícone decorativo"
                      className="absolute top-[-100px] left-1/2 transform -translate-x-1/2 size-20"
                    />
                    <span className='text-white'>
                      Trabalhe com os <span className='bg-techGreen text-black px-1'>melhores</span>.
                    </span>
                    <p className='text-white/90 text-sm font-light mb-[-10px]'>
                      Use a tecnologia, mas não seja dependente. Reforce sua segurança com quem mais domina a tecnologia.
                    </p>
                  </div>
                </DecayCard>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 h-full w-full z-10">
              {!loading && <Globe />}
            </div>
            <BlobCursor />
          </div>
        </Squares>
      )}
    </div>
  );
}
