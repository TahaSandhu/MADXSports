import React, { useState } from "react";
import { Box, Paper, IconButton, useTheme } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface ProductImageProps {
  images: string[];
}

const ProductImage: React.FC<ProductImageProps> = ({ images }) => {
  const theme = useTheme();
  const [activeImage, setActiveImage] = useState(0);

  const handleNext = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          height: { xs: 350, md: 500 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
          overflow: "hidden",
          bgcolor: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          position: "relative",
          "&:hover .navigation-btns": {
            opacity: 1,
          },
        }}
      >
        <Box
          component="img"
          src={images[activeImage]}
          alt="Product Image"
          sx={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            p: 2,
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />

        {images.length > 1 && (
          <Box
            className="navigation-btns"
            sx={{
              position: "absolute",
              top: "50%",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              px: 2,
              transform: "translateY(-50%)",
              opacity: { xs: 1, md: 0 },
              transition: "opacity 0.3s",
              pointerEvents: "none",
            }}
          >
            <IconButton
              onClick={handlePrev}
              sx={{
                bgcolor: "background.paper",
                boxShadow: 2,
                pointerEvents: "auto",
                "&:hover": { bgcolor: "primary.main", color: "white" },
              }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                bgcolor: "background.paper",
                boxShadow: 2,
                pointerEvents: "auto",
                "&:hover": { bgcolor: "primary.main", color: "white" },
              }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Paper>

      {images.length > 1 && (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 2,
            overflowX: "auto",
            pb: 1,
            "&::-webkit-scrollbar": { height: 4 },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "rgba(255,255,255,0.1)",
              borderRadius: 2,
            },
          }}
        >
          {images.map((img, index) => (
            <Box
              key={index}
              onClick={() => setActiveImage(index)}
              sx={{
                width: 80,
                height: 80,
                minWidth: 80,
                borderRadius: 2,
                cursor: "pointer",
                border: `2px solid ${
                  activeImage === index ? theme.palette.primary.main : "transparent"
                }`,
                overflow: "hidden",
                bgcolor: "rgba(255, 255, 255, 0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                "&:hover": {
                  boxShadow: "0 0 10px rgba(255, 23, 68, 0.5)",
                },
              }}
            >
              <Box
                component="img"
                src={img}
                alt={`Thumbnail ${index}`}
                sx={{
                  maxWidth: "90%",
                  maxHeight: "90%",
                  objectFit: "contain",
                }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProductImage;
