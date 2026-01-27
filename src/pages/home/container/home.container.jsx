import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchBanners,
    fetchCollections,
    fetchProducts,
    fetchReels,
    fetchHeadlines,
} from "../../../slices/homeSlice";
import HomeView from "../view/home.view";

const HomeContainer = () => {
    const dispatch = useDispatch();
    const { collections, banners, products, reels, loading: storeLoading } = useSelector(
        (state) => state.home
    );
    useEffect(() => {
        dispatch(fetchHeadlines());
        dispatch(fetchBanners());
        dispatch(fetchCollections());
        dispatch(fetchProducts());
        dispatch(fetchReels());
    }, [dispatch]);

    // Use a combined loading state for the components
    const finalLoading = {
        banners: storeLoading.banners,
        collections: storeLoading.collections,
        products: storeLoading.products,
        reels: storeLoading.reels
    };

    return (
        <HomeView
            collections={collections}
            banners={banners}
            products={products}
            reels={reels}
            loading={finalLoading}
        />
    );
};

export default HomeContainer;
