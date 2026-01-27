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

  // Fallback data if needed
  const videoReels = [
    // ... keep existing static data if desired for fallback, or defined outside
    { id: 1, thumbnail: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1974&auto=format&fit=crop" },
    { id: 2, thumbnail: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1974&auto=format&fit=crop" },
    { id: 3, thumbnail: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1974&auto=format&fit=crop" },
  ];

  // Pause auto play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section className="bg-background py-10 md:py-12 relative overflow-hidden">
      <div className="mx-auto px-6 md:px-12 lg:px-24 relative">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-[32px] text-[#501F08] mb-1 font-bold leading-13">
            Reels of Perfection
          </h2>
          <div className="w-72 h-1.5 bg-linear-to-r from-accent via-primary to-accent mx-auto rounded-full"></div>
        </div>

        {/* Swiper Container */}
        <div
          className="relative group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {loading ? (
            <ReelSkeleton count={4} />
          ) : (
            <Swiper
              ref={swiperRef}
              modules={[Navigation, Pagination, EffectCoverflow]}
              spaceBetween={16}
              slidesPerView={1.1}
              centeredSlides={true}
              loop={true}
              Autoplay
              speed={800} // Smooth transition speed
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
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 28,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 32,
                },
              }}
              className="pb-16!"
              effect="coverflow"
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                slideShadows: false,
              }}
            >
              {/* Map API reels */}
              {reels && reels.length > 0 ? (
                reels.map((reel, index) => (
                  <SwiperSlide key={`${reel.id}-${index}`}>
                    <div className="relative rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ease-out group cursor-pointer h-[650px]">
                      {/* Video with Autoplay */}
                      <div className="relative w-full h-full">
                        <video
                          src={reel.reel}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/60 opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                // Fallback static (if needed, or just empty)
                videoReels.map((reel, index) => (
                  <SwiperSlide key={`${reel.id}-${index}`}>
                    {/* Keep existing fallback structure or update to video? Let's keep it simple or hide if no data */}
                    <div className="relative rounded-2xl overflow-hidden shadow-lg h-[500px]">
                      <img src={reel.thumbnail} className="w-full h-full object-cover" alt={reel.title} />
                    </div>
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          )}

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
        </div>
      </div>

      {/* Custom pagination bullets styling */}
      <style jsx global>{`
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
