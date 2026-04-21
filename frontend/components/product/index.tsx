import { useState } from 'react';
import { Box, Container, Typography, Pagination, Grid } from '@mui/material';
import { DUMMY_PRODUCTS } from '@/core/constants';
import ProductCard from './ProductCard';

const PRODUCTS_PER_PAGE = 9;

const ProductList = () => {
  const [page, setPage] = useState(1);

  const handleChange = ({event, value}:any) => {
    setPage(value);
  };

  const startIndex = (page - 1) * PRODUCTS_PER_PAGE;

  const selectedProducts = DUMMY_PRODUCTS.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="xl">
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
          {selectedProducts.map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ProductCard product={product} width="100%" />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Pagination
            count={Math.ceil(DUMMY_PRODUCTS.length / PRODUCTS_PER_PAGE)}
            page={page}
            onChange={handleChange}
            color="primary"
          />
        </Box>
      </Container>
    </Box>
  );
};

export default ProductList;