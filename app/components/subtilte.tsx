"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SubtitleProps {
    className?: string;
}

const Subtitle: React.FC<SubtitleProps> = ({ className = "" }) => {
    const fullText = [
        "O", "parceiro", "de", "cibersegurança", "e", "tecnologia",
        "com", "a", "agilidade", "que", "seu", "negócio", "precisa",
        "e", "a", "facilidade", "de", "uma", "única", "assinatura."
    ];

    // 🔹 Apenas palavras específicas terão o efeito glitch
    const glitchWords = ["parceiro", "cibersegurança", "tecnologia", "agilidade", "seu", "negócio", "precisa", "facilidade", "assinatura"];
    const glitchIndices = fullText.map((word, index) => glitchWords.includes(word) ? index : -1).filter(index => index !== -1);

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
                setTimeout(animateWord, 15);
            } else {
                currentCharIndex++;
                setTimeout(animateWord, 15);
            }
        };

        animateWord();
    }, []);

    // 🔹 Reduzindo a frequência do glitch
    useEffect(() => {
        if (!animationFinished) return;

        const glitchIntervals = glitchIndices.map((index) =>
            setInterval(() => {
                setGlitchTriggers((prev) => {
                    const newTriggers = [...prev];
                    newTriggers[index] = true;

                    // Após o glitch, a palavra ficará techGreen por 0.7s
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
                            }, 700); // TechGreen dura 0.7s

                            return newHighlight;
                        });
                    }, 100); // Duração curta do glitch

                    return newTriggers;
                });
            }, Math.random() * 2000 + 5000)
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
        highlight: {
            color: "#00ffa1", // TechGreen aplicado imediatamente
            textShadow: "0px 0px 10px #00ffa1", // Brilho sutil, sem transição suave
        }
    };

    if (!isVisible) return null;

    return (
        <div className={`${className}`}>
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
