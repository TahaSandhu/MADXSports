import ProductList from "@/components/product";
import ScrollableProductSection from "@/components/product/ScrollableProductSection";
import { TRENDING_PRODUCTS, NEW_RELEASES } from "@/core/constants";

const IndexPage = () => {
  return (
    <>
      <ScrollableProductSection
        title="Trending Products"
        products={TRENDING_PRODUCTS}
      />
      <ProductList />
      <ScrollableProductSection title="New Releases" products={NEW_RELEASES} />
    </>
  );
};

export default IndexPage;
