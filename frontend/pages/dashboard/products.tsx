import DashboardLayout from "@/core/layout/dashboardLayout";
import type { ReactElement } from "react";

const Products = () => {
//   return <ProductsManagement />;
};

Products.getLayout = function (page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Products;