import { Container, Grid, Box, Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductReviews from "./ProductReviews";

interface ProductDetailProps {
  product?: any;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  if (!product) return null;

  const images = product?.images?.length > 0 ? product.images : [product?.image].filter(Boolean);

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mb: { xs: 3, md: 5 }, color: "text.secondary" }}
        >
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Link underline="hover" color="inherit" href="/shop">
            Shop
          </Link>
          <Typography color="text.primary" sx={{ fontWeight: "bold" }}>
            {product?.name}
          </Typography>
        </Breadcrumbs>

        <Grid container spacing={{ xs: 4, md: 8 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ProductImage images={images} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ProductInfo product={product} />
          </Grid>
        </Grid>

        <Box sx={{ mt: 10 }}>
          <ProductReviews productId={product._id} />
        </Box>
      </Container>
    </Box>
  );
};

export default ProductDetail;
