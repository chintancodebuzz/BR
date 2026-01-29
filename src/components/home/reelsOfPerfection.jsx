"use client";

import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { ReelSkeleton } from "../common/loading-skeletons";

const ReelsOfPerfection = ({ reels, loading }) => {
  const swiperRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  // Pause auto play on hover
  // const handleMouseEnter = () => setIsAutoPlaying(false);
  // const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section className="bg-background py-10 md:py-12 relative overflow-hidden">
      <div className="mx-auto px-4 md:px-12 lg:px-24 relative">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-[32px] text-[#501F08] mb-1 font-bold leading-13">
            Reels of Perfection
          </h2>
          <div className="w-72 h-1 bg-linear-to-r from-accent via-primary to-accent mx-auto rounded-full"></div>
        </div>

        {/* Swiper Container */}
        <div
          className="relative group"
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
        >
          {loading ? (
            <ReelSkeleton count={4} />
          ) : !reels || reels.length === 0 ? (
            <div className="text-center py-12 px-6 bg-white/30 backdrop-blur-sm rounded-[40px] border border-gray-100/50 max-w-2xl mx-auto flex flex-col items-center">
              <div className="w-20 h-20 bg-[#501F08]/5 rounded-full flex items-center justify-center mb-6">
                <Play className="w-10 h-10 text-[#501F08] opacity-20 fill-[#501F08]" />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-[#501F08] mb-2 tracking-tight uppercase">
                New Stories Loading
              </h3>
              <p className="text-gray-500 text-sm italic">
                Our latest artistic reels are being prepared for your
                inspiration.
              </p>
            </div>
          ) : (
            <>
              <Swiper
                ref={swiperRef}
                modules={[Navigation, Pagination, EffectCoverflow]}
                spaceBetween={12}
                slidesPerView={1.4}
                centeredSlides={true}
                loop={true}
                autoplay
                speed={800}
                pagination={{
                  clickable: true,
                  bulletClass: "swiper-custom-bullet",
                  bulletActiveClass: "swiper-custom-bullet-active",
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                breakpoints={{
                  480: {
                    slidesPerView: 1.8,
                    spaceBetween: 16,
                  },
                  640: {
                    slidesPerView: 2.5,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 28,
                  },
                  1440: {
                    slidesPerView: 5,
                    spaceBetween: 32,
                  },
                }}
                className="pb-16!"
                effect="coverflow"
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 60,
                  modifier: 2,
                  slideShadows: false,
                }}
              >
                {reels.map((reel, index) => (
                  <SwiperSlide key={`${reel.id}-${index}`}>
                    <div className="relative rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ease-out group cursor-pointer aspect-9/16 w-full max-h-[700px] mx-auto">
                      <div className="relative w-full h-full">
                        <video
                          src={reel.reel}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/60 opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <button
                className="swiper-button-prev absolute -left-6! top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-[#f6e6d6] hover:bg-[#f6e6d6] text-[#501f08] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label="Previous slide"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#501f08] pr-1" />
              </button>

              <button
                className="swiper-button-next absolute -right-6! top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-[#f6e6d6] hover:bg-[#f6e6d6] text-[#501f08] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label="Next slide"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[#501f08] pl-1" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Custom pagination bullets styling */}
      <style jsx="true" global="true">{`
        .swiper-custom-bullet {
          width: 10px;
          height: 10px;
          background: rgba(80, 31, 8, 0.3);
          opacity: 0.5;
          border-radius: 50%;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          margin: 0 6px;
        }

        .swiper-custom-bullet-active {
          opacity: 1;
          background: #501f08;
          transform: scale(1.4);
          box-shadow: 0 0 12px rgba(80, 31, 8, 0.3);
        }

        .swiper-pagination {
          display: flex !important;
          justify-content: center;
          gap: 4px;
          padding-top: 24px;
        }

        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }

        @keyframes ping {
          75%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .animate-ping {
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default ReelsOfPerfection;
