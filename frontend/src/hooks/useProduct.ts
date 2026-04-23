
import { useState, useEffect, useMemo } from 'react';
import axios from "axios";
import { Product } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CREATE_URL = `${API_URL}/products/create`;
const GET_URL = `${API_URL}/products/allProducts`;
const UPDATE_URL = `${API_URL}/products/update`;

const MOCK_PRODUCTS: any[] = Array.from({ length: 50 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Premium Product ${i + 1}`,
  description: `Experience luxury like never before with our signature Product ${i + 1}. Performance meets aesthetics in this exclusive release.`,
  price: Math.floor(Math.random() * 500) + 99,
  image: `https://picsum.photos/seed/product${i + 1}/600/800`,
  category: i % 3 === 0 ? 'Digital' : i % 3 === 1 ? 'Fashion' : 'Tech',
  isTrending: i % 5 === 0,
  rating: 4 + Math.random(),
}));

export function useProducts(searchTerm: string = '', page: number = 1, pageSize: number = 12) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    // Simulate API delay
    const timer = setTimeout(() => {
      const filtered = MOCK_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
      
      setData(paginated);
      setTotal(filtered.length);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, page, pageSize]);

  const trendingProducts = useMemo(() => 
    MOCK_PRODUCTS.filter(p => p.isTrending).slice(0, 8), 
  []);

  return { loading, products: data, total, trendingProducts };
}

export const useProduct = () => {
  const createProduct = async (data: Product) => {
    try {
      const res = await axios.post(CREATE_URL, data);
      return res.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "Error creating product");
    }
  };

  const updateProduct = async (id: string, data: Product) => {
    try {
      const res = await axios.put(`${UPDATE_URL}/${id}`, data);
      return res.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "Error updating product");
    }
  };

  const getProductById = async (id: string) => {
    try {
      const res = await axios.get(`${GET_URL}/${id}`);
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
      const res = await axios.get(GET_URL);
      return res.data;
    } catch (error: any) {
      throw new Error(
        error?.response?.data?.message || "Error fetching products"
      );
    }
  };

  return { getProducts };
};
