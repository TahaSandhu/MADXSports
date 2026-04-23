import ProductTable from "@/components/dashboard/products/productData";
import DashboardLayout from "@/core/layout/dashboardLayout";
import type { ReactElement } from "react";

const Products = () => {
  return <ProductTable />;
};

Products.getLayout = function (page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Products;
