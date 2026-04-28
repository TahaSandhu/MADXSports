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


export const useOrdersApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/checkout/orders");
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getDashboardStats = async () => {
  try {
    setLoading(true);
    const res = await api.get("/checkout/orders");
    const orders = res.data;

    const totalOrders = orders.length;

    const pending = orders.filter((o: any) => o.deliveryStatus === "pending").length;
    const processing = orders.filter((o: any) => o.deliveryStatus === "processing").length;
    const delivered = orders.filter((o: any) => o.deliveryStatus === "delivered").length;

    const totalRevenue = orders.reduce((sum: number, o: any) => sum + o.total, 0);

    const totalCustomers = new Set(orders.map((o: any) => o.email)).size;

    return {
      totalOrders,
      pending,
      processing,
      delivered,
      totalRevenue,
      totalCustomers,
      recentOrders: orders.slice(0, 5),
    };
  } catch (err: any) {
    setError(err.message);
    throw err;
  } finally {
    setLoading(false);
  }
};

  const updateDeliveryStatus = async (id: string, status: string) => {
    try {
      await api.patch(`/checkout/${id}/delivery-status`, { status });
    } catch (err: any) {
      setError(err.response?.data?.message || "Update failed");
      throw err;
    }
  };

  return { getAllOrders, getDashboardStats, updateDeliveryStatus, loading, error };
};