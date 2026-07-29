import CustomerTable from "@/components/dashboard/customers/customerData";
import DashboardLayout from "@/core/layout/dashboardLayout";
import type { ReactElement } from "react";

const Customers = () => {
  return <CustomerTable />;
};

Customers.getLayout = function (page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Customers;