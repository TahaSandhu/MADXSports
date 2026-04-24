import React from 'react';
import { 
  Modal, 
  Box, 
  Typography, 
  IconButton, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface SizeChartModalProps {
  open: boolean;
  onClose: () => void;
}

const SizeChartModal = ({ open, onClose }: SizeChartModalProps) => {
  const sizes = [
    { size: 'S', chest: '34-36', waist: '28-30', length: '27' },
    { size: 'M', chest: '38-40', waist: '32-34', length: '28' },
    { size: 'L', chest: '42-44', waist: '36-38', length: '29' },
    { size: 'XL', chest: '46-48', waist: '40-42', length: '30' },
    { size: 'XXL', chest: '50-52', waist: '44-46', length: '31' },
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: 500 },
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 24,
        p: 4,
        color: 'text.primary',
        outline: 'none',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Size Guide
          </Typography>
          <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          All measurements are in inches. Please note that actual measurements may vary slightly by product.
        </Typography>

        <TableContainer component={Paper} elevation={0} sx={{ bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Size</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Chest</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Waist</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Length</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sizes.map((row) => (
                <TableRow key={row.size}>
                  <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>{row.size}</TableCell>
                  <TableCell>{row.chest}</TableCell>
                  <TableCell>{row.waist}</TableCell>
                  <TableCell>{row.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(255, 0, 0, 0.05)', borderRadius: 2 }}>
          <Typography variant="caption" sx={{ display: 'block', color: 'primary.main', fontWeight: 'bold' }}>
            Pro Tip:
          </Typography>
          <Typography variant="caption" color="text.secondary">
            If you're between sizes, we recommend going one size up for a more comfortable fit.
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default SizeChartModal;
