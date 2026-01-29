import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import banner from "../../assets/home/banner_1.svg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { BannerSkeleton } from "../common/loading-skeletons";

export default function Banner({ banners, loading }) {
  if (loading) return <BannerSkeleton />;
  const hasApiBanners = banners && banners.length > 0;
  const swiperRef = useRef();

  return (
    <section className="w-full relative group">
      <div className="w-full relative">
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
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={hasApiBanners}
          className="w-full h-[180px] sm:h-[250px] md:h-[500px] lg:h-[600px] xl:h-[750px] overflow-hidden"
        >
          {hasApiBanners ? (
            banners.map((b, index) => (
              <SwiperSlide key={b.id || index}>
                <img
                  src={b.image}
                  alt={b.collectionTitle || `Banner ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="w-full h-full bg-linear-to-br from-[#501F08] to-[#8b3b14] flex items-center justify-center p-12 text-center text-white relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

                <div className="relative z-10 flex flex-col items-center">
                  <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-[0.2em] uppercase">BR Nails</h2>
                  <div className="w-24 h-1 bg-white mx-auto rounded-full mb-6"></div>
                  <p className="text-lg md:text-2xl font-light italic opacity-90">Curating our latest masterpieces for you...</p>
                </div>
              </div>
            </SwiperSlide>
          )}
        </Swiper>

        {hasApiBanners && (
          <>
            <button
              className="swiper-button-prev absolute left-10! top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#f6e6d6] hover:bg-[#f6e6d6] text-[#501f08] rounded-full hidden md:flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
              aria-label="Previous slide"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeft className="w-6 h-6 pr-0.5 text-[#501f08]" />
            </button>

            <button
              className="swiper-button-next absolute right-10! top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#f6e6d6] hover:bg-[#f6e6d6] text-[#501f08] rounded-full hidden md:flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
              aria-label="Next slide"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronRight className="w-6 h-6 pl-0.5 text-[#501f08]" />
            </button>
          </>
        )}
      </div>
    </section>
  );
}

