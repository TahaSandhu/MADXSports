import React from "react";
import {
  Box,
  Typography,
  Container,
  Link,
  Grid,
  IconButton,
  useTheme,
} from "@mui/material";

const Footer = () => {
  const { palette } = useTheme();
  const isDarkMode = palette.mode === "dark";

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        py: 6,
        mt: "auto",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} sx={{ justifyContent: "space-between" }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box
              component="img"
              src="/logof.png"
              alt="MADXSports Logo"
              sx={{
                height: 70,
                width: "auto",
                mb: 2,
              }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              The premium destination for all your sports and combat gear needs.
            </Typography>
            <Box sx={{ mb: "1rem" }}>
              <Typography
                variant="h6"
                color="primary"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                Addresses
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                <strong>UK Office:</strong>
                <br />
                246 Beechwood Road, Luton, UK
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                <strong>Manufacturing Unit 1:</strong>
                <br />
                UC New Adalat Garh Mohal Kingra, Sialkot
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Manufacturing Unit 2:</strong>
                <br />
                Sheikhupura Road, Faisalabad
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <IconButton
                color="primary"
                size="small"
                component="a"
                href="https://facebook.com"
                target="_blank"
              >
                <i className="fa-brands fa-facebook"></i>
              </IconButton>
              <IconButton
                color="primary"
                size="small"
                component="a"
                href="https://instagram.com"
                target="_blank"
              >
                <i className="fa-brands fa-instagram"></i>
              </IconButton>
              <IconButton
                color="primary"
                size="small"
                component="a"
                href="https://tiktok.com"
                target="_blank"
              >
                <i className="fa-brands fa-tiktok"></i>
              </IconButton>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 3 }}>
            <Typography
              variant="h6"
              color="primary"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Customer Service
            </Typography>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              sx={{ display: "block", mb: 1, fontSize: "0.9rem" }}
            >
              Track Order
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              sx={{ display: "block", mb: 1, fontSize: "0.9rem" }}
            >
              Shipping Policy
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              sx={{ display: "block", mb: 1, fontSize: "0.9rem" }}
            >
              Returns & Exchanges
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              sx={{ display: "block", mb: 1, fontSize: "0.9rem" }}
            >
              FAQs
            </Link>
          </Grid>

          <Grid size={{ xs: 12, sm: 3 }}>
            <Typography
              variant="h6"
              color="primary"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Useful Links
            </Typography>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              sx={{ display: "block", mb: 1, fontSize: "0.9rem" }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              sx={{ display: "block", mb: 1, fontSize: "0.9rem" }}
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              sx={{ display: "block", mb: 1, fontSize: "0.9rem" }}
            >
              Contact Us
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              sx={{ display: "block", mb: 1, fontSize: "0.9rem" }}
            >
              About Brand
            </Link>
          </Grid>
        </Grid>

        <Box
          sx={{ mt: 5, pt: 3, borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <Typography variant="body2" color="text.secondary" align="center">
            {"© "}
            {new Date().getFullYear()} MADXSports. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
export default Footer;