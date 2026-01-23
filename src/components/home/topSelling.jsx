import React, { useState } from "react";
import col1 from "../../assets/home/collection_1.svg";
import col2 from "../../assets/home/collection_2.svg";
import col3 from "../../assets/home/collection_3.svg";
import { Link, useNavigate } from "react-router-dom";
import { ProductSkeleton } from "../common/Skeleton";

const TopSelling = ({ products: apiProducts, loading }) => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Product data with names and prices
  const staticProducts = [
    {
      img: col1,
      name: "Crystal Glaze Polish",
      price: "₹24.99",
      originalPrice: "₹34.99",
    },
    {
      img: col2,
      name: "Matte Velvet Finish",
      price: "₹19.99",
      originalPrice: "₹29.99",
    },
    {
      img: col3,
      name: "Neon Glow Collection",
      price: "₹29.99",
      originalPrice: "₹39.99",
    },
    {
      img: col1,
      name: "Gel Couture Set",
      price: "₹39.99",
      originalPrice: "₹49.99",
    },
    {
      img: col2,
      name: "Pearl Shimmer",
      price: "₹22.99",
      originalPrice: "₹32.99",
    },
    {
      img: col3,
      name: "Metallic Chrome",
      price: "₹26.99",
      originalPrice: "₹36.99",
    },
  ];

  const products =
    apiProducts && apiProducts.length > 0
      ? apiProducts.map((p) => ({
        id: p.id || p._id,
        img: p.images && p.images.length > 0 ? p.images[0] : col1,
        name: p.name,
        price: `₹${p.selling_price}`,
        originalPrice: `₹${p.origional_price}`,
      }))
      : staticProducts;

  return (
    <section className="mx-auto px-6 md:px-12 lg:px-24 py-14 bg-[#f5f3f2]">
      <h2 className="text-[32px] text-[#501F08] text-center mb-1 font-bold leading-13">
        Top Selling
      </h2>
      <div className="w-52 h-1.5 bg-linear-to-r from-accent via-primary to-accent mx-auto rounded-full mb-12"></div>

      {loading ? (
        <ProductSkeleton count={6} />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          {products.slice(0, 6).map((product, i) => (
            <div
              key={product.id || i}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => product.id && navigate(`/products/${product.id}`)}
            >
              {/* Main Image Container - UPDATED */}
              <div className="relative rounded-2xl overflow-hidden transition-all duration-300 transform group-hover:scale-[1.03] mb-4">
                {/* Image Container with Fixed Aspect Ratio */}
                <div className="relative w-full pt-[100%]">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Product Name and Price */}
              <div className="space-y-2">
                {/* Product Name */}
                <h3 className="text-lg font-semibold text-[#333333] line-clamp-1 group-hover:text-[#501F08] transition-colors duration-300">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-[#501F08]">
                    {product.price}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {product.originalPrice}
                  </span>
                </div>
              </div>

              {/* Border Animation - Adjusted for image container */}
              <div
                className={`absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 ${hoveredIndex === i ? "border-[#501F08] scale-105" : "scale-100"
                  }`}
              >
                <div
                  className={`absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-white rounded-tl-lg transition-all duration-300 ${hoveredIndex === i ? "opacity-100" : "opacity-0"
                    }`}
                ></div>
                <div
                  className={`absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-white rounded-tr-lg transition-all duration-300 ${hoveredIndex === i ? "opacity-100" : "opacity-0"
                    }`}
                ></div>
                <div
                  className={`absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-white rounded-bl-lg transition-all duration-300 ${hoveredIndex === i ? "opacity-100" : "opacity-0"
                    }`}
                ></div>
                <div
                  className={`absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-white rounded-br-lg transition-all duration-300 ${hoveredIndex === i ? "opacity-100" : "opacity-0"
                    }`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center items-center mt-14">
        <Link
          to="/products"
          className="relative group px-8 py-2 overflow-hidden rounded-md bg-transparent border-2 border-[#501F08] text-[#501F08] font-semibold transition-all duration-300 hover:text-white"
        >
          <span className="relative z-10">VIEW MORE</span>
          <div className="absolute inset-0 bg-[#501F08] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
        </Link>
      </div>
    </section>
  );
};

export default TopSelling;