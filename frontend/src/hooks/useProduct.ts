import { useState, useEffect, useMemo } from "react";
import api from "@/lib/api";
import { Product } from "./types";

const CREATE_URL = "/products/create";
const GET_URL = "/products/allProducts";
const UPDATE_URL = "/products/update";

export function useProducts(
  searchTerm: string = "",
  page: number = 1,
  pageSize: number = 12
) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setIsInitialLoading(true);

        const res = await api.get(GET_URL, {
          withCredentials: true,
        });

        setAllProducts(res.data || []);
      } catch (error) {
        console.error("Fetch Products Error:", error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (isInitialLoading) return;

    setLoading(true);

    const filtered = allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const start = (page - 1) * pageSize;
    const end = page * pageSize;

    setData(filtered.slice(start, end));
    setTotal(filtered.length);

    setLoading(false);
  }, [searchTerm, page, pageSize, allProducts, isInitialLoading]);

  const trendingProducts = useMemo(
    () => allProducts.filter((p) => p.isTrending),
    [allProducts]
  );

  const newReleases = useMemo(
    () => allProducts.filter((p) => p.isNewRelease),
    [allProducts]
  );

  return {
    loading: loading || isInitialLoading,
    products: data,
    total,
    trendingProducts,
    newReleases,
  };
}

export const useProduct = () => {
  const createProduct = async (data: FormData) => {
    const res = await api.post("/products/create", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  };

  const updateProduct = async (id: string, data: any) => {
    const res = await api.put(`/products/update/${id}`, data);
    return res.data;
  };

  const getProductById = async (id: string) => {
    const res = await api.get(`/products/product/${id}`);
    return res.data;
  };

  return {
    createProduct,
    updateProduct,
    getProductById,
  };
};

export const useProductsApi = () => {
  const getProducts = async () => {
    try {
      const res = await api.get(GET_URL, {
        withCredentials: true,
      });

      return res.data;
    } catch (error: any) {
      console.error(error.response);

      throw new Error(
        error?.response?.data?.message || "Error fetching products"
      );
    }
  };

  return {
    getProducts,
  };
};