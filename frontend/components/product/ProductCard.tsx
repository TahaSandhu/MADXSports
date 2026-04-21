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

  const getPrice = (price: number) => {
    switch (currency) {
      case "EUR":
        return `€${(price * 0.92).toFixed(2)}`;
      case "GBP":
        return `£${(price * 0.79).toFixed(2)}`;
      case "CAD":
        return `C$${(price * 1.35).toFixed(2)}`;
      case "PKR":
        return `Rs ${(price * 278).toFixed(0)}`;
      default:
        return `$${price.toFixed(2)}`;
    }
  };

  return (
    <Box onClick={() => router.push(`/product-detail/${product.id}`)}>
      <Card sx={{ borderRadius: 4, overflow: "hidden" }}>
        <CardMedia
          component="img"
          height="240"
          image={product.images?.[0]}
          alt={product.name}
        />

        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {product.name}
          </Typography>

          <Rating value={product.rating || 0} precision={0.5} readOnly />

          <Typography variant="h6" color="primary">
            {getPrice(product.price)}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.description}
          </Typography>
        </CardContent>

        <CardActions>
          <Button
            fullWidth
            variant="contained"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ProductCard;
