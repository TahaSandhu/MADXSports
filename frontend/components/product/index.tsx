import { useEffect, useState } from "react";
import { Box, Container, Typography, Pagination, Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import { Product } from "@/hooks/types";
import { useProductsApi } from "@/hooks/useProduct";

const PRODUCTS_PER_PAGE = 9;

const ProductList = () => {
  const { getProducts } = useProductsApi();

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // fetch products once
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (_: any, value: number) => {
    setPage(value);
  };

  // pagination logic (frontend side)
  const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
  const selectedProducts = products.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  return (
    <Box sx={{ py: 8, bgcolor: "background.default" }}>
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          align="center"
          sx={{ fontWeight: "bold", mb: 6 }}
        >
          Featured Products
        </Typography>

        {loading ? (
          <Typography align="center">Loading...</Typography>
        ) : (
          <>
            <Grid container spacing={4}>
              {selectedProducts.map((product) => (
                <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
              <Pagination
                count={Math.ceil(products.length / PRODUCTS_PER_PAGE)}
                page={page}
                onChange={handleChange}
                color="primary"
              />
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default ProductList;
