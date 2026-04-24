import { useContext } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Button,
} from "@mui/material";
import { CurrencyContext } from "@/core/context/CurrencyContext";
import { useRouter } from "next/router";
import { Product } from "@/hooks/types";
import { motion } from "framer-motion";

const ProductCard = ({ product }: { product: Product }) => {
  const { currency } = useContext(CurrencyContext);
  const router = useRouter();

  const getPrice = (price: any) => {
    const numericPrice =
      typeof price === "number"
        ? price
        : parseFloat(String(price).replace(/[^0-9.]/g, ""));
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
    <motion.div
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ display: "flex", flexDirection: "column", flex: 1, height: "100%" }}
    >
      <Card
        onClick={() =>
          router.push(`/product-detail/${product._id || (product as any).id}`)
        }
        sx={{
          borderRadius: 4,
          position: "relative",
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          cursor: "pointer",
          "&:hover .card-actions": {
            opacity: 1,
            transform: "translateY(0)",
          },
          "&:hover img": {
            transform: "scale(1.05)",
          },
        }}
      >
        <Box sx={{ position: "relative", overflow: "hidden", pt: "125%" }}>
          <CardMedia
            component="img"
            image={product.images?.[0]}
            alt={product.name}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              transition: "transform 0.5s ease",
              objectFit: "cover",
            }}
          />
        </Box>

        <CardContent
          sx={{ flexGrow: 1, p: 2, display: "flex", flexDirection: "column", gap: 0.5 }}
        >
          <Typography variant="h6" noWrap sx={{ fontWeight: "bold" }}>
            {product.name}
          </Typography>

          <Rating value={product.rating || 0} precision={0.5} readOnly />

          <Typography variant="h6" color="primary">
            {getPrice(product.price)}
          </Typography>
        </CardContent>

        <Box
          className="card-actions"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
            opacity: 0,
            transform: "translateY(10px)",
            transition: "all 0.3s ease",
            display: { xs: "none", md: "block" },
          }}
        >
          <Button
            variant="contained"
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/product-detail/${product._id || (product as any).id}`);
            }}
            sx={{
              bgcolor: "white",
              color: "black",
              "&:hover": { bgcolor: "primary.main", color: "white" },
            }}
          >
            View Details
          </Button>
        </Box>
      </Card>
    </motion.div>
  );
};

export default ProductCard;