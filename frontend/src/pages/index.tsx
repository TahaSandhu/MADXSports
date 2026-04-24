import ProductList from "@/components/product";
import TrendingBar from "@/components/trending-bar";
import TrendingCarousel from "@/components/trending-bar/trendingcards";
import { useProducts } from "@/hooks/useProduct";
import Loader from "@/components/common/Loader";

const IndexPage = () => {
  const { trendingProducts, newReleases, loading } = useProducts();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <TrendingBar />
      {trendingProducts.length > 0 && (
        <TrendingCarousel products={trendingProducts} title="Trending Now" />
      )}
      <ProductList />
      {newReleases.length > 0 && (
        <TrendingCarousel products={newReleases} title="New Releases" />
      )}
    </>
  );
};

export default IndexPage;
