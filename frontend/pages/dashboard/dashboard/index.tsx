'use client';

import React from 'react';
import { Grid, Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';

import DashboardLayout from '@/core/layout/dashboardLayout';
import StatsCards from '@/components/dashboard/statecard';
import { DashboardStats, Order } from '@/components/dashboard/types';

// Mock data - replace with actual API calls
const mockStats: DashboardStats = {
  dailyOrders: 24,
  weeklyOrders: 156,
  monthlyOrders: 642,
  dailyRevenue: 2450,
  weeklyRevenue: 15890,
  monthlyRevenue: 65420,
  pendingOrders: 12,
  deliveredOrders: 630,
  totalProducts: 154,
  totalUsers: 1234,
};

const recentOrders: Order[] = [
  { id: '1', customerName: 'John Doe', customerEmail: 'john@example.com', total: 299.99, status: 'pending', items: 3, createdAt: new Date() },
  { id: '2', customerName: 'Jane Smith', customerEmail: 'jane@example.com', total: 149.50, status: 'processing', items: 2, createdAt: new Date() },
  { id: '3', customerName: 'Bob Johnson', customerEmail: 'bob@example.com', total: 599.99, status: 'delivered', items: 5, createdAt: new Date() },
  { id: '4', customerName: 'Alice Brown', customerEmail: 'alice@example.com', total: 89.99, status: 'pending', items: 1, createdAt: new Date() },
  { id: '5', customerName: 'Charlie Wilson', customerEmail: 'charlie@example.com', total: 449.99, status: 'delivered', items: 4, createdAt: new Date() },
];

export default function DashboardPage() {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return '#ff6600';
      case 'processing': return '#0066ff';
      case 'delivered': return '#00ff00';
      case 'cancelled': return '#ff0000';
      default: return '#888';
    }
  };

  return (
    <DashboardLayout>
      <Box>
        <StatsCards stats={mockStats} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
                  Recent Orders
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: '#888', fontWeight: 'bold' }}>Order ID</TableCell>
                        <TableCell sx={{ color: '#888', fontWeight: 'bold' }}>Customer</TableCell>
                        <TableCell sx={{ color: '#888', fontWeight: 'bold' }}>Items</TableCell>
                        <TableCell sx={{ color: '#888', fontWeight: 'bold' }}>Total</TableCell>
                        <TableCell sx={{ color: '#888', fontWeight: 'bold' }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentOrders.map((order) => (
                        <TableRow key={order.id} sx={{ '&:hover': { backgroundColor: '#333' } }}>
                          <TableCell sx={{ color: '#fff' }}>#{order.id}</TableCell>
                          <TableCell sx={{ color: '#fff' }}>{order.customerName}</TableCell>
                          <TableCell sx={{ color: '#fff' }}>{order.items}</TableCell>
                          <TableCell sx={{ color: '#00ff00' }}>${order.total}</TableCell>
                          <TableCell>
                            <Chip 
                              label={order.status} 
                              size="small"
                              sx={{ 
                                bgcolor: `${getStatusColor(order.status)}20`,
                                color: getStatusColor(order.status),
                                textTransform: 'capitalize'
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
                  Order Summary
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ color: '#888' }}>Pending Orders:</Typography>
                    <Typography sx={{ color: '#ff6600', fontWeight: 'bold' }}>
                      {mockStats.pendingOrders}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: '#888' }}>Delivered Orders:</Typography>
                    <Typography sx={{ color: '#00ff00', fontWeight: 'bold' }}>
                      {mockStats.deliveredOrders}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}