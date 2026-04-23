import ProductForm from "@/components/dashboard/products/productForm";
import { Box, Container } from "@mui/material";

export default function CreateProductPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <ProductForm />
      </Box>
    </Container>
  );
}
