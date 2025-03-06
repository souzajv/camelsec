import React from "react";

type StarBorderProps<T extends React.ElementType> =
    React.ComponentPropsWithoutRef<T> & {
        as?: T;
        className?: string;
        children?: React.ReactNode;
        color?: string;
        speed?: React.CSSProperties['animationDuration'];
    }

const StarBorder = <T extends React.ElementType = "button">({
    as,
    className = "",
    color = "#00ffa1", // techGreen super intenso
    speed = "2.5s", // Velocidade do efeito
    children,
    ...rest
}: StarBorderProps<T>) => {
    const Component = as || "button";

    return (
        <Component
            className={`relative inline-block py-[1px] overflow-hidden rounded-[20px] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_30px_#00ffa1] ${className}`}
            {...rest}
        >
            {/* Contorno com brilho contínuo */}
            <div className="absolute inset-0 rounded-[20px] border-[2px] border-transparent before:absolute before:inset-0 before:rounded-[20px] before:border-[2px] before:border-techGreen before:animate-moving-border"></div>

            {/* Botão principal */}
            <div className="relative z-1 bg-gradient-to-b from-black to-gray-900 border border-gray-800 text-white text-center text-[16px] py-[16px] px-[26px] rounded-[20px] hover:border-techGreen hover:text-techGreen">
                {children}
            </div>
        </Component>
    );
};

export default StarBorder;
