import React, { useContext } from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Rating,
} from '@mui/material';
import { CurrencyContext } from '@/core/context/CurrencyContext';
import { useCart } from '@/core/context/CartContext';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: string;
    image: string;
    rating: number;
    description: string;
  };
  width?: number | string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, width = 340 }) => {
  const { currency } = useContext(CurrencyContext);
  const { addToCart } = useCart();

  const getPrice = (basePrice: string) => {
    const num = parseFloat(basePrice.replace('$', ''));
    switch (currency) {
      case 'EUR': return `€${(num * 0.92).toFixed(2)}`;
      case 'GBP': return `£${(num * 0.79).toFixed(2)}`;
      case 'CAD': return `C$${(num * 1.35).toFixed(2)}`;
      case 'PKR': return `Rs ${(num * 278).toFixed(0)}`;
      default: return `$${num.toFixed(2)}`;
    }
  };

  return (
    <Box sx={{ perspective: '1000px', height: '100%' }}>
      <Card 
        sx={{ 
          width: width,
          mx: 'auto',
          borderRadius: 4,
          overflow: 'hidden',
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          transformStyle: 'preserve-3d',
          position: 'relative',
          background: 'background.paper',
          border: '1px solid rgba(255,255,255,0.05)',
          '&:hover': { 
            transform: 'rotateX(8deg) rotateY(-8deg)',
            boxShadow: '20px 20px 60px rgba(0,0,0,0.5)',
          } 
        }}
      >
        <CardMedia 
          component="img" 
          height="240" 
          image={product.image} 
          alt={product.name} 
          sx={{ 
            transition: '0.4s',
            '&:hover': {
              transform: 'translateZ(30px) scale(1.05)',
            }
          }}
        />
        <CardContent sx={{ flexGrow: 1, transform: 'translateZ(20px)' }}>
          <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
            {product.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Rating value={product.rating} precision={0.5} readOnly size="small" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.rating})
            </Typography>
          </Box>
          <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
            {getPrice(product.price)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ p: 2, pt: 0, transform: 'translateZ(40px)' }}>
          <Button 
            size="medium" 
            variant="contained" 
            fullWidth
            onClick={() => addToCart(product)}
            sx={{
              boxShadow: '0 4px 14px 0 rgba(255, 23, 68, 0.39)',
              '&:hover': {
                transform: 'scale(1.02)',
              }
            }}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ProductCard;
