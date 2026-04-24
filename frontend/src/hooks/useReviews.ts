import { useState, useEffect } from 'react';
import axios from 'axios';
import { Review } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useReviews = (productId: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchReviews = async () => {
    if (!productId) return;
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/reviews/productreviews/${productId}`);
      setReviews(response.data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching reviews:', err);
      setError(err?.response?.data?.message || 'Error fetching reviews');
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (data: Omit<Review, '_id' | 'createdAt' | 'updatedAt'>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_URL}/reviews/addreviews`, data);
      await fetchReviews(); // Refresh reviews after adding
      return response.data;
    } catch (err: any) {
      console.error('Error adding review:', err);
      throw new Error(err?.response?.data?.message || 'Error adding review');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  return { reviews, loading, error, isSubmitting, addReview, refreshReviews: fetchReviews };
};
