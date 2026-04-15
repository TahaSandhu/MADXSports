import ProductList from "@/components/product";
import ScrollableProductSection from "@/components/product/ScrollableProductSection";
import TrendingCarousel from "@/components/product/TrendingSlider";
import { NEW_RELEASES } from "@/core/constants";

const IndexPage = () => {
  return (
    <>
      <TrendingCarousel />
      <ProductList />
      <ScrollableProductSection title="New Releases" products={NEW_RELEASES} />
    </>
  );
};

export default IndexPage;
