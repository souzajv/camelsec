"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Button from "@/app/components/button";

interface HeaderProps {
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = "" }) => {
    useEffect(() => {
        document.body.classList.add("overflow-hidden", "h-screen", "max-h-screen");

        return () => {
            document.body.classList.remove("overflow-hidden", "h-screen", "max-h-screen");
        };
    }, []);

    const navItems = ["Vantagens", "Pilares", "Funcionalidades", "Números", "Módulos", "Porque nós"];

    return (
        <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className={`fixed top-0 left-0 w-full flex items-center justify-between px-8 py-2 bg-[#2a322f]/50 shadow-2xl z-50 border border-gray-700/30 ${className}`}>
            <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="text-gray-400 text-sm">LOGO</span>
                </div>
            </div>
            <nav className="hidden md:flex space-x-8 text-white text-sm font-medium">
                {navItems.map((word, index) => (
                    <Link
                        key={index}
                        href={`#${word.toLowerCase().replace(" ", "-")}`}
                        className="uppercase transition-all duration-300 hover:text-techGreen hover:drop-shadow-[0_0_10px_#00ffa1]"
                    >
                        {word}
                    </Link>
                ))}
            </nav>
            <Link href="/login">
                <Button
                    href="#"
                    text="Login CamelTeam"
                >
                </Button>
            </Link>
        </motion.header>
    );
};

export default Header;
