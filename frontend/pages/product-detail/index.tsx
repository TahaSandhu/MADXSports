import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Rating,
  Divider,
  Paper,
} from "@mui/material";
import TrendingCarousel from "@/components/product/TrendingCarousel";
import { DUMMY_PRODUCTS } from "@/core/constants";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShieldIcon from "@mui/icons-material/Shield";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const ProductDetail = () => {
  const product = DUMMY_PRODUCTS[0]; // Using first product for demonstration

  return (
    <Box sx={{ bgcolor: "background.default", pt: 12, pb: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={8}>
          {/* Product Image Section */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                bgcolor: "rgba(255,255,255,0.03)",
                borderRadius: 4,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 500,
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  maxWidth: "100%",
                  maxHeight: 500,
                  objectFit: "contain",
                  filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.5))",
                }}
              />
            </Paper>
          </Grid>

          {/* Product Info Section */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography
                variant="h2"
                sx={{ fontWeight: "bold", mb: 2, color: "white" }}
              >
                {product.name}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 2 }}>
                <Rating value={product.rating} readOnly precision={0.5} />
                <Typography variant="body2" sx={{ opacity: 0.6 }}>
                  (128 Reviews)
                </Typography>
              </Box>

              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", color: "primary.main", mb: 4 }}
              >
                {product.price}
              </Typography>

              <Typography
                variant="body1"
                sx={{ mb: 6, lineHeight: 1.8, opacity: 0.8, fontSize: "1.1rem" }}
              >
                {product.description}
                Professional-grade gear designed for maximum performance and
                durability. Engineered with high-quality materials to provide the
                optimal balance of protection and flexibility during training.
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mb: 6 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCartIcon />}
                  sx={{
                    px: 6,
                    py: 2,
                    borderRadius: 2,
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    flexGrow: 1,
                  }}
                >
                  Add to Cart
                </Button>
              </Box>

              <Divider sx={{ mb: 4, opacity: 0.1 }} />

              <Grid container spacing={4}>
                <Grid size={{ xs: 6 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <ShieldIcon color="primary" />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      1 Year Warranty
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <LocalShippingIcon color="primary" />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Free Shipping
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        {/* Separated Trending Section */}
        <Box sx={{ mt: 15 }}>
          <TrendingCarousel />
        </Box>
      </Container>
    </Box>
  );
};

export default ProductDetail;
