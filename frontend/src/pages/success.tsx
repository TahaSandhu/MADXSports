import React, { useEffect, ReactElement } from 'react';
import { Box, Typography, Button, Container, Paper, Stack, Zoom } from '@mui/material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { useRouter } from 'next/router';
import { useCart } from '@/core/context/CartContext';
import LoginLayout from "@/core/layout/loginLayout";

const SuccessPage = () => {
  const router = useRouter();
  const { clearCart } = useCart();

  const handleNavigateToHome = () => {
    clearCart();
    router.push('/');
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #010101ff 0%, #030202ff 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "200%",
          height: "200%",
          backgroundSize: "40px 40px",
          animation: "slide 20s linear infinite",
          "@keyframes slide": {
            "0%": { transform: "translate(0, 0)" },
            "100%": { transform: "translate(40px, 40px)" },
          },
        }}
      />

      <Zoom in timeout={500}>
        <Container maxWidth="sm">
          <Paper
            elevation={24}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 4,
              background: "#1a1a1a",
              position: "relative",
              overflow: "hidden",
              border: "1px solid rgba(255,0,0,0.3)",
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: "linear-gradient(90deg, #ff0000 0%, #8b0000 100%)",
              }}
            />

            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Box
                sx={{
                  width: 140,
                  height: 100,
                  margin: "0 auto 16px",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  src="/logoH.png"
                  alt="Logo"
                  sx={{ cursor: "pointer", width: "100%", height: "100%" }}
                  onClick={() => router.push("/")}
                />
              </Box>
            </Box>

            <Stack sx={{ gap: 4, alignItems: 'center' }}>
              <Box>
                <CheckCircleOutlinedIcon 
                  sx={{ 
                    fontSize: 80, 
                    color: '#ff0000',
                    filter: 'drop-shadow(0 0 20px rgba(255, 0, 0, 0.4))'
                  }} 
                />
              </Box>

              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#ffffff", mb: 1 }}>
                  Payment Successful
                </Typography>
                <Typography variant="body1" sx={{ color: "#b0b0b0", mb: 2 }}>
                  Thank you for your purchase!
                </Typography>
                <Typography variant="body1" sx={{ color: '#ff4444', fontWeight: 600 }}>
                  Please check your payment is delivered
                </Typography>
              </Box>

              <Typography variant="body2" sx={{ color: "#b0b0b0", maxWidth: '90%', mx: 'auto' }}>
                We've received your order and are processing it. You'll receive a confirmation email shortly.
              </Typography>

              <Button
                fullWidth
                variant="contained"
                onClick={handleNavigateToHome}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "1rem",
                  background: "linear-gradient(135deg, #ff0000 0%, #8b0000 100%)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #cc0000 0%, #660000 100%)",
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Back to Main Page
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Zoom>
    </Box>
  );
};

SuccessPage.getLayout = function (page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

export default SuccessPage;
