import React from "react";

interface CyberButtonProps {
    text: string;
    href?: string;
    className?: string;
}

const CyberButton: React.FC<CyberButtonProps> = ({ text, href = "#", className = "" }) => {
    return (
        <button className="ui-btn">
            <span className="!font-light">
                Login Camel
                <span className="text-techGreen drop-shadow-[0_0_10px_#00ffa1]">
                    Team
                </span>
            </span>
        </button>
    );
};

export default CyberButton;
