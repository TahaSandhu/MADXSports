import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import ProductDetailComponent from "@/components/product-detail";
import TrendingCarousel from "@/components/product/TrendingCarousel";
import { DUMMY_PRODUCTS, TRENDING_PRODUCTS, NEW_RELEASES } from "@/core/constants";

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const product = useMemo(() => {
    if (!id) return null;
    
    const allProducts = [...DUMMY_PRODUCTS, ...TRENDING_PRODUCTS, ...NEW_RELEASES];
    
    return allProducts.find((p) => String(p.id) === String(id));
  }, [id]);

  if (id && !product) {
    return (
        <Box sx={{ 
          bgcolor: "background.default", 
          minHeight: "70vh", 
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
          <TrendingCarousel />
        </Box>
      </Box>
  );
};

export default ProductDetailPage;
