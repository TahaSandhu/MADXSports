import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { HERO_SLIDES } from '@/core/constants';



export default function HeroCarousel() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prev) => (prev + 1) % HERO_SLIDES.length);
  const handlePrev = () => setActiveStep((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '60vh', overflow: 'hidden' }}>
      {HERO_SLIDES.map((slide, index) => (
        <Box
          key={index}
          sx={{
            display: index === activeStep ? 'block' : 'none',
            height: '100%',
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              textAlign: 'center',
              p: 3,
            }}
          >
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 'bold',
                fontSize: { xs: '2.5rem', md: '3.75rem' } // Responsive font size
              }} 
              gutterBottom
            >
              {slide.title}
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 4,
                fontSize: { xs: '1.1rem', md: '1.5rem' } // Responsive font size
              }}
            >
              {slide.description}
            </Typography>
            <Button variant="contained" color="primary" size="large">
              Shop Now
            </Button>
          </Box>
        </Box>
      ))}
      <IconButton
        onClick={handlePrev}
        sx={{ position: 'absolute', top: '50%', left: 16, transform: 'translateY(-50%)', color: 'white', bgcolor: 'rgba(0,0,0,0.3)', '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' } }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{ position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)', color: 'white', bgcolor: 'rgba(0,0,0,0.3)', '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' } }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
}
