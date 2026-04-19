import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ShoppingBag as OrdersIcon,
  Inventory as ProductsIcon,
  People as UsersIcon,
  Image as HeroIcon,
  Logout as LogoutIcon,
  LocalShipping as ParcelIcon,
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';

const drawerWidth = 280;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Orders', icon: <OrdersIcon />, path: '/dashboard/orders' },
  { text: 'Products', icon: <ProductsIcon />, path: '/dashboard/products' },
  { text: 'Users', icon: <UsersIcon />, path: '/dashboard/users' },
  { text: 'Hero Section', icon: <HeroIcon />, path: '/dashboard/hero' },
  { text: 'Parcel Confirmation', icon: <ParcelIcon />, path: '/dashboard/parcel' },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    // Add your logout logic here
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#000000',
          borderRight: '1px solid #333333',
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ color: '#ff0000', fontWeight: 'bold' }}>
          ECOM DASH
        </Typography>
        <Typography variant="caption" sx={{ color: '#888' }}>
          Admin Panel v1.0
        </Typography>
      </Box>
      
      <Divider sx={{ backgroundColor: '#333' }} />
      
      <List sx={{ px: 2, py: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={pathname === item.path}
              onClick={() => router.push(item.path)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                '&.Mui-selected': {
                  backgroundColor: '#ff0000',
                  '&:hover': {
                    backgroundColor: '#cc0000',
                  },
                },
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}
            >
              <ListItemIcon sx={{ color: pathname === item.path ? '#fff' : '#ff0000' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />
      
      <Divider sx={{ backgroundColor: '#333' }} />
      
      <List sx={{ px: 2, py: 2 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              '&:hover': {
                backgroundColor: '#ff0000',
              },
            }}
          >
            <ListItemIcon sx={{ color: '#ff0000' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}