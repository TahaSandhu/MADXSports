import React from "react";
import { Box, Typography, Container } from "@mui/material";
import SimpleProductCard from "./SimpleProductCard";

interface ScrollableProductSectionProps {
  title: string;
  products: any[];
}

const ScrollableProductSection: React.FC<ScrollableProductSectionProps> = ({
  title,
  products,
}) => {
  return (
    <Box sx={{ py: 6, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: "bold",
            mb: 3,
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -8,
              left: 0,
              width: 60,
              height: 4,
              bgcolor: "primary.main",
            },
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            overflowX: "auto",
            pb: 2,
            px: 1,
            scrollBehavior: "smooth",

            "&::-webkit-scrollbar": {
              height: 8,
            },
            "&::-webkit-scrollbar-track": {
              bgcolor: "rgba(255,255,255,0.05)",
              borderRadius: 10,
            },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "primary.main",
              borderRadius: 10,
            },
          }}
        >
          {products?.map((product) => (
            <Box
              key={product.id}
              sx={{
                width: 400,
                minWidth: { xs: 280, sm: 400 },
              }}
            >
              <SimpleProductCard
                product={product}
                isDiscription={product.isDiscription}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ScrollableProductSection;
