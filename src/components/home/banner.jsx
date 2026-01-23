import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import banner from "../../assets/home/banner_1.svg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { BannerSkeleton } from "../common/Skeleton";

export default function Banner({ banners, loading }) {
  if (loading) return <BannerSkeleton />;
  const staticSlides = [banner, banner, banner];

  // Use API banners if available and not empty, otherwise fallback
  const hasApiBanners = banners && banners.length > 0;

  const swiperRef = useRef();

  // If Loading and no banners yet? Maybe show skeleton or just static? 
  // Let's stick to valid data. 

  return (
    <section className="w-full relative group">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full max-h-200"
      >
        {hasApiBanners ? (
          banners.map((b, index) => (
            <SwiperSlide key={b.id || index}>
              <img
                src={b.image}
                alt={b.collectionTitle || `Banner ${index + 1}`}
                className="w-full h-100 md:h-150 lg:h-200 object-cover"
              />
            </SwiperSlide>
          ))
        ) : (
          staticSlides.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Banner ${index + 1}`}
                className="w-full h-100 md:h-150 lg:h-200 object-cover"
              />
            </SwiperSlide>
          ))
        )}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        className="swiper-button-prev absolute left-6! top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-[#f6e6d6] hover:bg-[#f6e6d6] text-[#501f08] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#501f08] pr-1" />
      </button>

      <button
        className="swiper-button-next absolute right-6! top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-[#f6e6d6] hover:bg-[#f6e6d6] text-[#501f08] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[#501f08] pl-1" />
      </button>

      {/* Text Overlay - Bottom Left */}
      <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 z-10 text-left"></div>
    </section>
  );
}
