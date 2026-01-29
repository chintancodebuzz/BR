import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Sparkles, AlertCircle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#501F08]/5 rounded-full blur-3xl -mr-64 -mt-64 animate-pulse"></div>
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#9e5d61]/5 rounded-full blur-3xl -ml-64 -mb-64 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-3xl w-full text-center relative z-10">
        {/* Animated 404 Number */}
        <div className="relative inline-block mb-8">
          <h1 className="text-[150px] md:text-[220px] font-black leading-none text-transparent bg-clip-text bg-linear-to-b from-[#501F08] via-[#9e5d61] to-[#501F08] opacity-10 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full shadow-2xl flex items-center justify-center border border-gray-100/50 animate-float">
                <AlertCircle className="w-16 h-16 md:w-20 md:h-20 text-[#501F08] opacity-20" />
              </div>
              <Sparkles className="absolute -top-4 -right-4 text-[#9e5d61] animate-bounce" />
              <Sparkles className="absolute -bottom-2 -left-6 text-[#501F08]/40 animate-pulse scale-75" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* <h2 className="text-3xl md:text-5xl font-black text-[#501F08] tracking-tight uppercase">
                        A Missing <span className="text-[#9e5d61]">Masterpiece</span>
                    </h2> */}
          <div className="w-24 h-1.5 bg-linear-to-r from-[#501F08] to-[#9e5d61] mx-auto rounded-full"></div>
          <p className="text-lg md:text-xl text-gray-500 max-w-lg mx-auto font-medium leading-relaxed italic">
            "Even the most perfect set occasionally loses its way. This page has
            been filed down to nothingness."
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link
              to="/"
              className="group relative px-8 py-4 bg-[#501F08] text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-[#501F08]/20 hover:shadow-[#501F08]/40 transition-all hover:-translate-y-1 flex items-center gap-3 w-full sm:w-auto"
            >
              <Home className="w-4 h-4" />
              Return Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="group px-8 py-4 bg-white text-[#501F08] border-2 border-[#501F08]/10 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-[#501F08]/5 transition-all flex items-center gap-3 w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
          </div>
        </div>

        {/* Brand Footer */}
        <div className="mt-20 opacity-30">
          <p className="font-bold tracking-[0.3em] text-[#501F08] text-sm uppercase">
            BR Nails Academy & Studio
          </p>
        </div>
      </div>

      <style jsx="true">{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
