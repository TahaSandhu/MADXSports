import CheckoutPage from "@/components/cart/CheckoutPage";
import CheckoutLayout from "@/core/layout/checkoutLayout";
import type { ReactElement } from "react";

const Checkout = () => {
  return <CheckoutPage />;
};

Checkout.getLayout = function (page: ReactElement) {
  return <CheckoutLayout>{page}</CheckoutLayout>;
};

export default Checkout;