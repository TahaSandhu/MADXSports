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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { useCart } from "@/core/context/CartContext";
import { useRouter } from "next/router";
import SizeChartModal from "./SizeChartModal";

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
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

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

      <Box sx={{ mb: 4 }}>
        <Accordion 
          defaultExpanded 
          elevation={0} 
          sx={{ 
            bgcolor: 'transparent', 
            '&:before': { display: 'none' },
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)' 
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}>
            <Typography sx={{ fontWeight: 'bold' }}>Description</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              {product?.description}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion 
          elevation={0} 
          sx={{ 
            bgcolor: 'transparent', 
            '&:before': { display: 'none' },
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)' 
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}>
            <Typography sx={{ fontWeight: 'bold' }}>Shipping & Return Policy</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="subtitle2" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <LocalShippingIcon fontSize="small" /> Delivery
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Global Delivery will be within 13-15 business days depending on your location.
                </Typography>
                <Link href="#" sx={{ fontSize: '0.75rem', color: 'primary.main', mt: 0.5, display: 'inline-block' }}>
                  Click here for heavy items delivery rates
                </Link>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <VerifiedUserIcon fontSize="small" /> Returns
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  In case you are not satisfied with the product or due to any other reason, you may return the item to us for a 100% refund.
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  For returning a heavy item, a collection will be arranged at your doorstep or a prepaid return label will be provided.
                </Typography>
                <Link href="#" sx={{ fontSize: '0.75rem', color: 'primary.main', mt: 0.5, display: 'inline-block' }}>
                  Click here to initiate return
                </Link>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>

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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Select Size
          </Typography>
          <Link 
            component="button" 
            variant="body2" 
            onClick={() => setIsSizeChartOpen(true)}
            sx={{ 
              color: 'primary.main', 
              textDecoration: 'none', 
              fontWeight: 500,
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            Size Chart
          </Link>
        </Box>

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

      <Stack sx={{ flexDirection: { xs: "column", sm: "row" }, gap: 2, mt: 4 }}>
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

      <Box 
        sx={{ 
          mt: 4, 
          p: 2, 
          borderRadius: 2, 
          bgcolor: 'rgba(255, 255, 255, 0.03)', 
          border: '1px solid rgba(255, 255, 255, 0.05)' 
        }}
      >
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <WorkspacePremiumIcon color="primary" />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              30-Day Return Guarantee
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <VerifiedUserIcon color="primary" />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Free and Easy Returns
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SupportAgentIcon color="primary" />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              24/7 Professional Customer Care
            </Typography>
          </Box>
        </Stack>
      </Box>

      <SizeChartModal 
        open={isSizeChartOpen} 
        onClose={() => setIsSizeChartOpen(false)} 
      />
    </Box>
  );
};

export default ProductInfo;