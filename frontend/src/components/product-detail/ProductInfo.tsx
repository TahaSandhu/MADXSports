import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Rating,
  Button,
  Divider,
  Chip,
  Stack,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { useCart } from "@/core/context/CartContext";
import { useRouter } from "next/router";

interface ProductInfoProps {
  product: any;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const { addToCart } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [isAdded, setIsAdded] = useState(false);

  // Use product variants or defaults
  const sizes = product?.variants?.map((v: any) => v.size) || ["S", "M", "L", "XL", "XXL"];
  const colorsFromApi = product?.colors || ["Black", "White", "Red", "Blue", "Green"];
  
  const colorMap: Record<string, string> = {
    "Black": "#000000",
    "White": "#ffffff",
    "Red": "#f44336",
    "Blue": "#2196f3",
    "Green": "#4caf50",
    "golden": "#FFD700",
  };

  const colors = colorsFromApi.map((c: string) => ({
    name: c,
    code: colorMap[c] || "#888888" // Fallback color
  }));

  const handleQuantityChange = (type: "inc" | "dec") => {
    if (type === "inc") setQuantity((p) => p + 1);
    else if (type === "dec" && quantity > 1) setQuantity((p) => p - 1);
  };

  const getNumericPrice = (price: any) => {
    if (typeof price === "number") return price;
    if (!price) return 0;
    return parseFloat(String(price).replace(/[^0-9.]/g, ""));
  };

  const currentPrice = getNumericPrice(product?.price || 0);
  const totalPrice = (currentPrice * quantity).toFixed(2);

  const handleAddToCart = () => {
    addToCart({
      id: product._id || product.id,
      name: product.name,
      price: currentPrice, // Store numeric price
      image: product.image || product.images?.[0],
      quantity: quantity,
      size: selectedSize,
      color: selectedColor,
      totalPrice: totalPrice,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  useEffect(() => {
    if (product?.colors?.[0]) setSelectedColor(product.colors[0]);
    if (product?.variants?.[0]?.size) setSelectedSize(product.variants[0].size);
  }, [product]);

  return (
    <Box sx={{ color: "text.primary" }}>
      <Stack sx={{ flexDirection: "row", gap: 1, alignItems: "center", mb: 1 }}>
        <Typography variant="overline" sx={{ color: "primary.main", fontWeight: "bold" }}>
          {product?.category || "PREMIUM GEAR"}
        </Typography>
        <Chip label="In Stock" size="small" />
      </Stack>

      <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 2 }}>
        {product?.name}
      </Typography>

      <Stack sx={{ flexDirection: "row", gap: 1, alignItems: "center", mb: 3 }}>
        <Rating value={product?.rating || 4.5} precision={0.5} readOnly size="small" />
        <Typography variant="body2">(124 Reviews)</Typography>
      </Stack>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.main" }}>
          ${currentPrice}
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Typography variant="body1" sx={{ mb: 4 }}>
        {product?.description}
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
          Select Color
        </Typography>

        <Stack sx={{ flexDirection: "row", gap: 1.5, flexWrap: "wrap" }}>
          {colors.map((color: any) => (
            <Box
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              sx={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                cursor: "pointer",
                backgroundColor: color.code,
                border:
                  selectedColor === color.name
                    ? "3px solid #fff"
                    : "2px solid rgba(255,255,255,0.2)",
                outline:
                  selectedColor === color.name ? "2px solid #1976d2" : "none",
                transition: "all 0.2s",
                "&:hover": {
                  transform: "scale(1.15)",
                },
              }}
            />
          ))}
        </Stack>

        <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
          Selected: {selectedColor}
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
          Select Size
        </Typography>

        <Stack sx={{ flexDirection: "row", gap: 1.5 }}>
          {sizes.map((size: string) => (
            <Box
              key={size}
              onClick={() => setSelectedSize(size)}
              sx={{
                width: 45,
                height: 45,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border:
                  selectedSize === size
                    ? "1px solid #1976d2"
                    : "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <Typography variant="body2">{size}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
          Quantity
        </Typography>

        <Stack sx={{ flexDirection: "row", gap: 3, alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => handleQuantityChange("dec")}>
              <RemoveIcon />
            </IconButton>

            <Typography sx={{ width: 40, textAlign: "center" }}>
              {quantity}
            </Typography>

            <IconButton onClick={() => handleQuantityChange("inc")}>
              <AddIcon />
            </IconButton>
          </Box>
        </Stack>
      </Box>

      <Stack sx={{ flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleAddToCart}
          startIcon={<ShoppingCartIcon />}
        >
          {isAdded ? "Added to Cart!" : "Add to Cart"}
        </Button>

        <Button variant="outlined" fullWidth startIcon={<FlashOnIcon />}>
          Buy Now
        </Button>
      </Stack>
    </Box>
  );
};

export default ProductInfo;