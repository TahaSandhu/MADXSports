import ProductList from "@/components/product";
import TrendingBar from "@/components/trending-bar";
import TrendingCarousel from "@/components/trending-bar/trendingcards";
import { NEW_RELEASES } from "@/core/constants";
import { useProducts } from "@/hooks/useProduct";

const IndexPage = () => {
  const { products } = useProducts();

  return (
    <>
      <TrendingBar />
      <TrendingCarousel products={NEW_RELEASES} title="Trending Now" />
      <ProductList />
      <TrendingCarousel products={NEW_RELEASES} title="New Releases" />
    </>
  );
};

export default IndexPage;
