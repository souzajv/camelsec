"use client";
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface GlobeProps {
    className?: string;
}

const Globe: React.FC<GlobeProps> = ({ className = "" }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Limpa o container removendo quaisquer elementos filhos (evita duplicação)
        while (containerRef.current.firstChild) {
            containerRef.current.removeChild(containerRef.current.firstChild);
        }

        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 600;

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(width, height);
        containerRef.current.appendChild(renderer.domElement);

        // Criação dos pontos do globo
        const distance = Math.min(200, width / 4);
        const geometry = new THREE.BufferGeometry();
        const vertices: number[] = [];
        for (let i = 0; i < 1600; i++) {
            const theta = THREE.MathUtils.randFloatSpread(360);
            const phi = THREE.MathUtils.randFloatSpread(360);
            const x = distance * Math.sin(theta) * Math.cos(phi);
            const y = distance * Math.sin(theta) * Math.sin(phi);
            const z = distance * Math.cos(theta);
            vertices.push(x, y, z);
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        const particles = new THREE.Points(
            geometry,
            new THREE.PointsMaterial({
                color: 0x00ffa1,
                size: 2,
            })
        );

        const renderingParent = new THREE.Group();
        renderingParent.add(particles);
        renderingParent.position.set(0, 0, 0);
        scene.add(renderingParent);

        // Propriedades para animação e rotação
        const animProps = { scale: 1, xRot: 0, yRot: 0 };
        const mouseRotation = { x: 0, y: 0 };

        // Tween de escala pulsante
        gsap.to(animProps, {
            duration: 10,
            scale: 1.3,
            repeat: -1,
            yoyo: true,
            ease: "sine",
            onUpdate: () => {
                renderingParent.scale.set(animProps.scale, animProps.scale, animProps.scale);
            },
        });

        // Tween de rotação base contínua
        gsap.to(animProps, {
            duration: 120,
            xRot: Math.PI * 2,
            yRot: Math.PI * 4,
            repeat: -1,
            ease: "none",
        });

        const onMouseMove = (event: MouseEvent) => {
            // Verifica se o evento está sendo disparado (ajuda no debug)
            console.log("Mouse move:", event.clientX, event.clientY);

            const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

            // Opção 1: Tween com GSAP para transição suave
            gsap.to(mouseRotation, {
                duration: 0.5,
                x: mouseY * 0.5,
                y: mouseX * 0.5,
                ease: "power1.out",
                overwrite: true,
            });

            // Opção 2 (para teste): atribuição direta (descomente para testar)
            // mouseRotation.x = mouseY * 0.5;
            // mouseRotation.y = mouseX * 0.5;
        };

        const onResize = () => {
            if (containerRef.current) {
                const newWidth = containerRef.current.clientWidth;
                const newHeight = containerRef.current.clientHeight;
                camera.aspect = newWidth / newHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(newWidth, newHeight);
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', onResize);

        const animate = () => {
            requestAnimationFrame(animate);
            // Combina a rotação base com o offset do mouse
            renderingParent.rotation.x = animProps.xRot + mouseRotation.x;
            renderingParent.rotation.y = animProps.yRot + mouseRotation.y;
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
            if (containerRef.current && renderer.domElement.parentElement === containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return <div ref={containerRef} className={` ${className}`} />;
};

export default Globe;
