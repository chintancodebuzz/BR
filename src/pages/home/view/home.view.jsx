import React from "react";
import Banner from "../../../components/home/banner";
import Collection from "../../../components/home/collection";
import ReelsOfPerfection from "../../../components/home/reelsOfPerfection";
import TopSelling from "../../../components/home/topSelling";
import About from "../../../components/home/about";

const HomeView = ({ collections, banners, products, reels, loading }) => {
    return (
        <div className="">
            <Banner banners={banners} loading={loading.banners} />
            <Collection collections={collections} loading={loading.collections} />
            <TopSelling products={products} loading={loading.products} />
            <ReelsOfPerfection reels={reels} loading={loading.reels} />
            <About />
        </div>
    );
};

export default HomeView;
