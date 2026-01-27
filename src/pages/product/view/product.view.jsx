import React from "react";
import { Grid, List, Filter, ChevronRight, Loader2 } from "lucide-react";
import ProductCard from "../../../components/product/ProductCard";
import { ProductSkeleton } from "../../../components/common/loading-skeletons";

const ProductView = ({
    isFilterOpen,
    setIsFilterOpen,
    products,
    loading,
    error,
    viewMode,
    categories,
    priceRanges,
    handleViewModeChange,
    navigate,
    lastProductElementRef,
    hasMore
}) => {
    return (
        <div className="min-h-screen bg-[#FDFDFD]">
            {/* Header Section */}
            <div className="bg-[#FAF7F5] py-12">
                <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#A87453] uppercase mb-4">
                        <span className="hover:text-[#501F08] cursor-pointer" onClick={() => navigate('/')}>Home</span>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-[#501F08]">Shop</span>
                    </div>
                    <h1 className="text-4xl font-black text-[#501F08] uppercase ">Our Collection</h1>
                </div>
            </div>

            <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12">
                <div className="flex gap-12">
                    {/* Filter Sidebar */}
                    <div className={`w-64 shrink-0 hidden lg:block transition-all duration-300 ${isFilterOpen ? 'opacity-100' : 'opacity-0 -ml-64 pointer-events-none'}`}>
                        <div className="space-y-10 sticky top-32">
                            {/* Category Filter */}
                            <div>
                                <h3 className="text-sm font-black text-[#501F08] uppercase mb-6 border-b border-[#501F08]/10 pb-4">Categories</h3>
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
                                <h3 className="text-sm font-black text-[#501F08] uppercase mb-6 border-b border-[#501F08]/10 pb-4">Price Range</h3>
                                <div className="space-y-4">
                                    {priceRanges.map((range, i) => (
                                        <label key={i} className="flex items-center gap-3 group cursor-pointer">
                                            <div className="w-4 h-4 border border-gray-300 rounded-full group-hover:border-[#501F08] transition-colors"></div>
                                            <span className="text-sm text-gray-600 group-hover:text-[#501F08]">{range}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-[#FAF7F5] p-6 rounded-2xl border border-[#501F08]/5">
                                <p className="text-[10px] font-bold text-[#A87453] uppercase mb-2">Professional Grade</p>
                                <p className="text-sm font-bold text-[#501F08] leading-tight mb-4">Experience Salon Quality at Home</p>
                                <div className="h-0.5 w-12 bg-[#501F08]"></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-6 bg-white p-4 rounded-2xl border border-gray-50 shadow-sm">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className="hidden lg:flex items-center gap-2 text-xs font-bold text-[#501F08] uppercase px-4 py-2 bg-[#FAF7F5] rounded-xl hover:bg-[#501F08] hover:text-white transition-all"
                                >
                                    <Filter className="w-4 h-4" />
                                    {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
                                </button>
                                <p className="text-[10px] font-bold text-gray-400 uppercase">
                                    Showing <span className="text-[#501F08]">{products.length}</span> Masterpieces
                                </p>
                            </div>

                            <div className="flex items-center gap-1 bg-[#FAF7F5] p-1 rounded-xl">
                                <button
                                    onClick={() => handleViewModeChange('grid')}
                                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-[#501F08] text-white' : 'text-gray-400 hover:text-[#501F08]'}`}
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleViewModeChange('list')}
                                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-[#501F08] text-white' : 'text-gray-400 hover:text-[#501F08]'}`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Product Grid Area */}
                        <div className="min-h-[400px]">
                            {error ? (
                                <div className="text-center py-20 bg-[#FDFDFD] rounded-3xl border border-dashed border-gray-200">
                                    <p className="text-red-800 font-bold mb-4 italic">"{error}"</p>
                                    <button onClick={() => window.location.reload()} className="px-6 py-2 bg-[#501F08] text-white rounded-lg font-bold text-[10px] uppercase">Retry</button>
                                </div>
                            ) : products.length === 0 && loading ? (
                                <div className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-6'}>
                                    <ProductSkeleton count={8} viewMode={viewMode} />
                                </div>
                            ) : products.length === 0 && !loading ? (
                                <div className="text-center py-32">
                                    <p className="text-gray-400 italic">No products found in this masterpiece collection.</p>
                                </div>
                            ) : (
                                <>
                                    <div className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10' : 'space-y-6'}>
                                        {products.map((product, index) => {
                                            if (products.length === index + 1) {
                                                return (
                                                    <div ref={lastProductElementRef} key={product.id || product._id}>
                                                        <ProductCard
                                                            product={product}
                                                            viewMode={viewMode}
                                                        />
                                                    </div>
                                                );
                                            } else {
                                                return (
                                                    <ProductCard
                                                        key={product.id || product._id}
                                                        product={product}
                                                        viewMode={viewMode}
                                                    />
                                                );
                                            }
                                        })}

                                        {/* Loading More Skeletons */}
                                        {loading && (
                                            <ProductSkeleton count={4} viewMode={viewMode} />
                                        )}
                                    </div>

                                    {!hasMore && products.length > 0 && (
                                        <div className="text-center py-10 mt-10 border-t border-gray-50">
                                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">You've reached the end of our collection</p>
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
};

export default ProductView;

