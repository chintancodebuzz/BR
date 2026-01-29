import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductSkeleton } from "../common/loading-skeletons";
import { Sparkles } from "lucide-react";

const TopSelling = ({ products: apiProducts, loading }) => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const products =
    apiProducts && apiProducts.length > 0
      ? apiProducts.map((p) => ({
        id: p.id || p._id,
        img: p.images && p.images.length > 0 ? p.images[0] : "",
        name: p.name,
        collection: p.category?.name || p.collection_name || "Premium Collection",
        price: `₹${p.selling_price}`,
        originalPrice: `₹${p.origional_price}`,
      }))
      : [];

  return (
    <section className="mx-auto px-4 md:px-12 lg:px-24 py-10 md:py-14 bg-[#f5f3f2]">
      <h2 className="text-[32px] text-[#501F08] text-center mb-1 font-bold leading-13">
        Top Selling
      </h2>
      <div className="w-52 h-1 bg-linear-to-r from-accent via-primary to-accent mx-auto rounded-full mb-12"></div>

      {loading ? (
        <ProductSkeleton count={6} />
      ) : products.length === 0 ? (
        <div className="text-center py-16 px-6 bg-white/50 backdrop-blur-sm rounded-[40px] border border-white/50 shadow-sm max-w-2xl mx-auto flex flex-col items-center relative overflow-hidden">
          <div className="w-20 h-20 bg-[#501F08]/5 rounded-full flex items-center justify-center mb-6">
            <Sparkles className="w-10 h-10 text-[#501F08] opacity-30" />
          </div>
          <h3 className="text-xl md:text-2xl font-black text-[#501F08] mb-2 tracking-tight uppercase">Coming Soon</h3>
          <p className="text-gray-500 text-sm italic">Our top favorite masterpieces will be appearing here very soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {products.slice(0, 5).map((product, i) => (
            <div
              key={product.id || i}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col h-full border border-gray-100/50"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => product.id && navigate(`/products/${product.id}`)}
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-[#f9f9f9]">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Product Info */}
              <div className="px-6 pt-4 pb-5 flex flex-col grow">
                {/* Collection Name */}
                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-1">
                  {product.collection || "Premium Collection"}
                </span>

                {/* Product Name */}
                <h3 className="text-lg font-bold text-[#333333] mb-2 line-clamp-2 leading-tight group-hover:text-[#501F08] transition-colors duration-300">
                  {product.name}
                </h3>

                {/* Price and Action Section */}
                <div className="mt-auto border-t border-gray-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xl font-black text-[#501F08]">
                      {product.price}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      {product.originalPrice}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {products.length > 0 && (
        <div className="flex justify-center items-center mt-14">
          <Link
            to="/products"
            className="relative group px-8 py-2 overflow-hidden rounded-md bg-transparent border-2 border-[#501F08] text-[#501F08] font-semibold transition-all duration-300 hover:text-white"
          >
            <span className="relative z-10">VIEW MORE</span>
            <div className="absolute inset-0 bg-[#501F08] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </Link>
        </div>
      )}
    </section>
  );
};

export default TopSelling;

