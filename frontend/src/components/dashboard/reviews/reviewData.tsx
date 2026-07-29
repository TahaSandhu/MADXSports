import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Typography,
  Rating,
  TablePagination,
  CircularProgress,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatarUrl?: string;
  productId: {
    _id: string;
    name: string;
    images?: string[];
  } | null;
}

interface Product {
  _id: string;
  name: string;
}

const ReviewTable: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Modals state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);

  // Form fields
  const [formProductId, setFormProductId] = useState('');
  const [formAuthorName, setFormAuthorName] = useState('');
  const [formRating, setFormRating] = useState<number>(5);
  const [formComment, setFormComment] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [reviewsRes, productsRes] = await Promise.all([
        axios.get('/api/v1/reviews/allReviews'),
        axios.get('/api/v1/products/allProducts')
      ]);
      setReviews(reviewsRes.data);
      setProducts(productsRes.data);
      setError(null);
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Error loading dashboard reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setIsEditMode(false);
    setSelectedReviewId(null);
    setFormProductId(products[0]?._id || '');
    setFormAuthorName('');
    setFormRating(5);
    setFormComment('');
    setDialogOpen(true);
  };

  const handleOpenEdit = (review: Review) => {
    setIsEditMode(true);
    setSelectedReviewId(review._id);
    setFormProductId(review.productId?._id || '');
    setFormAuthorName(review.name);
    setFormRating(review.rating);
    setFormComment(review.comment);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await axios.delete(`/api/v1/reviews/delete/${id}`);
        setReviews(reviews.filter(r => r._id !== id));
      } catch (err: any) {
        alert(err?.response?.data?.message || 'Error deleting review');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formAuthorName || !formComment || (!isEditMode && !formProductId)) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      if (isEditMode && selectedReviewId) {
        // Update review
        await axios.put(`/api/v1/reviews/update/${selectedReviewId}`, {
          name: formAuthorName,
          rating: formRating,
          comment: formComment
        });
      } else {
        // Create review
        await axios.post('/api/v1/reviews/addreviews', {
          name: formAuthorName,
          rating: formRating,
          comment: formComment,
          productId: formProductId
        });
      }
      setDialogOpen(false);
      loadData();
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Error saving review');
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 'bold' }}>
          Customer Reviews Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
          sx={{
            bgcolor: '#ff1744',
            fontWeight: 'bold',
            '&:hover': { bgcolor: '#d32f2f' }
          }}
        >
          Add Review
        </Button>
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden', bgcolor: '#0d0d0d', border: '1px solid #1f1f1f' }}>
        <TableContainer sx={{ maxHeight: 'calc(100vh - 220px)' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ '& th': { bgcolor: '#0d0d0d', color: '#888', borderBottom: '1px solid #1f1f1f' } }}>
                <TableCell>Product</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Comment</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reviews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ color: '#666', py: 8 }}>
                    No reviews found.
                  </TableCell>
                </TableRow>
              ) : (
                reviews
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((review) => (
                    <TableRow key={review._id} sx={{ '& td': { color: '#fff', borderBottom: '1px solid #1f1f1f' } }}>
                      <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {review.productId?.images && review.productId.images.length > 0 ? (
                          <img
                            src={review.productId.images[0]}
                            alt={review.productId.name}
                            style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }}
                          />
                        ) : (
                          <Box sx={{ width: 40, height: 40, bgcolor: '#222', borderRadius: 4 }} />
                        )}
                        <Typography sx={{ color: '#fff', fontSize: '0.875rem' }}>
                          {review.productId?.name || 'Deleted Product'}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'medium' }}>{review.name}</TableCell>
                      <TableCell>
                        <Rating value={review.rating} readOnly size="small" />
                      </TableCell>
                      <TableCell sx={{ color: '#aaa !important', maxWidth: 300, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {review.comment}
                      </TableCell>
                      <TableCell sx={{ color: '#888 !important' }}>
                        {new Date(review.date || review.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                          <IconButton onClick={() => handleOpenEdit(review)} sx={{ color: '#ff1744' }}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(review._id)} sx={{ color: '#f44336' }}>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
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
          count={reviews.length}
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

      {/* Create / Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { bgcolor: '#0d0d0d', color: '#fff', border: '1px solid #1f1f1f' }
        }}
      >
        <DialogTitle sx={{ borderBottom: '1px solid #1f1f1f', fontWeight: 'bold' }}>
          {isEditMode ? 'Edit Review' : 'Create New Review'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 3 }}>
            {!isEditMode && (
              <FormControl fullWidth size="small">
                <InputLabel id="select-product-label" sx={{ color: '#888' }}>Product</InputLabel>
                <Select
                  labelId="select-product-label"
                  value={formProductId}
                  label="Product"
                  onChange={(e) => setFormProductId(e.target.value)}
                  sx={{
                    color: '#fff',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#333' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ff1744' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ff1744' }
                  }}
                >
                  {products.map((p) => (
                    <MenuItem key={p._id} value={p._id}>
                      {p.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <TextField
              label="Author Name"
              required
              fullWidth
              size="small"
              value={formAuthorName}
              onChange={(e) => setFormAuthorName(e.target.value)}
              InputLabelProps={{ sx: { color: '#888' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: '#333' },
                  '&:hover fieldset': { borderColor: '#ff1744' },
                  '&.Mui-focused fieldset': { borderColor: '#ff1744' }
                }
              }}
            />

            <Box>
              <Typography component="legend" sx={{ color: '#888', mb: 1, fontSize: '0.875rem' }}>Rating</Typography>
              <Rating
                value={formRating}
                precision={1}
                onChange={(_, newValue) => setFormRating(newValue || 5)}
              />
            </Box>

            <TextField
              label="Comment"
              required
              fullWidth
              multiline
              rows={4}
              value={formComment}
              onChange={(e) => setFormComment(e.target.value)}
              InputLabelProps={{ sx: { color: '#888' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: '#333' },
                  '&:hover fieldset': { borderColor: '#ff1744' },
                  '&.Mui-focused fieldset': { borderColor: '#ff1744' }
                }
              }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 3, borderTop: '1px solid #1f1f1f' }}>
            <Button onClick={() => setDialogOpen(false)} sx={{ color: '#888' }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#ff1744',
                color: '#fff',
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#d32f2f' }
              }}
            >
              {isEditMode ? 'Update' : 'Save'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default ReviewTable;
