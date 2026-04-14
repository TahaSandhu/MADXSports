import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import ProductCard from './ProductCard';

interface ScrollableProductSectionProps {
  title: string;
  products: any[];
}

const ScrollableProductSection: React.FC<ScrollableProductSectionProps> = ({ title, products }) => {
  return (
    <Box sx={{ py: 6, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            fontWeight: 'bold', 
            mb: 4, 
            textAlign: { xs: 'center', md: 'left' },
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: { xs: '50%', md: 0 },
              transform: { xs: 'translateX(-50%)', md: 'none' },
              width: 60,
              height: 4,
              bgcolor: 'primary.main',
            }
          }}
        >
          {title}
        </Typography>

        <Box 
          sx={{ 
            display: 'flex', 
            overflowX: 'auto', 
            pb: 4, 
            px: 1,
            gap: 3,
            '&::-webkit-scrollbar': {
              height: 8,
            },
            '&::-webkit-scrollbar-track': {
              bgcolor: 'rgba(255,255,255,0.05)',
              borderRadius: 10,
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: 'primary.main',
              borderRadius: 10,
            },
          }}
        >
          {products.map((product) => (
            <Box key={product.id} sx={{ minWidth: { xs: 280, md: 340 } }}>
              <ProductCard product={product} width="100%" />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ScrollableProductSection;
