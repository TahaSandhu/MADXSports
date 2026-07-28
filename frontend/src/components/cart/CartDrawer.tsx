
import React, { useContext } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "@/core/context/CartContext";
import { CurrencyContext } from "@/core/context/CurrencyContext";
import { PROTECTED_ROUTES } from "@/core/routes";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { currency } = useContext(CurrencyContext);
  const router = useRouter();
  console.log("t1 cartItems: ", cartItems);

  const getNumericPrice = (price: any) => {
    if (typeof price === "number") return price;
    if (!price) return 0;
    return parseFloat(String(price).replace(/[^0-9.]/g, ""));
  };

  const formatPrice = (price: any, qty: number) => {
    const base = getNumericPrice(price);
    const num = base * qty;
    switch (currency) {
      case "EUR":
        return `€${(num * 0.92).toFixed(2)}`;
      case "GBP":
        return `£${(num * 0.79).toFixed(2)}`;
      case "CAD":
        return `C$${(num * 1.35).toFixed(2)}`;
      case "PKR":
        return `Rs ${(num * 278).toFixed(0)}`;
      default:
        return `$${num.toFixed(2)}`;
    }
  };

  const calculateTotal = () => {
    const totalBase = cartItems.reduce((acc, item) => {
      return acc + getNumericPrice(item.price) * item.quantity;
    }, 0);

    switch (currency) {
      case "EUR":
        return `€${(totalBase * 0.92).toFixed(2)}`;
      case "GBP":
        return `£${(totalBase * 0.79).toFixed(2)}`;
      case "CAD":
        return `C$${(totalBase * 1.35).toFixed(2)}`;
      case "PKR":
        return `Rs ${(totalBase * 278).toFixed(0)}`;
      default:
        return `$${totalBase.toFixed(2)}`;
    }
  };

  const handleCheckout = () => {
    toast.error("Checkout is temporarily disabled. Please contact us to complete your order.");
    onClose();
    router.push("/contact");
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: { xs: "100vw", sm: 400 },
          p: 3,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Shopping Cart
          </Typography>
          <IconButton onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </IconButton>
        </Box>

        <Divider />

        <List sx={{ flexGrow: 1, overflowY: "auto", mt: 2 }}>
          {cartItems.length === 0 ? (
            <Box sx={{ mt: 10, textAlign: "center" }}>
              <i
                className="fa-solid fa-cart-shopping"
                style={{ fontSize: "3rem", color: "#ccc" }}
              ></i>
              <Typography color="text.secondary">Your cart is empty</Typography>
            </Box>
          ) : (
            cartItems.map((item) => (
              <React.Fragment key={`${item.id}-${item.size}-${item.color}`}>
                <ListItem
                  alignItems="flex-start"
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => removeFromCart(item.id, item.size, item.color)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  }
                  sx={{ px: 0 }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={item.image}
                      variant="rounded"
                      sx={{ width: 60, height: 60, mr: 2 }}
                    />
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {item.name}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography
                          variant="body2"
                          color="primary"
                          sx={{ fontWeight: "medium", mt: 0.5 }}
                        >
                          {formatPrice(item.price, 1)}
                        </Typography>

                        <Typography
                          variant="caption"
                          sx={{ display: "block", mt: 0.5 }}
                        >
                          Size: {item.size || "N/A"} | Color:{" "}
                          {item.color || "N/A"}
                        </Typography>

                        <Box
                          sx={{ display: "flex", alignItems: "center", mt: 1 }}
                        >
                          <IconButton
                            size="small"
                            onClick={() => updateQuantity(item.id, -1, item.size, item.color)}
                          >
                            <RemoveIcon fontSize="inherit" />
                          </IconButton>

                          <Typography sx={{ mx: 1.5 }}>
                            {item.quantity}
                          </Typography>

                          <IconButton
                            size="small"
                            onClick={() => updateQuantity(item.id, 1, item.size, item.color)}
                          >
                            <AddIcon fontSize="inherit" />
                          </IconButton>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>

                <Divider component="li" />
              </React.Fragment>
            ))
          )}
        </List>

        {cartItems.length > 0 && (
          <Box sx={{ pt: 3, borderTop: "2px solid #f5f5f5" }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="h6">Total</Typography>
              <Typography
                variant="h6"
                color="primary"
                sx={{ fontWeight: "bold" }}
              >
                {calculateTotal()}
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleCheckout}
            >
              Checkout Now
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
