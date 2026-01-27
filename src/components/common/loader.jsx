import React from "react";

const Loader = ({ fullPage = false }) => {
    const loaderContent = (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative w-16 h-16">
                {/* Outer Ring */}
                <div className="absolute inset-0 border-4 border-[#501F08]/10 rounded-full"></div>
                {/* Spinning Ring */}
                <div className="absolute inset-0 border-4 border-t-[#501F08] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                {/* Inner Pulsing Circle */}
                <div className="absolute inset-4 bg-[#A87453]/20 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col items-center">
                <p className="text-[10px] font-black text-[#501F08] uppercase tracking-[0.2em] animate-pulse">
                    Loading Masterpieces
                </p>
                <div className="h-0.5 w-8 bg-[#501F08]/20 mt-1 overflow-hidden">
                    <div className="h-full bg-[#501F08] animate-[loading-bar_1.5s_infinite_linear]"></div>
                </div>
            </div>
        </div>
    );

    if (fullPage) {
        return (
            <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
                {loaderContent}
            </div>
        );
    }

    return (
        <div className="py-20 flex items-center justify-center w-full">
            {loaderContent}
        </div>
    );
};

export default Loader;
