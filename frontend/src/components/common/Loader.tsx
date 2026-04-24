import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        minHeight: '200px',
      }}
    >
      <Box sx={{ position: 'relative', width: 80, height: 80 }}>
        {/* Outer rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{
            width: '100%',
            height: '100%',
            border: '4px solid rgba(255, 255, 255, 0.1)',
            borderTopColor: '#ff0000', // MADX Red
            borderRadius: '50%',
            position: 'absolute',
          }}
        />
        
        {/* Inner pulsating circle */}
        <motion.div
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: '40%',
            height: '40%',
            backgroundColor: '#ff0000',
            borderRadius: '50%',
            position: 'absolute',
            top: '30%',
            left: '30%',
            boxShadow: '0 0 20px rgba(255, 0, 0, 0.5)',
          }}
        />
      </Box>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Typography
          variant="h6"
          sx={{
            mt: 3,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: 2,
            background: 'linear-gradient(45deg, #fff, #ff0000)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%, 100%': { opacity: 0.6 },
              '50%': { opacity: 1 },
            },
          }}
        >
          Loading Excellence
        </Typography>
      </motion.div>
    </Box>
  );
};

export default Loader;
