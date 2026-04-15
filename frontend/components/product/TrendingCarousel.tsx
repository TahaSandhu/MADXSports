import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Box,
  Typography,
  Container,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SimpleProductCard from "./SimpleProductCard";
import { TRENDING_PRODUCTS } from "@/core/constants";

const TrendingCarousel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const itemsToShow = isMobile ? 1 : isTablet ? 2 : 4;

  const maxIndex = Math.max(0, TRENDING_PRODUCTS.length - itemsToShow);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(Math.floor(maxIndex / 2));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    const timer = setInterval(handleNext, 3500);
    return () => clearInterval(timer);
  }, [handleNext]);

  const translateX = useMemo(
    () => -(currentIndex * (100 / itemsToShow)),
    [currentIndex, itemsToShow]
  );

  return (
    <Box sx={{ py: 8, bgcolor: "background.default", overflow: "hidden" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: "bold",
              display: "inline-block",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -8,
                left: "25%",
                width: "50%",
                height: 4,
                bgcolor: "primary.main",
              },
            }}
          >
            Trending Products
          </Typography>
        </Box>

        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={handlePrev}
            sx={{
              position: "absolute",
              left: -20,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              bgcolor: "rgba(0,0,0,0.5)",
              color: "white",
              "&:hover": { bgcolor: "primary.main" },
              display: { xs: "none", md: "flex" },
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: -20,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              bgcolor: "rgba(0,0,0,0.5)",
              color: "white",
              "&:hover": { bgcolor: "primary.main" },
              display: { xs: "none", md: "flex" },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>

          <Box sx={{ overflow: "hidden", mx: -1.5 }}>
            <Box
              sx={{
                display: "flex",
                transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: `translateX(${translateX}%)`,
              }}
            >
              {TRENDING_PRODUCTS.map((product) => (
                <Box
                  key={product.id}
                  sx={{
                    flex: `0 0 ${100 / itemsToShow}%`,
                    px: 1.5,
                    boxSizing: "border-box",
                  }}
                >
                  <SimpleProductCard
                    product={product}
                    isDiscription={product.isDiscription || false}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TrendingCarousel;