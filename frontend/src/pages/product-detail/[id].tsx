import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Typography, CircularProgress, Container } from "@mui/material";
import ProductDetailComponent from "@/components/product-detail";
import { useProduct } from "@/hooks/useProduct";

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getProductById } = useProduct();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const res = await getProductById(id as string);
          setProduct(res);
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box 
        sx={{ 
          bgcolor: "background.default", 
          minHeight: "100vh", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center" 
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!product) {
    return (
        <Box sx={{ 
          bgcolor: "background.default", 
          minHeight: "100vh", 
          display: "flex", 
          flexDirection: "column",
          alignItems: "center", 
          justifyContent: "center",
          gap: 2
        }}>
          <Typography variant="h3" color="white" sx={{ fontWeight: 'bold' }}>
            Product Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            The product you're looking for doesn't exist or has been removed.
          </Typography>
        </Box>
    );
  }

  return (
      <Box sx={{ bgcolor: "background.default", pt: { xs: 8, md: 12 } }}>
        <ProductDetailComponent product={product} />
        
        <Box sx={{ mt: 10, pb: 10 }}>
          {/* <TrendingCarousel /> */}
        </Box>
      </Box>
  );
};

export default ProductDetailPage;
