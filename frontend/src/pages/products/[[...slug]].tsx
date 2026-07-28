  import { useRouter } from "next/router";
  import ProductList from "@/components/product";
  import TrendingBar from "@/components/trending-bar";
  import TrendingCarousel from "@/components/trending-bar/trendingcards";
  import { useProducts } from "@/hooks/useProduct";
  import Loader from "@/components/common/Loader";
  import ContactPage from "@/components/contact/ContactPage";

  const CatchAllPage = () => {
    const router = useRouter();

    const { slug, filter, search } = router.query;

    if (!router.isReady) {
      return <Loader />;
    }

    const slugArray = slug
      ? Array.isArray(slug)
        ? slug
        : [slug]
      : [];

    const { trendingProducts = [], newReleases = [], loading } = useProducts();

    const isHomePage = slugArray.length === 0;

    const isContactPage =
      slugArray.length === 1 &&
      slugArray[0].toLowerCase() === "contact";

    if (loading && isHomePage) {
      return <Loader />;
    }

    if (isHomePage) {
      return (
        <>
          <TrendingBar />

          {trendingProducts.length > 0 && (
            <TrendingCarousel
              products={trendingProducts}
              title="Trending Now"
            />
          )}

          <ProductList slug={[]} />

          {newReleases.length > 0 && (
            <TrendingCarousel
              products={newReleases}
              title="New Releases"
            />
          )}
        </>
      );
    }

    if (isContactPage) {
      return <ContactPage />;
    }

    const isShopPage =
      slugArray.length === 1 &&
      slugArray[0].toLowerCase() === "shop";

    return (
      <ProductList
        slug={slugArray}
        filter={filter as string}
        search={search as string}
        isShopPage={isShopPage}
      />
    );
  };

  export default CatchAllPage;