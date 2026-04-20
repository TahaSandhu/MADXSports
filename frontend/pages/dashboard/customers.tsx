import CustomersManagement from "@/components/dashboard/Customers";
import DashboardLayout from "@/core/layout/dashboardLayout";
import type { ReactElement } from "react";

const Customers = () => {
//   return <CustomersManagement />;
};

Customers.getLayout = function (page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Customers;