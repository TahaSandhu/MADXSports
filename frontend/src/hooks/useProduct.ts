
import { useState, useEffect, useMemo } from 'react';
import api from "@/lib/api";
import { Product } from './types';

const CREATE_URL = `/products/create`;
const GET_URL = `/products/allProducts`;
const UPDATE_URL = `/products/update`;

export function useProducts(searchTerm: string = '', page: number = 1, pageSize: number = 12) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      setIsInitialLoading(true);
      try {
        const res = await api.get(GET_URL);
        const products: Product[] = res.data;
        setAllProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsInitialLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (isInitialLoading) {
      setLoading(true);
      return;
    }

    setLoading(true);
    const filtered = allProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
    
    setData(paginated);
    setTotal(filtered.length);
    setLoading(false);
  }, [searchTerm, page, pageSize, allProducts, isInitialLoading]);

  const trendingProducts = useMemo(() => 
    allProducts.filter(p => p.isTrending), 
  [allProducts]);

  const newReleases = useMemo(() => 
    allProducts.filter(p => p.isNewRelease), 
  [allProducts]);

  return { loading: loading || isInitialLoading, products: data, total, trendingProducts, newReleases };
}

export const useProduct = () => {
  const createProduct = async (data: Product) => {
    try {
      const res = await api.post(CREATE_URL, data);
      return res.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "Error creating product");
    }
  };

  const updateProduct = async (id: string, data: Product) => {
    try {
      const res = await api.put(`${UPDATE_URL}/${id}`, data);
      return res.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "Error updating product");
    }
  };

  const getProductById = async (id: string) => {
    try {
      const res = await api.get(`${GET_URL}/${id}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "Error fetching product");
    }
  };

  return { createProduct, updateProduct, getProductById };
};

export const useProductsApi = () => {
  const getProducts = async () => {
    try {
      const res = await api.get(GET_URL);
      return res.data;
    } catch (error: any) {
      throw new Error(
        error?.response?.data?.message || "Error fetching products"
      );
    }
  };

  return { getProducts };
};
