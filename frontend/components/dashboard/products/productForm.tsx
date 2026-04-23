"use client";

import { useForm, Controller, useFieldArray } from "react-hook-form";
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
} from "@mui/material";
import { useState } from "react";
import { useProduct } from "@/hooks/useProduct";
import { Product } from "@/hooks/types";

const SIZES = ["S", "M", "L", "XL", "XXL"];

const ProductForm = () => {
  const { control, handleSubmit, reset, register } = useForm<Product>({
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

  const { createProduct } = useProduct();

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map((f) => URL.createObjectURL(f));
    setImageFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

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

  const onSubmit = async (data: Product) => {
    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("price", String(data.price));
      formData.append("description", data.description);
      formData.append("rating", String(data.rating || 0));
      formData.append("category", data.category || "");
      formData.append("colors", JSON.stringify(colors));
      formData.append("variants", JSON.stringify(data.variants));

      imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      await createProduct(formData as any);

      reset();
      setImageFiles([]);
      imagePreviews.forEach((p) => URL.revokeObjectURL(p));
      setImagePreviews([]);
      setColors([]);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 3,
        borderRadius: 2,
        background: "#111",
        color: "white",
      }}
    >
      <Typography variant="h5" sx={{ color: "red", mb: 2 }}>
        Create Product
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Name" fullWidth margin="normal" {...register("name")} />
        <TextField label="Price" type="number" fullWidth margin="normal" {...register("price")} />
        <TextField label="Rating" type="number" fullWidth margin="normal" {...register("rating")} />
        <TextField label="Description" multiline rows={3} fullWidth margin="normal" {...register("description")} />
        <TextField label="Category" fullWidth margin="normal" {...register("category")} />

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Images
          </Typography>

          <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
            Upload Images
            <input hidden type="file" multiple accept="image/*" onChange={handleImageUpload} />
          </Button>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {imagePreviews.map((p, i) => (
              <Box key={i} sx={{ position: "relative" }}>
                <img
                  src={p}
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                />
                <IconButton
                  onClick={() => removeImage(i)}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: -6,
                    right: -6,
                    background: "red",
                    color: "#fff",
                    width: 20,
                    height: 20,
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
            <TextField id="color-input" size="small" label="Color" fullWidth />
            <Button variant="outlined" onClick={addColor}>
              Add
            </Button>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {colors.map((c) => (
              <Chip key={c} label={c} onDelete={() => removeColor(c)} />
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Variants
          </Typography>

          {fields.map((f, i) => (
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
                <InputLabel>Size</InputLabel>
                <Select {...register(`variants.${i}.size`)} label="Size">
                  {SIZES.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField {...register(`variants.${i}.color`)} label="Color" size="small" sx={{ flex: 1 }} />
              <TextField {...register(`variants.${i}.quantity`, { valueAsNumber: true })} type="number" size="small" sx={{ width: 90 }} />

              <IconButton onClick={() => remove(i)} sx={{ color: "red" }}>
                ✕
              </IconButton>
            </Box>
          ))}

          <Button variant="outlined" fullWidth onClick={() => append({ size: "M", color: "", quantity: 0 })}>
            Add Variant
          </Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          <FormControlLabel control={<Checkbox {...register("isTrending")} />} label="Trending" />
          <FormControlLabel control={<Checkbox {...register("isNewRelease")} />} label="New Release" />
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, height: 45, fontWeight: 600 }}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Create Product"}
        </Button>
      </form>
    </Box>
  );
};

export default ProductForm;