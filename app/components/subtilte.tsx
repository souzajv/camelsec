"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Subtitle = () => {
    const fullText = [
        "O", "parceiro", "de", "cibersegurança", "e", "tecnologia",
        "com", "a", "agilidade", "que", "seu", "negócio", "precisa",
        "e", "a", "facilidade", "de", "uma", "única", "assinatura."
    ];

    const glitchWords = [1, 3, 5, 8, 10, 12, 16, 18]; // Índices das palavras com glitch
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

    const [displayedText, setDisplayedText] = useState<string[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const [animationFinished, setAnimationFinished] = useState(false);
    const [glitchTriggers, setGlitchTriggers] = useState(Array(fullText.length).fill(false));
    const [highlightTriggers, setHighlightTriggers] = useState(Array(fullText.length).fill(false));

    useEffect(() => {
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
                setTimeout(animateWord, 30);
            } else {
                currentCharIndex++;
                setTimeout(animateWord, 30);
            }
        };

        animateWord();
    }, []);

    // 🔹 Reduzindo a frequência do glitch
    useEffect(() => {
        if (!animationFinished) return;

        const glitchIntervals = glitchWords.map((index) =>
            setInterval(() => {
                setGlitchTriggers((prev) => {
                    const newTriggers = [...prev];
                    newTriggers[index] = true;

                    // Após o glitch, a palavra ficará techGreen por 4,5s
                    setTimeout(() => {
                        newTriggers[index] = false;
                        setGlitchTriggers([...newTriggers]);

                        // Ativar highlight após o glitch
                        setHighlightTriggers((prevHighlight) => {
                            const newHighlight = [...prevHighlight];
                            newHighlight[index] = true;

                            setTimeout(() => {
                                newHighlight[index] = false;
                                setHighlightTriggers([...newHighlight]);
                            }, 4500); // TechGreen dura 4.5s

                            return newHighlight;
                        });
                    }, 100); // Duração curta do glitch

                    return newTriggers;
                });
            }, Math.random() * 4000 + 9000) // Frequência do glitch ajustada para ser mais espaçada (4s a 7s)
        );

        return () => glitchIntervals.forEach(clearInterval);
    }, [animationFinished]);

    // 🔹 Configuração do efeito de glitch e techGreen
    const glitchVariants = {
        normal: {
            x: 0,
            y: 0,
            textShadow: "0px 0px 3px rgba(255, 255, 255, 0.5)",
            color: "#fff"
        },
        glitch: {
            x: [0, -2, 2, -1, 1, 0],
            y: [0, 1, -1, 2, -2, 0],
            textShadow: [
                "0px 0px 3px rgba(255, 255, 255, 0.5)",
                "1px -1px 8px rgba(255, 0, 0, 0.5)",
                "-1px 1px 8px rgba(0, 255, 255, 0.5)",
                "0px 0px 3px rgba(255, 255, 255, 0.5)",
            ],
            transition: {
                duration: 0.1, // O glitch acontece rapidamente
                repeat: 1,
                repeatType: "mirror" as "mirror",
                ease: "easeInOut",
            },
        },
        highlight: {
            color: "#00ffa1", // TechGreen aplicado imediatamente
            textShadow: "0px 0px 10px #00ffa1", // Brilho sutil, sem transição suave
        }
    };

    if (!isVisible) return null;

    return (
        <div className="mt-6">
            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-white font-light text-xl text-start tracking-tight w-full"
            >
                {displayedText.map((word, index) => (
                    <motion.span
                        key={index}
                        variants={glitchVariants}
                        initial="normal"
                        animate={
                            animationFinished && glitchTriggers[index]
                                ? "glitch"
                                : highlightTriggers[index]
                                    ? "highlight"
                                    : "normal"
                        }
                        className="inline-block mx-1"
                    >
                        {word}
                    </motion.span>
                ))}
            </motion.h2>
        </div>
    );
};

export default Subtitle;
