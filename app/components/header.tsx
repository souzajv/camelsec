"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/app/components/button";

interface HeaderProps {
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = "" }) => {
    return (
        <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className={`${className}`}>
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
