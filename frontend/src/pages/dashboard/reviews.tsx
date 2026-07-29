import ReviewTable from "@/components/dashboard/reviews/reviewData";
import DashboardLayout from "@/core/layout/dashboardLayout";
import type { ReactElement } from "react";

const Reviews = () => {
  return <ReviewTable />;
};

Reviews.getLayout = function (page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Reviews;
