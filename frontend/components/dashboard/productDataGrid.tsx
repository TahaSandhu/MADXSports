import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Chip,
  Stack,
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Edit, Delete, Add } from '@mui/icons-material';
import { Product } from './types';

interface ProductsDataGridProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export default function ProductsDataGrid({ products, onEdit, onDelete, onAdd }: ProductsDataGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const columns: GridColDef[] = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 90,
      renderCell: (params: GridRenderCellParams) => (
        <span style={{ color: '#888' }}>#{params.value?.slice(0, 8)}</span>
      )
    },
    { 
      field: 'name', 
      headerName: 'Product Name', 
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <span style={{ fontWeight: 'bold', color: '#fff' }}>{params.value}</span>
      )
    },
    { 
      field: 'category', 
      headerName: 'Category', 
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Chip 
          label={params.value} 
          size="small"
          sx={{ 
            bgcolor: '#ff000020', 
            color: '#ff0000',
            border: '1px solid #ff000040'
          }}
        />
      )
    },
    { 
      field: 'price', 
      headerName: 'Price', 
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <span style={{ color: '#00ff00' }}>${params.value?.toLocaleString()}</span>
      )
    },
    { 
      field: 'stock', 
      headerName: 'Stock', 
      width: 100,
      renderCell: (params: GridRenderCellParams) => {
        const stock = params.value;
        return (
          <span style={{ 
            color: stock > 10 ? '#00ff00' : stock > 0 ? '#ff6600' : '#ff0000'
          }}>
            {stock}
          </span>
        );
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction="row" spacing={1}>
          <IconButton 
            size="small" 
            onClick={() => onEdit(params.row)}
            sx={{ color: '#ff0000' }}
          >
            <Edit />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={() => onDelete(params.row.id)}
            sx={{ color: '#ff0000' }}
          >
            <Delete />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          sx={{ 
            flexGrow: 1,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#333' },
              '&:hover fieldset': { borderColor: '#ff0000' },
            },
          }}
        />
        
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Category"
          >
            {categories.map(cat => (
              <MenuItem key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={onAdd}
          sx={{ 
            bgcolor: '#ff0000',
            '&:hover': { bgcolor: '#cc0000' }
          }}
        >
          Add Product
        </Button>
      </Box>

      <DataGrid
        rows={filteredProducts}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        disableRowSelectionOnClick
        autoHeight
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #333',
            color: '#fff',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#1a1a1a',
            borderBottom: '2px solid #ff0000',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            color: '#fff',
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '1px solid #333',
            backgroundColor: '#1a1a1a',
          },
          '& .MuiTablePagination-root': {
            color: '#fff',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#333333',
          },
        }}
      />
    </Box>
  );
}