import { useEffect, useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchProducts, setViewMode, setCurrentPage, clearFilters } from "../../../slices/productSlice";
import ProductView from "../view/product.view";

const ProductContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const observer = useRef();

    const [searchParams] = useSearchParams();
    const collectionId = searchParams.get("collectionId");

    const {
        products,
        loading,
        error,
        viewMode,
        currentPage,
        itemsPerPage,
        totalItems
    } = useSelector((state) => state.product);

    // Initial Fetch & collectionId Change
    useEffect(() => {
        dispatch(fetchProducts({
            page: 1,
            limit: itemsPerPage,
            collectionId: collectionId || undefined
        }));
    }, [dispatch, collectionId]);

    // Handle Infinite Scroll
    const loadMoreProducts = useCallback(() => {
        if (!loading && products.length < totalItems) {
            const nextPage = currentPage + 1;
            dispatch(setCurrentPage(nextPage));
            dispatch(fetchProducts({
                page: nextPage,
                limit: itemsPerPage,
                collectionId: collectionId || undefined
            }));
        }
    }, [dispatch, loading, products.length, totalItems, currentPage, collectionId]);

    const lastProductElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && products.length < totalItems) {
                loadMoreProducts();
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, loadMoreProducts, products.length, totalItems]);

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

    const handleViewModeChange = (mode) => {
        dispatch(setViewMode(mode));
    };

    return (
        <ProductView
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
            products={products}
            loading={loading}
            error={error}
            viewMode={viewMode}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            categories={categories}
            priceRanges={priceRanges}
            handleViewModeChange={handleViewModeChange}
            navigate={navigate}
            lastProductElementRef={lastProductElementRef}
            hasMore={products.length < totalItems}
        />
    );
};

export default ProductContainer;
