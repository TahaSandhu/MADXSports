'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import DashboardLayout from '@/core/layout/dashboardLayout';
import { User } from '@/components/dashboard/types';

// Mock data - replace with actual API call
const mockUsers: User[] = [
  { id: '1', email: 'john.doe@example.com', name: 'John Doe', role: 'user', createdAt: new Date('2024-01-01') },
  { id: '2', email: 'jane.smith@example.com', name: 'Jane Smith', role: 'admin', createdAt: new Date('2024-01-15') },
  { id: '3', email: 'bob.wilson@example.com', name: 'Bob Wilson', role: 'user', createdAt: new Date('2024-02-01') },
  { id: '4', email: 'alice.brown@example.com', name: 'Alice Brown', role: 'user', createdAt: new Date('2024-02-10') },
  { id: '5', email: 'charlie.davis@example.com', name: 'Charlie Davis', role: 'user', createdAt: new Date('2024-03-01') },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <Box>
        <Typography variant="h4" sx={{ color: '#fff', mb: 3 }}>
          Registered Users
        </Typography>

        <Card>
          <CardContent>
            <Box sx={{ mb: 2 }}>
              <TextField
                placeholder="Search by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: '#888' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#333' },
                    '&:hover fieldset': { borderColor: '#ff0000' },
                  },
                }}
              />
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#888', fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ color: '#888', fontWeight: 'bold' }}>Role</TableCell>
                    <TableCell sx={{ color: '#888', fontWeight: 'bold' }}>Joined Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} sx={{ '&:hover': { backgroundColor: '#333' } }}>
                      <TableCell sx={{ color: '#fff' }}>{user.email}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.role}
                          size="small"
                          sx={{
                            bgcolor: user.role === 'admin' ? '#ff000020' : '#333',
                            color: user.role === 'admin' ? '#ff0000' : '#fff',
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: '#888' }}>
                        {user.createdAt.toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
}