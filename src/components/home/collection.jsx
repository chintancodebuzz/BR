import React, { useState } from "react";
import { CollectionSkeleton } from "../common/loading-skeletons";
import { useNavigate } from "react-router-dom";
import { SearchX } from "lucide-react";

const Collection = ({ collections: apiCollections, loading }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const collections =
    apiCollections && apiCollections.length > 0
      ? apiCollections.map((c) => ({
        id: c._id || c.id,
        img: c.image,
        name: c.title,
        count: c.productsCount + " Designs",
        category: c.category,
      }))
      : [];

  return (
    <section className="mx-auto px-4 md:px-12 lg:px-24 py-10 md:py-14">
      <h2 className="text-[32px] text-[#501F08] text-center mb-1 font-bold leading-13">
        Nail Art Collection
      </h2>
      <div className="w-72 h-1 bg-linear-to-r from-accent via-primary to-accent mx-auto rounded-full mb-12"></div>

      {loading ? (
        <CollectionSkeleton count={8} />
      ) : collections.length === 0 ? (
        <div className="text-center py-16 px-6 bg-white rounded-[40px] border border-gray-100 shadow-xl max-w-2xl mx-auto flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#501F08]/5 rounded-full -mr-24 -mt-24 blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#A87453]/5 rounded-full -ml-24 -mb-24 blur-3xl opacity-50" />

          <div className="w-20 h-20 bg-[#501F08]/5 rounded-full flex items-center justify-center mb-6 relative z-10">
            <SearchX className="w-10 h-10 text-[#501F08] opacity-40" />
          </div>
          <h3 className="text-xl md:text-2xl font-black text-[#501F08] mb-2 tracking-tight relative z-10 uppercase">No Collections Found</h3>
          <p className="text-gray-500 text-sm italic relative z-10">Check back later for our upcoming curated masterpieces.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {collections.map((collection, i) => (
            <div
              key={i}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => navigate(`/products?collectionId=${collection.id}`)}
            >
              {/* Main Image Container - UPDATED FOR PERFECT SQUARE */}
              <div className="relative rounded-xl overflow-hidden transition-all duration-500 ease-out transform group-hover:scale-[1.02]">
                {/* Perfect Square Container */}
                <div className="relative w-full pt-[100%]">
                  {/* Image with gradient overlay */}
                  <img
                    src={collection.img}
                    alt={collection.name}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Hover Content - Centered in the square */}
                <div className="absolute inset-0 flex flex-col justify-center items-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  {/* Collection Name */}
                  <h3 className="text-white text-2xl font-bold mb-2 text-center drop-shadow-lg">
                    {collection.name}
                  </h3>

                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="w-8 h-0.5 bg-white/60"></div>
                    <span className="text-white/90 text-sm font-medium">
                      {collection.count}
                    </span>
                    <div className="w-8 h-0.5 bg-white/60"></div>
                  </div>

                  <button className="mt-4 bg-white/20 backdrop-blur-sm border border-white/40 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    View Collection
                  </button>
                </div>
              </div>

              {/* Border Animation */}
              <div className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden">
                <div
                  className={`absolute top-2 left-2 right-0 h-0.5 bg-linear-to-r from-transparent via-white to-transparent transform transition-all duration-500 ease-out ${hoveredIndex === i
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-full"
                    }`}
                ></div>

                <div
                  className={`absolute top-0 right-2 bottom-2 w-0.5 bg-linear-to-b from-transparent via-white to-transparent transform transition-all duration-500 ease-out delay-100 ${hoveredIndex === i
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-full"
                    }`}
                ></div>

                <div
                  className={`absolute bottom-2 left-2 right-2 h-0.5 bg-linear-to-r from-transparent via-white to-transparent transform transition-all duration-500 ease-out delay-200 ${hoveredIndex === i
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-full"
                    }`}
                ></div>

                <div
                  className={`absolute top-2 left-2 bottom-2 w-0.5 bg-linear-to-b from-transparent via-white to-transparent transform transition-all duration-500 ease-out delay-300 ${hoveredIndex === i
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-full"
                    }`}
                ></div>

                <div
                  className={`absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white transition-all duration-300 ${hoveredIndex === i ? "opacity-100" : "opacity-0"
                    }`}
                ></div>
                <div
                  className={`absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white transition-all duration-300 ${hoveredIndex === i ? "opacity-100" : "opacity-0"
                    }`}
                ></div>
                <div
                  className={`absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-white transition-all duration-300 ${hoveredIndex === i ? "opacity-100" : "opacity-0"
                    }`}
                ></div>
                <div
                  className={`absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white transition-all duration-300 ${hoveredIndex === i ? "opacity-100" : "opacity-0"
                    }`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Collection;
