import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const TrendingBar: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
      }}
    >
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: 'linear',
        }}
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          gap: '40px',
          alignItems: 'center',
        }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Zap size={14} fill="currentColor" />
            <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5 }}>
              Flash Sale! Up to 50% Off Trending Tech — Limited Edition Drops — New Premium Fashion 2026
            </Typography>
            <Button
              size="small"
              sx={{
                bgcolor: 'black',
                color: 'white',
                fontSize: '0.6rem',
                minWidth: 'auto',
                px: 2,
                '&:hover': { bgcolor: '#222' }
              }}
            >
              Shop Now
            </Button>
          </Box>
        ))}
      </motion.div>
    </Box>
  );
};

export default TrendingBar;
