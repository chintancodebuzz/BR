import React, { useState } from "react";
import col1 from "../../assets/home/collection_1.svg";
import col2 from "../../assets/home/collection_2.svg";
import col3 from "../../assets/home/collection_3.svg";
import { CollectionSkeleton } from "../common/Skeleton";

const Collection = ({ collections: apiCollections, loading }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const staticCollections = [
    {
      img: col1,
      name: "French Tips",
      count: "24 Designs",
      category: "Classic",
    },
    { img: col2, name: "Glitter Glam", count: "18 Designs", category: "Party" },
    { img: col3, name: "Minimalist", count: "32 Designs", category: "Elegant" },
    { img: col1, name: "Floral Art", count: "15 Designs", category: "Spring" },
    { img: col2, name: "Geometric", count: "21 Designs", category: "Modern" },
    { img: col3, name: "Matte Finish", count: "28 Designs", category: "Chic" },
    { img: col1, name: "Ombre Blend", count: "19 Designs", category: "Trendy" },
    { img: col2, name: "Bridal", count: "12 Designs", category: "Wedding" },
  ];

  const collections =
    apiCollections && apiCollections.length > 0
      ? apiCollections.map((c) => ({
        img: c.image,
        name: c.title,
        count: "20+ Designs", // Placeholder as API doesn't have count
        category: "Exclusive", // Placeholder
      }))
      : staticCollections;

  return (
    <section className="mx-auto px-6 md:px-12 lg:px-24 py-14">
      <h2 className="text-[32px] text-[#501F08] text-center mb-1 font-bold leading-13">
        Nail Art Collection
      </h2>
      <div className="w-72 h-1.5 bg-linear-to-r from-accent via-primary to-accent mx-auto rounded-full mb-12"></div>

      {loading ? (
        <CollectionSkeleton count={8} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {collections.map((collection, i) => (
            <div
              key={i}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
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
                  className={`absolute bottom-0 left-2 right-2 h-0.5 bg-linear-to-r from-transparent via-white to-transparent transform transition-all duration-500 ease-out delay-200 ${hoveredIndex === i
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