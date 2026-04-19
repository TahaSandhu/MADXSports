import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Avatar, Box } from '@mui/material';
import { Notifications, Mail, AccountCircle } from '@mui/icons-material';

export default function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none', mb: 3 }}>
      <Toolbar sx={{ px: { xs: 0 } }}>
        <Typography variant="h4" sx={{ flexGrow: 1, color: '#fff', fontWeight: 'bold' }}>
          Dashboard Overview
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton sx={{ color: '#fff' }}>
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          
          <IconButton sx={{ color: '#fff' }}>
            <Badge badgeContent={2} color="error">
              <Mail />
            </Badge>
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ bgcolor: '#ff0000' }}>
              <AccountCircle />
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ color: '#fff' }}>
                Admin User
              </Typography>
              <Typography variant="caption" sx={{ color: '#888' }}>
                admin@ecom.com
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}