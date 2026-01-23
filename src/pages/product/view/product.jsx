import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, List, Filter, ChevronRight } from "lucide-react";
import { fetchProducts, setViewMode } from "../../../slices/productSlice";
import ProductCard from "../../../components/product/ProductCard";
import Pagination from "../../../components/product/Pagination";
import { ProductSkeleton } from "../../../components/common/Skeleton";

export default function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const {
    products,
    loading,
    error,
    viewMode,
    currentPage,
    itemsPerPage,
  } = useSelector((state) => state.product);

  // Fetch data
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Static Categories for Sidebar
  const categories = [
    { name: 'All Products', count: products.length },
    { name: 'Gel Polish', count: 12 },
    { name: 'Nail Art', count: 8 },
    { name: 'Accessories', count: 15 },
    { name: 'Kits', count: 5 },
  ];

  const priceRanges = [
    "Under ₹500",
    "₹500 - ₹1000",
    "₹1000 - ₹2000",
    "₹2000 & Above"
  ];

  // Pagination logic
  const displayProducts = [...products];
  const totalPages = Math.ceil(displayProducts.length / itemsPerPage);
  const paginatedProducts = displayProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* Header Section */}
      <div className="bg-[#FAF7F5] py-12">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-2 text-xs font-bold text-[#A87453] uppercase tracking-widest mb-4">
            <span className="hover:text-[#501F08] cursor-pointer" onClick={() => navigate('/')}>Home</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#501F08]">Shop</span>
          </div>
          <h1 className="text-4xl font-black text-[#501F08] uppercase tracking-tight">Our Collection</h1>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12">
        <div className="flex gap-12">
          {/* Static Filter Sidebar */}
          <div className={`w-64 shrink-0 hidden lg:block transition-all duration-300 ${isFilterOpen ? 'opacity-100' : 'opacity-0 -ml-64 pointer-events-none'}`}>
            <div className="space-y-10 sticky top-32">
              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-black text-[#501F08] uppercase tracking-[0.2em] mb-6 border-b border-[#501F08]/10 pb-4">Categories</h3>
                <div className="space-y-4">
                  {categories.map((cat, i) => (
                    <label key={i} className="flex items-center justify-between group cursor-pointer hover:text-[#501F08] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 border border-gray-300 rounded-sm group-hover:border-[#501F08] transition-colors"></div>
                        <span className="text-sm text-gray-600 group-hover:text-[#501F08]">{cat.name}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold">({cat.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="text-sm font-black text-[#501F08] uppercase tracking-[0.2em] mb-6 border-b border-[#501F08]/10 pb-4">Price Range</h3>
                <div className="space-y-4">
                  {priceRanges.map((range, i) => (
                    <label key={i} className="flex items-center gap-3 group cursor-pointer">
                      <div className="w-4 h-4 border border-gray-300 rounded-full group-hover:border-[#501F08] transition-colors"></div>
                      <span className="text-sm text-gray-600 group-hover:text-[#501F08]">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Luxury Banner in Sidebar */}
              <div className="bg-[#FAF7F5] p-6 rounded-2xl border border-[#501F08]/5">
                <p className="text-[10px] font-bold text-[#A87453] uppercase tracking-widest mb-2">Professional Grade</p>
                <p className="text-sm font-bold text-[#501F08] leading-tight mb-4">Experience Salon Quality at Home</p>
                <div className="h-0.5 w-12 bg-[#501F08]"></div>
              </div>
            </div>
          </div>

          {/* Product Grid Area */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-6 bg-white p-4 rounded-2xl border border-gray-50 shadow-sm">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="hidden lg:flex items-center gap-2 text-xs font-bold text-[#501F08] uppercase tracking-widest px-4 py-2 bg-[#FAF7F5] rounded-xl hover:bg-[#501F08] hover:text-white transition-all"
                >
                  <Filter className="w-4 h-4" />
                  {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
                </button>
                <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                  Showing <span className="text-[#501F08]">{displayProducts.length}</span> Masterpieces
                </p>
              </div>

              <div className="flex items-center gap-1 bg-[#FAF7F5] p-1 rounded-xl">
                <button
                  onClick={() => dispatch(setViewMode('grid'))}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-[#501F08] text-white' : 'text-gray-400 hover:text-[#501F08]'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => dispatch(setViewMode('list'))}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-[#501F08] text-white' : 'text-gray-400 hover:text-[#501F08]'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* List/Grid Container */}
            <div className="min-h-[400px]">
              {loading ? (
                <div className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-6'}>
                  <ProductSkeleton count={8} />
                </div>
              ) : error ? (
                <div className="text-center py-20 bg-[#FDFDFD] rounded-3xl border border-dashed border-gray-200">
                  <p className="text-red-800 font-bold mb-4 italic">"{error}"</p>
                  <button onClick={() => dispatch(fetchProducts())} className="px-6 py-2 bg-[#501F08] text-white rounded-lg font-bold text-[10px] tracking-widest uppercase">Retry</button>
                </div>
              ) : paginatedProducts.length === 0 ? (
                <div className="text-center py-32">
                  <p className="text-gray-400 italic">No products found in this masterpiece collection.</p>
                </div>
              ) : (
                <>
                  <div className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10' : 'space-y-10'}>
                    {paginatedProducts.map((product) => (
                      <ProductCard
                        key={product.id || product._id}
                        product={product}
                        viewMode={viewMode}
                      />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-16 pt-10 border-t border-gray-100 flex justify-center">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
