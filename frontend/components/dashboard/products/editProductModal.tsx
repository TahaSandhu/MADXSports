import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  Modal,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useProduct } from "@/hooks/useProduct";
import { Product, Variant } from "@/hooks/types";
import { useForm, useFieldArray } from "react-hook-form";

const SIZES = ["S", "M", "L", "XL", "XXL"] as const;
type Size = typeof SIZES[number];

interface UpdateProductModalProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  name: string;
  price: number;
  images: string[];
  rating: number;
  description: string;
  category: string;
  isTrending: boolean;
  isNewRelease: boolean;
  colors: string[];
  variants: Variant[];
}

const UpdateProductModal = ({ open, product, onClose, onSuccess }: UpdateProductModalProps) => {
  const { register, control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      name: "",
      price: 0,
      images: [],
      rating: 0,
      description: "",
      category: "",
      isTrending: false,
      isNewRelease: false,
      colors: [],
      variants: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const { updateProduct } = useProduct();

  const [colors, setColors] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (product && open) {
      const productVariants = product.variants || [];
      
      reset({
        name: product.name,
        price: product.price,
        rating: product.rating,
        description: product.description,
        category: product.category,
        isTrending: product.isTrending,
        isNewRelease: product.isNewRelease,
        colors: product.colors || [],
        variants: productVariants.map(v => ({
          size: v.size as Size,
          color: v.color,
          quantity: v.quantity,
          id: v._id
        })),
      });
      
      setColors(product.colors || []);
      setExistingImages(product.images || []);
    }
  }, [product, open, reset]);

  const addColor = () => {
    const input = document.getElementById("color-input") as HTMLInputElement;
    const value = input.value.trim();
    if (value && !colors.includes(value)) {
      setColors([...colors, value]);
      input.value = "";
    }
  };

  const removeColor = (c: string) => {
    setColors(colors.filter((x) => x !== c));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormData) => {
    if (!product?._id) return;
    
    try {
      setUploading(true);
      
      const updateData = {
        name: data.name,
        price: data.price,
        rating: data.rating,
        description: data.description,
        category: data.category,
        isTrending: data.isTrending,
        isNewRelease: data.isNewRelease,
        colors: colors,
        images: existingImages,
        variants: data.variants
      };
      
      await updateProduct(product._id, updateData as any);
      
      onSuccess();
      onClose();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '95%', sm: '80%', md: '70%', lg: '600px' },
          maxHeight: '90vh',
          bgcolor: '#111',
          color: 'white',
          boxShadow: 24,
          p: 4,
          overflowY: 'auto',
          borderRadius: 2,
          border: '1px solid #333'
        }}
      >
        <Typography variant="h5" sx={{ color: "red", mb: 2 }}>
          Update Product
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField 
            label="Name" 
            fullWidth 
            margin="normal" 
            {...register("name")}
            sx={{ input: { color: 'white' }, label: { color: 'gray' } }}
          />
          
          <TextField 
            label="Price" 
            type="number" 
            fullWidth 
            margin="normal" 
            {...register("price")} 
            sx={{ input: { color: 'white' }, label: { color: 'gray' } }}
          />
          
          <TextField 
            label="Rating" 
            type="number" 
            fullWidth 
            margin="normal" 
            {...register("rating")} 
            sx={{ input: { color: 'white' }, label: { color: 'gray' } }}
          />
          
          <TextField 
            label="Description" 
            multiline 
            rows={3} 
            fullWidth 
            margin="normal" 
            {...register("description")} 
            sx={{ '& .MuiInputBase-input': { color: 'white' }, label: { color: 'gray' } }}
          />
          
          <TextField 
            label="Category" 
            fullWidth 
            margin="normal" 
            {...register("category")} 
            sx={{ input: { color: 'white' }, label: { color: 'gray' } }}
          />

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Existing Images
            </Typography>
            
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {existingImages.map((img, i) => (
                <Box key={i} sx={{ position: "relative" }}>
                  <img
                    src={img}
                    alt={`product ${i}`}
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: 4,
                    }}
                  />
                  <IconButton
                    onClick={() => removeExistingImage(i)}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: -6,
                      right: -6,
                      background: "red",
                      color: "#fff",
                      width: 20,
                      height: 20,
                      '&:hover': { background: 'darkred' }
                    }}
                  >
                    ✕
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Colors
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField 
                id="color-input" 
                size="small" 
                label="Color" 
                fullWidth 
                sx={{ input: { color: 'white' }, label: { color: 'gray' } }}
              />
              <Button variant="outlined" onClick={addColor} sx={{ color: 'white', borderColor: '#444' }}>
                Add
              </Button>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              {colors.map((c) => (
                <Chip 
                  key={c} 
                  label={c} 
                  onDelete={() => removeColor(c)} 
                  variant="outlined" 
                  sx={{ color: 'white', borderColor: '#444' }} 
                />
              ))}
            </Box>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Variants
            </Typography>

            {fields.map((f, i: number) => (
              <Box
                key={f.id}
                sx={{
                  display: "flex",
                  gap: 1,
                  mb: 1,
                  alignItems: "center",
                }}
              >
                <FormControl size="small" sx={{ minWidth: 90 }}>
                  <InputLabel sx={{ color: 'gray' }}>Size</InputLabel>
                  <Select 
                    {...register(`variants.${i}.size`)} 
                    label="Size"
                    defaultValue={f.size}
                    sx={{ color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: '#444' } }}
                  >
                    {SIZES.map((s) => (
                      <MenuItem key={s} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField 
                  {...register(`variants.${i}.color`)} 
                  label="Color" 
                  size="small" 
                  sx={{ flex: 1, input: { color: 'white' }, label: { color: 'gray' } }} 
                />
                
                <TextField 
                  {...register(`variants.${i}.quantity`, { valueAsNumber: true })} 
                  type="number" 
                  size="small" 
                  sx={{ width: 90, input: { color: 'white' }, label: { color: 'gray' } }} 
                />

                <IconButton onClick={() => remove(i)} sx={{ color: "red" }}>
                  ✕
                </IconButton>
              </Box>
            ))}

            <Button 
              variant="outlined" 
              fullWidth 
              onClick={() => append({ size: "M", color: "", quantity: 0 })}
              sx={{ color: 'white', borderColor: '#444', mt: 1 }}
            >
              Add Variant
            </Button>
          </Box>

          <Box sx={{ mt: 2 }}>
            <FormControlLabel 
              control={<Checkbox {...register("isTrending")} sx={{ color: 'white', '&.Mui-checked': { color: 'red' } }} />} 
              label="Trending" 
              sx={{ color: 'white' }}
            />
            <FormControlLabel 
              control={<Checkbox {...register("isNewRelease")} sx={{ color: 'white', '&.Mui-checked': { color: 'red' } }} />} 
              label="New Release" 
              sx={{ color: 'white' }}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="error"
              sx={{ height: 45, fontWeight: 600 }}
              disabled={uploading}
            >
              {uploading ? "Updating..." : "Update Product"}
            </Button>
            
            <Button
              fullWidth
              variant="outlined"
              sx={{ height: 45, fontWeight: 600, color: 'white', borderColor: '#444' }}
              onClick={onClose}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateProductModal;