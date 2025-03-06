"use client";

interface NeonCirclesProps {
    className?: string;
}

const NeonCircles: React.FC<NeonCirclesProps> = ({ className = "" }) => {
    return (
        <div className={`absolute w-full h-screen overflow-hidden ${className}`}>
            <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] border-[4px] rounded-full opacity-80 neon-border"
                style={{
                    top: "90vh",
                }}
            ></div>
            <style jsx>{`
                .neon-border {
                    border-color: #00ffa1;
                    box-shadow: 
                        0 0 20px #00ffa1, 
                        0 0 40px rgba(0, 255, 161, 0.7), 
                        inset 0 0 15px rgba(0, 255, 161, 0.8);
                    filter: drop-shadow(0 0 25px rgba(0, 255, 161, 1));
                }
            `}</style>
        </div>
    );
};

export default NeonCircles;
