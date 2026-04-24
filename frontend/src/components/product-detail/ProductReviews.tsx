import React from "react";
import { Box, Typography, Avatar, Rating, Paper, CircularProgress, Alert } from "@mui/material";
import { useReviews } from "@/hooks/useReviews";
import ReviewForm from "./ReviewForm";

interface ProductReviewsProps {
  productId: string;
  className?: string;
}

const formatDate = (date?: string) =>
  date ? new Date(date).toLocaleDateString() : "";

const ProductReviews = ({ productId, className }: ProductReviewsProps) => {
  const { reviews, loading, error, isSubmitting, addReview } = useReviews(productId);

  const count = reviews.length;
  const avg = count > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / count : 0;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box className={className}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
          flexWrap: "nowrap",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Customer Reviews
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1.2rem' }}>{avg.toFixed(1)}</Typography>
          <Rating value={avg} precision={0.1} readOnly size="medium" />
          <Typography variant="body2" color="text.secondary">
            ({count} {count === 1 ? "review" : "reviews"})
          </Typography>
        </Box>
      </Box>

      <ReviewForm 
        productId={productId} 
        isSubmitting={isSubmitting} 
        addReview={addReview} 
        onSuccess={() => {}} 
      />

      {count === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
          No reviews yet. Be the first to review this product!
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {reviews.map((r) => (
            <Paper 
              key={r._id} 
              elevation={0}
              sx={{ 
                p: 3, 
                bgcolor: 'rgba(255, 255, 255, 0.03)', 
                borderRadius: 2,
                border: '1px solid rgba(255, 255, 255, 0.05)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'primary.main'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <Box sx={{ display: "flex", gap: 2 }}>
                <Avatar 
                  src={r.avatarUrl} 
                  sx={{ 
                    width: 48, 
                    height: 48, 
                    bgcolor: 'primary.main',
                    boxShadow: '0 0 10px rgba(255, 0, 0, 0.3)'
                  }}
                >
                  {!r.avatarUrl && r.name.charAt(0).toUpperCase()}
                </Avatar>

                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: 'flex-start',
                      mb: 1
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{r.name}</Typography>
                      <Rating value={r.rating} readOnly size="small" sx={{ mt: 0.5 }} />
                    </Box>

                    <Typography variant="caption" color="text.secondary">
                      {formatDate(r.date || r.createdAt)}
                    </Typography>
                  </Box>

                  <Typography variant="body2" sx={{ mt: 1.5, color: 'text.secondary', lineHeight: 1.6 }}>
                    {r.comment}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProductReviews;
