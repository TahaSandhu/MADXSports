import OrderTable from "@/components/dashboard/orders/orderData";
import DashboardLayout from "@/core/layout/dashboardLayout";
import type { ReactElement } from "react";

const Orders = () => {
  return <OrderTable />;
};

Orders.getLayout = function (page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Orders;
