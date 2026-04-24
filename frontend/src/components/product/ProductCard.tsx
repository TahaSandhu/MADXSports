import { useContext } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Rating,
} from "@mui/material";
import { CurrencyContext } from "@/core/context/CurrencyContext";
import { useCart } from "@/core/context/CartContext";
import { useRouter } from "next/router";
import { Product } from "@/hooks/types";

const ProductCard = ({ product }: { product: Product }) => {
  const { currency } = useContext(CurrencyContext);
  const { addToCart } = useCart();
  const router = useRouter();

  const getPrice = (price: any) => {
    const numericPrice = typeof price === "number" ? price : parseFloat(String(price).replace(/[^0-9.]/g, ""));
    const finalPrice = numericPrice || 0;

    switch (currency) {
      case "EUR":
        return `€${(finalPrice * 0.92).toFixed(2)}`;
      case "GBP":
        return `£${(finalPrice * 0.79).toFixed(2)}`;
      case "CAD":
        return `C$${(finalPrice * 1.35).toFixed(2)}`;
      case "PKR":
        return `Rs ${(finalPrice * 278).toFixed(0)}`;
      default:
        return `$${finalPrice.toFixed(2)}`;
    }
  };
  return (
    <Box 
      onClick={() => router.push(`/product-detail/${product._id || (product as any).id}`)}
      sx={{ height: '100%', display: 'flex' }}
    >
      <Card sx={{ borderRadius: 4, overflow: "hidden", height: '100%', display: 'flex', flexDirection: 'column', width: '100%' }}>
        <CardMedia
          component="img"
          height="240"
          image={product.images?.[0]}
          alt={product.name}
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {product.name}
          </Typography>

          <Rating value={product.rating || 0} precision={0.5} readOnly />

          <Typography variant="h6" color="primary">
            {getPrice(product.price)}
          </Typography>
        </CardContent>

        <CardActions sx={{ mt: 'auto' }}>
          <Button
            fullWidth
            variant="contained"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
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
