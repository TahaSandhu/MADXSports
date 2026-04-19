import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Header from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#000000', minHeight: '100vh' }}>
        <Header />
        {children}
      </Box>
    </Box>
  );
}