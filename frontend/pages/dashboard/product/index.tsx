'use client';

import React, { useState } from 'react';
import { Box, Typography, Alert, Snackbar } from '@mui/material';
import { Product } from '@/components/dashboard/types';
import { useProducts } from '@/hooks/useProduct';
import DashboardLayout from '@/core/layout/dashboardLayout';
import ProductsDataGrid from '@/components/dashboard/productDataGrid';
import ProductForm from '@/components/dashboard/productForm';

export default function ProductsPage() {
  const { products, loading, error, createProduct, updateProduct, deleteProduct } = useProducts();
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const handleAdd = () => {
    setEditingProduct(undefined);
    setFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setSnackbar({ open: true, message: 'Product deleted successfully', severity: 'success' });
      } catch (err) {
        setSnackbar({ open: true, message: 'Failed to delete product', severity: 'error' });
      }
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, data);
        setSnackbar({ open: true, message: 'Product updated successfully', severity: 'success' });
      } else {
        await createProduct(data);
        setSnackbar({ open: true, message: 'Product created successfully', severity: 'success' });
      }
    } catch (err) {
      setSnackbar({ open: true, message: 'Operation failed', severity: 'error' });
    }
  };

  return (
    <DashboardLayout>
      <Box>
        <Typography variant="h4" sx={{ color: '#fff', mb: 3 }}>
          Products Management
        </Typography>

        <ProductsDataGrid
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
        />

        <ProductForm
          open={formOpen}
          onClose={() => setFormOpen(false)}
          onSubmit={handleSubmit}
          initialData={editingProduct}
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </DashboardLayout>
  );
}