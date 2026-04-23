import ProductForm from "@/components/dashboard/products/productForm";
import DashboardLayout from "@/core/layout/dashboardLayout";
import type { ReactElement } from "react";

const Orders = () => {
  return <ProductForm />;
};

Orders.getLayout = function (page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Orders;
