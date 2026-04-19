import React from 'react';
import { Grid, Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';
import { TrendingUp, TrendingDown, ShoppingBag, CheckCircle, Clock } from '@mui/icons-material';
import { DashboardStats } from './types';

interface StatsCardsProps {
  stats: DashboardStats;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const StatCard = ({ title, value, icon, trend, color }: any) => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ color: '#888' }}>
            {title}
          </Typography>
          <Box sx={{ 
            backgroundColor: `${color}20`, 
            borderRadius: '50%', 
            width: 48, 
            height: 48, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            {icon}
          </Box>
        </Box>
        <Typography variant="h4" sx={{ color: '#fff', mb: 1 }}>
          {value}
        </Typography>
        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {trend > 0 ? (
              <TrendingUp sx={{ color: '#00ff00', fontSize: 16 }} />
            ) : (
              <TrendingDown sx={{ color: '#ff0000', fontSize: 16 }} />
            )}
            <Typography variant="caption" sx={{ color: trend > 0 ? '#00ff00' : '#ff0000' }}>
              {Math.abs(trend)}% from last period
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Daily Orders"
          value={stats.dailyOrders}
          icon={<ShoppingBag sx={{ color: '#ff0000' }} />}
          trend={12}
          color="#ff0000"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Weekly Orders"
          value={stats.weeklyOrders}
          icon={<ShoppingBag sx={{ color: '#ff0000' }} />}
          trend={8}
          color="#ff0000"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Monthly Orders"
          value={stats.monthlyOrders}
          icon={<ShoppingBag sx={{ color: '#ff0000' }} />}
          trend={15}
          color="#ff0000"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Monthly Revenue"
          value={`$${stats.monthlyRevenue.toLocaleString()}`}
          icon={<TrendingUp sx={{ color: '#00ff00' }} />}
          trend={23}
          color="#00ff00"
        />
      </Grid>
    </Grid>
  );
}