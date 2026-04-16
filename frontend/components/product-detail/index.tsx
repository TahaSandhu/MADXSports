import { Container, Grid, Box, Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import { DUMMY_PRODUCTS, DUMMY_REVIEWS } from "@/core/constants";
import Comments from "./Comments";
interface ProductDetailProps {
  product?: any;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const displayedProduct = product || DUMMY_PRODUCTS[0];

  const images = displayedProduct?.images || [
    displayedProduct?.image,
    "/shootergloves/gl1-black.jpeg",
    "/shootergloves/gl2-vertical-red.jpeg",
    "/headgard/hg1-golden-premium.jpeg",
  ].filter(Boolean);

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
            {displayedProduct?.name}
          </Typography>
        </Breadcrumbs>

        <Grid container spacing={{ xs: 4, md: 8 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ProductImage images={images} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ProductInfo product={displayedProduct} />
          </Grid>
        </Grid>

        <Box sx={{ mt: 10 }}>
          <Comments reviews={DUMMY_REVIEWS} />
        </Box>
      </Container>
    </Box>
  );
};

export default ProductDetail;
