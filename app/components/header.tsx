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


    return (
        <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className={`fixed top-0 left-0 w-full flex items-center justify-between px-8 py-2 bg-[#2a322f]/50 shadow-2xl z-50 border border-gray-700/30 ${className}`}>
            <div className="flex items-center">
                <div className="flex items-center justify-center gap-1">
                    <img src="images/logo.svg" alt="logo da CamelSec" className="size-5" />
                    <span className="text-white text-xl">Camel<span className="text-techGreen title-neon">Sec</span></span>
                </div>
            </div>
            <nav className="hidden md:flex space-x-8 text-sm font-medium">
                <Link
                    href="#"
                    className="ui-nav subtile-neon text-white hover:text-techGreen duration-500"
                >
                    <span>Vantagens</span>
                </Link>
                <Link
                    href="#"
                    className="ui-nav subtile-neon text-white hover:text-techGreen duration-500"
                >
                    <span>Pilares</span>
                </Link>
                <Link
                    href="#"
                    className="ui-nav subtile-neon text-white hover:text-techGreen duration-500"
                >
                    <span>Funcionalidades</span>
                </Link>
                <Link
                    href="#"
                    className="ui-nav subtile-neon text-white hover:text-techGreen duration-500"
                >
                    <span>Números</span>
                </Link>
                <Link
                    href="#"
                    className="ui-nav subtile-neon text-white hover:text-techGreen duration-500"
                >
                    <span>Módulos</span>
                </Link>
                <Link
                    href="#"
                    className="ui-nav subtile-neon text-white hover:text-techGreen duration-500"
                >
                    <span>Porque-nós</span>
                </Link>
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
