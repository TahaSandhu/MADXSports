import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Chip,
  TablePagination,
  CircularProgress,
  Alert
} from '@mui/material';
import axios from 'axios';

interface Customer {
  _id: string;
  fullName: string;
  email: string;
  isVerified: boolean;
  createdAt: string;
}

const CustomerTable: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/v1/customers/allCustomers');
      setCustomers(res.data);
      setError(null);
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Error loading customers');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h5" sx={{ color: '#fff', fontWeight: 'bold', mb: 3 }}>
        Customer Directory
      </Typography>
      <Paper sx={{ width: '100%', overflow: 'hidden', bgcolor: '#0d0d0d', border: '1px solid #1f1f1f' }}>
        <TableContainer sx={{ maxHeight: 'calc(100vh - 220px)' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ '& th': { bgcolor: '#0d0d0d', color: '#888', borderBottom: '1px solid #1f1f1f' } }}>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Joined Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ color: '#666', py: 8 }}>
                    No customers found.
                  </TableCell>
                </TableRow>
              ) : (
                customers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((customer) => (
                    <TableRow key={customer._id} sx={{ '& td': { color: '#fff', borderBottom: '1px solid #1f1f1f' } }}>
                      <TableCell sx={{ fontWeight: 'medium' }}>{customer.fullName}</TableCell>
                      <TableCell sx={{ color: '#aaa !important' }}>{customer.email}</TableCell>
                      <TableCell>
                        <Chip
                          label={customer.isVerified ? 'Verified' : 'Unverified'}
                          color={customer.isVerified ? 'success' : 'default'}
                          size="small"
                          sx={{
                            bgcolor: customer.isVerified ? 'rgba(76, 175, 80, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                            color: customer.isVerified ? '#4caf50' : '#888',
                            border: '1px solid',
                            borderColor: customer.isVerified ? 'rgba(76, 175, 80, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: '#888 !important' }}>
                        {new Date(customer.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={customers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            color: '#888',
            borderTop: '1px solid #1f1f1f',
            '& .MuiTablePagination-actions': { color: '#fff' },
            '& .MuiSelect-select': { color: '#fff' },
          }}
        />
      </Paper>
    </Box>
  );
};

export default CustomerTable;
