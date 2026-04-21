// import { Product } from '@/components/dashboard/types';
// import { useState, useEffect } from 'react';

// // Mock API calls - replace with actual API endpoints
// const API_BASE_URL = '/api/products';

// export const useProducts = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       // Replace with actual API call
//       const response = await fetch(API_BASE_URL);
//       const data = await response.json();
//       setProducts(data);
//     } catch (err) {
//       setError('Failed to fetch products');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
//     setLoading(true);
//     try {
//       const response = await fetch(API_BASE_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(product),
//       });
//       const data = await response.json();
//       setProducts([...products, data]);
//       return data;
//     } catch (err) {
//       setError('Failed to create product');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateProduct = async (id: string, product: Partial<Product>) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(product),
//       });
//       const data = await response.json();
//       setProducts(products.map(p => p.id === id ? data : p));
//       return data;
//     } catch (err) {
//       setError('Failed to update product');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteProduct = async (id: string) => {
//     setLoading(true);
//     try {
//       await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
//       setProducts(products.filter(p => p.id !== id));
//     } catch (err) {
//       setError('Failed to delete product');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return {
//     products,
//     loading,
//     error,
//     createProduct,
//     updateProduct,
//     deleteProduct,
//     refetch: fetchProducts,
//   };
// };


import { useState, useEffect, useMemo } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isTrending: boolean;
  rating: number;
}

const MOCK_PRODUCTS: Product[] = Array.from({ length: 50 }, (_, i) => ({
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
  const [data, setData] = useState<Product[]>([]);
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