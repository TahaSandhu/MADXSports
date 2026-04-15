import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { HERO_SLIDES } from '@/core/constants';

const AUTO_PLAY_TIME = 5000;

const HeroCarousel = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () =>
    setActiveStep((prev) => (prev + 1) % HERO_SLIDES.length);

  const handlePrev = () =>
    setActiveStep((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  useEffect(() => {
    const timer = setInterval(handleNext, AUTO_PLAY_TIME);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '50vh', md: '60vh' },
        minHeight: 400,
        overflow: 'hidden',
      }}
    >
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === activeStep;

        return (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: isActive ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              pointerEvents: isActive ? 'auto' : 'none',
              backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                px: 3,
              }}
            >
              <Box
                sx={{
                  color: 'white',
                  maxWidth: 600,
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 1s ease',
                }}
              >
                <Typography variant="h2" sx={{ fontWeight: 'bold' }} gutterBottom>
                  {slide.title}
                </Typography>

                <Typography variant="h5" sx={{ mb: 3 }}>
                  {slide.description}
                </Typography>
              </Box>
            </Box>
          </Box>
        );
      })}

      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        {HERO_SLIDES.map((_, index) => {
          const isActive = index === activeStep;

          return (
            <Box
              key={index}
              onClick={() => setActiveStep(index)}
              sx={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                border: '2px solid white',
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
              }}
            >
              {isActive && (
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: 'white',
                    transformOrigin: 'left',
                    animation: `${AUTO_PLAY_TIME}ms linear forwards fill`,
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>

      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          top: '50%',
          left: 16,
          transform: 'translateY(-50%)',
          color: 'white',
          zIndex: 2,
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          top: '50%',
          right: 16,
          transform: 'translateY(-50%)',
          color: 'white',
          zIndex: 2,
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      <style>
        {`
          @keyframes fill {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
          }
        `}
      </style>
    </Box>
  );
};

export default HeroCarousel;