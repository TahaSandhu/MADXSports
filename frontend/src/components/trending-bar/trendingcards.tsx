import React, { useRef } from 'react';
import { Box, Typography, IconButton, Container } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './trendingProductCard';
// import ProductCard from './ProductCard';
// import { Product } from '../hooks/useProducts';

import { Product } from '@/hooks/types';

interface CarouselProps {
  products: Product[];
  title: string;
}

const TrendingCarousel: React.FC<CarouselProps> = ({ products, title }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ py: 6, position: 'relative' }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4 }}>
          <Box>
            <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2 }}>
              What's Hot
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, mt: 1 }}>
              {title}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton 
              onClick={() => scroll('left')} 
              sx={{ border: '1px solid rgba(255,255,255,0.1)', color: 'white', '&:hover': { bgcolor: 'primary.main' } }}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton 
              onClick={() => scroll('right')}
              sx={{ border: '1px solid rgba(255,255,255,0.1)', color: 'white', '&:hover': { bgcolor: 'primary.main' } }}
            >
              <ChevronRight />
            </IconButton>
          </Box>
        </Box>

        <Box
          ref={scrollRef}
          sx={{
            display: 'flex',
            gap: 3,
            overflowX: 'auto',
            pb: 4,
            px: 1,
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            scrollSnapType: 'x mandatory',
          }}
        >
          {products.map((product) => (
            <Box 
              key={product._id} 
              sx={{ 
                minWidth: { xs: '240px', sm: '280px', md: '320px' },
                scrollSnapAlign: 'start',
                display: 'flex',
              }}
            >
              <ProductCard product={product} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default TrendingCarousel;
