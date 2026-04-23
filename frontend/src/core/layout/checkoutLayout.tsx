// app/checkout/layout.tsx
import { Box, Container, Typography } from "@mui/material";

const CheckoutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              mb: 1,
            }}
          >
            Secure Checkout
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Complete your purchase securely
          </Typography>
        </Box>
        {children}
      </Container>
    </Box>
  );
};

export default CheckoutLayout;
