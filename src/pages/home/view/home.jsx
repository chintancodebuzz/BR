
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../../../components/home/banner";
import Collection from "../../../components/home/collection";
import ReelsOfPerfection from "../../../components/home/reelsOfPerfection";
import TopSelling from "../../../components/home/topSelling";
import About from "../../../components/home/about";
import {
  fetchBanners,
  fetchCollections,
  fetchProducts,
  fetchReels,
  fetchHeadlines,
} from "../../../slices/homeSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { collections, banners, products, reels, loading } = useSelector(
    (state) => state.home
  );

  useEffect(() => {
    dispatch(fetchHeadlines());
    dispatch(fetchBanners());
    dispatch(fetchCollections());
    dispatch(fetchProducts());
    dispatch(fetchReels());
  }, [dispatch]);

  return (
    <div className="">
      <Banner banners={banners} loading={loading.banners} />
      <Collection collections={collections} loading={loading.collections} />
      <TopSelling products={products} loading={loading.products} />
      <ReelsOfPerfection reels={reels} loading={loading.reels} />
      <About />
    </div>
  );
}
