import React from 'react';
import {
  Box,
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid
} from '@mui/material';
import { DUMMY_PRODUCTS } from '@/core/constants';
import ProductCard from './ProductCard';

export default function ProductList() {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h2" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            position: 'relative',
            mb: 6,
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 80,
              height: 4,
              bgcolor: 'primary.main',
            }
          }}
        >
          Featured Products
        </Typography>

        <Grid container spacing={4}>
          {DUMMY_PRODUCTS.map((product) => (
            <Grid 
              key={product.id} 
              size={{ xs: 12, sm: 6, md: 4 }}
            >
              <ProductCard product={product} width="100%" />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}