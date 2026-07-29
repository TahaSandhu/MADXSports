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

  const colorMap: Record<string, string> = {
    "black": "#000000",
    "white": "#ffffff",
    "red": "#ff1744",
    "blue": "#2196f3",
    "green": "#4caf50",
    "golden": "#FFD700",
    "yellow": "#ffeb3b",
    "grey": "#888888",
    "gray": "#888888",
    "orange": "#ff9800",
    "purple": "#9c27b0",
    "pink": "#e91e63",
  };

  const sizes = product.variants?.map((v) => v.size)
    .filter((value, index, self) => self.indexOf(value) === index) || [];

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
          bgcolor: "#0a0a0a",
          border: "1px solid rgba(255, 23, 68, 0.15)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            borderColor: "#ff1744",
            boxShadow: "0 0 20px rgba(255, 23, 68, 0.35)",
          },
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
          sx={{ flexGrow: 1, p: { xs: 1.5, sm: 2 }, display: "flex", flexDirection: "column", gap: { xs: 0.5, sm: 1 } }}
        >
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontWeight: "bold",
              color: "#ffffff",
              fontSize: { xs: "0.875rem", sm: "1rem", md: "1.1rem" },
            }}
          >
            {product.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
              gap: { xs: 0.5, sm: 0 },
            }}
          >
            <Rating value={product.rating || 0} precision={0.5} readOnly size="small" />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#ff1744",
                fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.2rem" },
              }}
            >
              {getPrice(product.price)}
            </Typography>
          </Box>

          {/* Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 0.5, flexWrap: "wrap" }}>
              <Typography variant="caption" sx={{ color: "text.secondary", mr: 0.5, fontSize: { xs: "0.7rem", sm: "0.75rem" } }}>
                Colors:
              </Typography>
              {product.colors.slice(0, 5).map((color) => {
                const hex = colorMap[color.toLowerCase()] || (color.startsWith("#") ? color : "#888888");
                return (
                  <Box
                    key={color}
                    sx={{
                      width: { xs: 12, sm: 14 },
                      height: { xs: 12, sm: 14 },
                      borderRadius: "50%",
                      backgroundColor: hex,
                      border: "1px solid rgba(255, 255, 255, 0.4)",
                      boxShadow: color.toLowerCase() === "white" ? "inset 0 0 2px #000" : "none",
                    }}
                    title={color}
                  />
                );
              })}
            </Box>
          )}

          {/* Sizes */}
          {sizes.length > 0 && (
            <Box sx={{ display: "flex", gap: 0.5, alignItems: "center", flexWrap: "wrap", mt: 0.5 }}>
              <Typography variant="caption" sx={{ color: "text.secondary", mr: 0.5, fontSize: { xs: "0.7rem", sm: "0.75rem" } }}>
                Sizes:
              </Typography>
              {sizes.map((size) => (
                <Box
                  key={size}
                  sx={{
                    px: { xs: 0.5, sm: 0.8 },
                    py: 0.1,
                    borderRadius: "4px",
                    border: "1px solid rgba(255, 23, 68, 0.3)",
                    bgcolor: "rgba(255, 23, 68, 0.05)",
                    fontSize: { xs: "0.6rem", sm: "0.65rem" },
                    fontWeight: "bold",
                    color: "#ffffff",
                  }}
                >
                  {size}
                </Box>
              ))}
            </Box>
          )}
        </CardContent>

        <Box
          className="card-actions"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
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
              bgcolor: "#ff1744",
              color: "white",
              fontWeight: "bold",
              "&:hover": { bgcolor: "black", color: "#ff1744", border: "1px solid #ff1744" },
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