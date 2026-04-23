import { useState } from "react";
import api from "@/lib/api";

export const useCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (payload: any) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post("/checkout/create-order", payload);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createOrder,
    loading,
    error,
  };
};