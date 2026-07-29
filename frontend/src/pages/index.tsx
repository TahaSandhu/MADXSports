import { useRouter } from "next/router";
import ProductList from "@/components/product";
import Loader from "@/components/common/Loader";

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