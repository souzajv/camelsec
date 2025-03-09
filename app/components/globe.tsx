"use client";
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const Globe: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(width, height);
        containerRef.current.appendChild(renderer.domElement);

        // Cria os pontos do globo
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

        // Calcula o tamanho do frustum no plano z = 0
        const vFOV = (camera.fov * Math.PI) / 180; // conversão para radianos
        const worldHeight = 2 * Math.tan(vFOV / 2) * camera.position.z;
        const worldWidth = worldHeight * camera.aspect;
        // Posiciona o grupo para que seu centro seja o canto inferior esquerdo da projeção
        renderingParent.position.set(-worldWidth / 2, -worldHeight / 2, 0);

        scene.add(renderingParent);

        camera.position.z = 600;

        // Propriedades para rotação contínua e offset do mouse
        const animProps = { scale: 1, xRot: 0, yRot: 0 };
        const mouseRotation = { x: 0, y: 0 };

        // Tween para efeito de escala pulsante
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

        // Tween para rotação base contínua
        gsap.to(animProps, {
            duration: 120,
            xRot: Math.PI * 2,
            yRot: Math.PI * 4,
            repeat: -1,
            ease: "none",
        });

        // Atualiza o offset da rotação via mouse
        const onMouseMove = (event: MouseEvent) => {
            const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

            gsap.to(mouseRotation, {
                duration: 2,
                x: mouseY * 0.5,
                y: mouseX * 0.5,
                ease: "power1.out",
            });
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

        // Função de animação que combina a rotação base e o offset do mouse
        const animate = () => {
            requestAnimationFrame(animate);
            renderingParent.rotation.x = animProps.xRot + mouseRotation.x;
            renderingParent.rotation.y = animProps.yRot + mouseRotation.y;
            renderer.render(scene, camera);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
            if (containerRef.current && renderer.domElement.parentElement === containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return <div ref={containerRef} className="absolute bottom-[-1000px] right-[-950px] w-[2000px] h-[2000px] z-10" />;
};

export default Globe;
