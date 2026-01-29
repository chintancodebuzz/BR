import { X, ChevronDown } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  setSelectedCollection,
  setSelectedCategory,
  setPriceRange,
  setSortBy,
  clearFilters,
} from "../../slices/productSlice";

export default function ProductFilters({ onClose }) {
  const dispatch = useDispatch();
  const { collections } = useSelector((state) => state.home);
  const { selectedCollection, selectedCategory, priceRange, sortBy } =
    useSelector((state) => state.product);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = [
    "Nail Polish",
    "Nail Care",
    "Accessories",
    "Tools",
    "Kits",
  ];
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "popular", label: "Most Popular" },
  ];

  const selectedOption = sortOptions.find((opt) => opt.value === sortBy);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-36">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Filters</h3>
        <button
          onClick={() => dispatch(clearFilters())}
          className="text-sm text-[#501F08] hover:underline font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Sort By - Custom Dropdown */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Sort By</h4>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#501F08]/20 focus:border-[#501F08] transition-all outline-none bg-white text-left flex items-center justify-between hover:border-[#501F08]/50"
          >
            <span className="text-gray-700 font-medium">
              {selectedOption?.label}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-[#501F08] transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      dispatch(setSortBy(option.value));
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left transition-all ${
                      sortBy === option.value
                        ? "bg-[#501F08] text-white font-semibold"
                        : "text-gray-700 hover:bg-[#501F08]/5 hover:text-[#501F08]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Collections */}
      {collections && collections.length > 0 && (
        <div className="mb-6 pb-6 border-b border-gray-100">
          <h4 className="font-semibold text-gray-900 mb-3">Collections</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto filter-scrollbar">
            {collections.map((collection) => (
              <label
                key={collection._id || collection.id}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="collection"
                  checked={
                    selectedCollection === (collection.name || collection.title)
                  }
                  onChange={() =>
                    dispatch(
                      setSelectedCollection(
                        collection.name || collection.title,
                      ),
                    )
                  }
                  className="w-4 h-4 text-[#501F08] border-gray-300 focus:ring-[#501F08]"
                />
                <span className="text-gray-700 group-hover:text-[#501F08] transition-colors">
                  {collection.name || collection.title}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="mb-6 pb-6 border-b border-gray-100">
        <h4 className="font-semibold text-gray-900 mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategory === category}
                onChange={() =>
                  dispatch(
                    setSelectedCategory(
                      selectedCategory === category ? null : category,
                    ),
                  )
                }
                className="w-4 h-4 text-[#501F08] border-gray-300 rounded focus:ring-[#501F08]"
              />
              <span className="text-gray-700 group-hover:text-[#501F08] transition-colors">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Min Price: ₹{priceRange.min}
            </label>
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={priceRange.min}
              onChange={(e) =>
                dispatch(
                  setPriceRange({
                    ...priceRange,
                    min: parseInt(e.target.value),
                  }),
                )
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#501F08]"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Max Price: ₹{priceRange.max}
            </label>
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={priceRange.max}
              onChange={(e) =>
                dispatch(
                  setPriceRange({
                    ...priceRange,
                    max: parseInt(e.target.value),
                  }),
                )
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#501F08]"
            />
          </div>
          <div className="flex items-center justify-between text-sm font-medium text-[#501F08]">
            <span>₹{priceRange.min}</span>
            <span>-</span>
            <span>₹{priceRange.max}</span>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .filter-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .filter-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        select option {
          padding: 12px 16px;
          background-color: white;
          color: #374151;
          font-weight: 500;
        }

        select option:hover {
          background-color: #501f08;
          color: white;
        }

        select option:checked {
          background-color: #501f08;
          color: white;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
