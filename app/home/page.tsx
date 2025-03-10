"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Title from "@/app/components/title";
import Squares from "@/app/components/squares";
import Header from "@/app/components/header";
import BlobCursor from "@/app/components/blobcursor";
import Subtitle from "@/app/components/subtilte";
import Cards from "@/app/components/cards";
import Loading from "./loading";
import Globe from "@/app/components/globe";
import Particles from "@/app/components/particles";
import ScrollFloat from "@/app/components/scrollFloat";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  // Animação de entrada para o conteúdo da primeira seção
  useEffect(() => {
    if (!loading && containerRef.current) {
      gsap.timeline({ defaults: { duration: 3, ease: "power3.out" } })
        .from(containerRef.current, { opacity: 0, y: 30 });
    }
  }, [loading]);

  // Timeline principal (reposicionamento, zoom + fade-out e scroll lateral)
  useEffect(() => {
    if (!loading && horizontalRef.current) {
      gsap.registerPlugin(ScrollTrigger);

      // Estados iniciais
      gsap.set("#transition-globe", {
        left: "500px",
        top: "-300px",
        scale: 1,
        opacity: 1,
      });
      gsap.set("#second-section", { opacity: 0 });

      // Cria a timeline vinculada ao scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: horizontalRef.current,
          start: "top top",
          end: "+=1400",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // ───────── Segmento A (0.0 → 0.4) ─────────
      // Move o globo para o centro e esconde a primeira seção
      tl.to("#transition-globe", {
        left: "-200px",
        top: "-550px",
        ease: "power2.inOut", // mais suave
        duration: 0.4,
      }, 0);

      tl.to(".square", {
        opacity: 0,
        ease: "power2.inOut", // mais suave
        duration: 0.4,
      }, 0);

      // ───────── Segmento B (0.4 → 1.0) ─────────
      // Zoom + fade-out simultâneos e suaves
      // Duração total do zoom e do fade-out: 0.6s
      tl.to("#transition-globe", {
        scale: 1.5,
        ease: "power2.inOut",
        duration: 0.6,
      }, 0.4);

      tl.to("#transition-globe", {
        opacity: 0,
        ease: "power2.inOut",
        duration: 0.6, // mesmo período do zoom
      }, 0.4);

      // ───────── Segmento C (1.0 → 1.2) ─────────
      // Movimenta o contêiner horizontal para a esquerda, revelando a segunda seção (que ainda está oculta)
      tl.to(horizontalRef.current, {
        x: "-100vw",
        ease: "power2.inOut",
        duration: 0.2,
      }, 1.0);

      // ───────── Segmento D (após 1.2) ─────────
      // Aguarda 0.7s, então fade-in suave da segunda seção
      tl.to("#second-section", {
        opacity: 1,
        ease: "power2.inOut",
        duration: 1.0,
      }, "+=0.7");
    }
  }, [loading]);

  return (
    <div className="overflow-hidden">
      {loading && <Loading onComplete={() => setLoading(false)} />}
      {!loading && (
        <>
          <BlobCursor />
          {/* Container horizontal (200vw) para scroll lateral */}
          <div ref={horizontalRef} className="flex" style={{ width: "200vw" }}>
            {/* Primeira Seção */}
            <div id="first-section" className="h-screen w-screen overflow-hidden relative">
              <Squares className="relative z-20 h-full w-full square">
                <div ref={containerRef} className="relative h-full w-full">
                  <Header className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-2 bg-[#2a322f]/50 shadow-2xl z-50 border border-gray-700/30" />
                  <div className="h-full w-full flex flex-col items-start justify-start pt-24 pl-10 relative z-20 gap-4">
                    <Title setTriggerStart={() => { }} />
                    <Subtitle className="mt-6 w-[70%] relative z-20" />
                    <Cards className="mt-12 flex gap-8" />
                  </div>
                </div>
              </Squares>
              {/* O Globo, cujo posicionamento, escala e opacidade serão animados */}
              <div
                id="transition-globe"
                className="h-[2000px] w-[2000px] absolute overflow-hidden"
              >
                <Globe className="w-full h-full z-10 pointer-events-none" />
              </div>
            </div>

            {/* Segunda Seção (exibida após o scroll lateral e fade-in) */}
            <div
              id="second-section"
              className="h-screen w-screen flex items-center justify-center relative"
            >
              <Particles className="w-full h-full">
                <div className="w-full h-full flex items-center justify-center">
                  <h3 className="text-white text-4xl font-bold">
                    teste
                  </h3>
                </div>
              </Particles>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
