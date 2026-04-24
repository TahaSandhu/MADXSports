import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Button, Rating } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/router';

import { Product } from '@/hooks/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
const router = useRouter();
  return (
    <motion.div
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%' }}
    >
      <Card
        sx={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          '&:hover .card-actions': {
            opacity: 1,
            transform: 'translateY(0)',
          },
          '&:hover img': {
            transform: 'scale(1.05)',
          },
        }}
      >
        <Box sx={{ position: 'relative', overflow: 'hidden', pt: '125%' }}>
          <CardMedia
            component="img"
            image={product.images && product.images.length > 0 ? product.images[0] : ''}
            alt={product.name}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              transition: 'transform 0.5s ease',
              objectFit: 'cover',
            }}
          />
          {product.isTrending && (
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                bgcolor: 'primary.main',
                color: 'white',
                px: 1.5,
                py: 0.5,
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              Trending
            </Box>
          )}
        </Box>

        <CardContent sx={{ flexGrow: 1, p: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 700, textTransform: 'uppercase' }}>
            {product.category}
          </Typography>
          <Typography variant="h6" noWrap sx={{ fontWeight: 700 }}>
            {product.name}
          </Typography>
          <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button
              variant="text"
              size="small"
              endIcon={<ArrowUpRight size={16} />}
              onClick={() => router.push(`/product-detail/${product._id}`)}
              sx={{ color: 'white', '&:hover': { color: 'primary.main' } }}
            >
              Details
            </Button>
          </Box>
        </CardContent>

        <Box
          className="card-actions"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
            opacity: 0,
            transform: 'translateY(10px)',
            transition: 'all 0.3s ease',
            display: { xs: 'none', md: 'block' }
          }}
        >
          <Button
            variant="contained"
            fullWidth
            onClick={() => router.push(`/product-detail/${product._id}`)}
            sx={{ bgcolor: 'white', color: 'black', '&:hover': { bgcolor: 'primary.main', color: 'white' } }}
          >
            View Details
          </Button>
        </Box>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
