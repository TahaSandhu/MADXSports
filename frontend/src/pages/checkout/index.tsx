import { useEffect } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import type { ReactElement } from "react";
import Loader from "@/components/common/Loader";

const Checkout = () => {
  const router = useRouter();

  useEffect(() => {
    toast.error("Checkout is temporarily disabled. Please contact us to complete your order.");
    router.push("/contact");
  }, [router]);

  return <Loader />;
};

Checkout.getLayout = function (page: ReactElement) {
  return page;
};

export default Checkout;