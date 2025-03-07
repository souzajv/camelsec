"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TitleProps {
    setTriggerStart: (value: boolean) => void;
}

const Title = ({ setTriggerStart }: TitleProps) => {
    const fullText = ["Segurança", "não", "traz", "estresse,", "traz", "resultado"];
    const glitchWords = [1, 2, 3, 4]; // Índices das palavras que terão efeito de glitch
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

    const [displayedText, setDisplayedText] = useState<string[]>([]);
    const [showCursor, setShowCursor] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [animationFinished, setAnimationFinished] = useState(false);

    useEffect(() => {
        // Gera o texto aleatório inicial apenas no cliente
        const getRandomText = () => fullText.map(word =>
            word.split("").map(() => charset[Math.floor(Math.random() * charset.length)]).join("")
        );

        let currentText = getRandomText();
        setDisplayedText(currentText);
        setIsVisible(true);

        let currentWordIndex = 0;
        let currentCharIndex = 0;

        const animateWord = () => {
            if (currentWordIndex >= fullText.length) {
                setAnimationFinished(true);
                setTimeout(() => setTriggerStart(true), 500);
                return;
            }

            const currentWord = fullText[currentWordIndex];
            const randomChars = currentWord.split("").map((char, index) =>
                index < currentCharIndex ? char : charset[Math.floor(Math.random() * charset.length)]
            ).join("");

            currentText[currentWordIndex] = randomChars;
            setDisplayedText([...currentText]);

            if (currentCharIndex >= currentWord.length) {
                currentWordIndex++;
                currentCharIndex = 0;
                setTimeout(animateWord, 37);
            } else {
                currentCharIndex++;
                setTimeout(animateWord, 37);
            }
        };

        animateWord();
    }, []);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 600);

        return () => clearInterval(cursorInterval);
    }, []);

    // 🔹 Configuração do efeito de glitch para palavras específicas
    const glitchVariants = {
        normal: { x: 0, y: 0, textShadow: "0px 0px 5px rgba(0, 255, 161, 0.8)" },
        glitch: {
            x: [0, -2, 2, -1, 1, 0], // Pequenos deslocamentos aleatórios
            y: [0, 1, -1, 2, -2, 0],
            color: ["#fff", "#00ffa1", "#fff"],
            textShadow: [
                "0px 0px 5px rgba(0, 255, 161, 0.8)",
                "1px -1px 10px rgba(255, 0, 0, 0.8)",
                "-1px 1px 10px rgba(0, 255, 255, 0.8)",
                "0px 0px 5px rgba(0, 255, 161, 0.8)",
            ],
            transition: {
                duration: 0.1,
                repeat: 1,
                repeatType: "mirror" as "mirror",
                ease: "easeInOut",
            },
        },
    };

    if (!isVisible) return null;

    return (
        <div className="">
            <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-white font-light text-6xl text-start tracking-tight w-full uppercase"
            >
                {/* Segurança (Neon) */}
                <span className="text-techGreen subtle-neon">{displayedText[0]}</span>{" "}

                {/* não (Glitch) */}
                <motion.span
                    variants={glitchVariants}
                    initial="normal"
                    animate={animationFinished && Math.random() > 0.9 ? "glitch" : "normal"}
                    className="inline-block"
                >
                    {displayedText[1]}
                </motion.span>{" "}

                {/* traz (Glitch) */}
                <motion.span
                    variants={glitchVariants}
                    initial="normal"
                    animate={animationFinished && Math.random() > 0.9 ? "glitch" : "normal"}
                    className="inline-block"
                >
                    {displayedText[2]}
                </motion.span>{" "}

                {/* estresse (Glitch) */}
                <motion.span
                    variants={glitchVariants}
                    initial="normal"
                    animate={animationFinished && Math.random() > 0.9 ? "glitch" : "normal"}
                    className="inline-block"
                >
                    {displayedText[3]}
                </motion.span>{" "}

                <br />

                {/* traz (Glitch) */}
                <motion.span
                    variants={glitchVariants}
                    initial="normal"
                    animate={animationFinished && Math.random() > 0.9 ? "glitch" : "normal"}
                    className="inline-block"
                >
                    {displayedText[4]}
                </motion.span>{" "}

                {/* resultado (Neon) */}
                <span className="text-techGreen subtle-neon">{displayedText[5]}</span>

                {/* Cursor piscando */}
                <span className="blinking-cursor opacity-100 transition-opacity duration-500">
                    {showCursor ? "|" : ""}
                </span>
            </motion.h1>
        </div>
    );
};

export default Title;
