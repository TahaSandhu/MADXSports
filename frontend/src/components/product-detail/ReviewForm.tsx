import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Rating, 
  Paper, 
  Collapse,
  Alert,
  CircularProgress
} from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';

interface ReviewFormProps {
  productId: string;
  onSuccess: (data: any) => void;
  isSubmitting: boolean;
  addReview: (data: any) => Promise<any>;
}

const ReviewForm = ({ productId, onSuccess, isSubmitting, addReview }: ReviewFormProps) => {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState<number | null>(5);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !name || !comment) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError(null);
      await addReview({
        productId,
        name,
        rating,
        comment,
        date: new Date().toISOString().split('T')[0],
        avatarUrl: '' // Can be handled by backend or default
      });
      
      // Reset form
      setName('');
      setComment('');
      setRating(5);
      setShowForm(false);
      onSuccess({ name, rating, comment });
    } catch (err: any) {
      setError(err.message || 'Failed to submit review');
    }
  };

  return (
    <Box sx={{ mb: 6 }}>
      <Button 
        variant={showForm ? "outlined" : "contained"} 
        color="primary"
        startIcon={<RateReviewIcon />}
        onClick={() => setShowForm(!showForm)}
        sx={{ 
          borderRadius: '50px', 
          px: 4, 
          py: 1.5,
          textTransform: 'none',
          fontWeight: 'bold',
          boxShadow: showForm ? 'none' : '0 4px 20px rgba(255, 0, 0, 0.3)',
          '&:hover': {
             boxShadow: showForm ? 'none' : '0 6px 25px rgba(255, 0, 0, 0.4)',
          }
        }}
      >
        {showForm ? "Cancel Review" : "Write a Review"}
      </Button>

      <Collapse in={showForm}>
        <Paper 
          elevation={0}
          sx={{ 
            mt: 3, 
            p: 4, 
            bgcolor: 'rgba(255, 255, 255, 0.02)', 
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 4,
            backdropFilter: 'blur(10px)'
          }}
        >
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
            Share your experience
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography component="legend" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Your Rating
              </Typography>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
                size="large"
                sx={{ 
                    '& .MuiRating-iconFilled': { color: 'primary.main' },
                    '& .MuiRating-iconHover': { color: 'primary.dark' }
                }}
              />
            </Box>

            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.03)'
                }
              }}
            />

            <TextField
              label="Your Review"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.03)'
                }
              }}
            />

            <Button 
              type="submit" 
              variant="contained" 
              disabled={isSubmitting}
              sx={{ 
                mt: 1, 
                py: 1.5, 
                borderRadius: 2,
                fontWeight: 'bold',
                fontSize: '1rem'
              }}
            >
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Post Review"}
            </Button>
          </Box>
        </Paper>
      </Collapse>
    </Box>
  );
};

export default ReviewForm;
