import { useState } from "react";

export const useCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const createOrder = async (payload: any) => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoading(false);

    return {
      success: true,
      message: "Order created successfully",
      order: {
        _id: "ORD-1001",
        ...payload,
        paymentStatus: "pending",
        deliveryStatus: "pending",
        createdAt: new Date(),
      },
    };
  };

  return {
    createOrder,
    loading,
    error,
  };
};

export const useOrdersApi = () => {
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const dummyOrders = [
    {
      _id: "ORD-1001",
      email: "hassan@madxsports.com",
      firstName: "Hassan",
      lastName: "Ali",
      total: 120,
      paymentStatus: "succeeded",
      deliveryStatus: "pending",
      createdAt: "2025-08-01",
    },
    {
      _id: "ORD-1002",
      email: "john@example.com",
      firstName: "John",
      lastName: "Doe",
      total: 250,
      paymentStatus: "succeeded",
      deliveryStatus: "processing",
      createdAt: "2025-08-02",
    },
    {
      _id: "ORD-1003",
      email: "jane@example.com",
      firstName: "Jane",
      lastName: "Smith",
      total: 90,
      paymentStatus: "pending",
      deliveryStatus: "delivered",
      createdAt: "2025-08-03",
    },
    {
      _id: "ORD-1004",
      email: "alex@example.com",
      firstName: "Alex",
      lastName: "Brown",
      total: 320,
      paymentStatus: "succeeded",
      deliveryStatus: "processing",
      createdAt: "2025-08-04",
    },
    {
      _id: "ORD-1005",
      email: "emma@example.com",
      firstName: "Emma",
      lastName: "Wilson",
      total: 180,
      paymentStatus: "failed",
      deliveryStatus: "cancelled",
      createdAt: "2025-08-05",
    },
  ];

  const getAllOrders = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    setLoading(false);

    return dummyOrders;
  };

  const getDashboardStats = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const totalOrders = dummyOrders.length;

    const pending = dummyOrders.filter(
      (o) => o.deliveryStatus === "pending"
    ).length;

    const processing = dummyOrders.filter(
      (o) => o.deliveryStatus === "processing"
    ).length;

    const delivered = dummyOrders.filter(
      (o) => o.deliveryStatus === "delivered"
    ).length;

    const totalRevenue = dummyOrders.reduce(
      (sum, o) => sum + o.total,
      0
    );

    const totalCustomers = new Set(
      dummyOrders.map((o) => o.email)
    ).size;

    setLoading(false);

    return {
      totalOrders,
      pending,
      processing,
      delivered,
      totalRevenue,
      totalCustomers,
      recentOrders: dummyOrders,
    };
  };

  const updateDeliveryStatus = async (
    id: string,
    status: string
  ) => {
    console.log("Updated:", id, status);

    return {
      success: true,
    };
  };

  return {
    getAllOrders,
    getDashboardStats,
    updateDeliveryStatus,
    loading,
    error,
  };
};