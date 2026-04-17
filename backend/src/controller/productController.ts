import { Request, Response } from "express";
import asyncHandler from "../utilts/asyncHandler";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../repository/product";
import { uploadMultipleImages, deleteMultipleImages } from "../utilts/cloudinaryHelper";

const getAll = asyncHandler(async (req: Request, res: Response) => {
  const products = await getAllProducts();
  res.status(200).json(products);
});

const create = asyncHandler(async (req: Request, res: Response) => {
  
  const {
    name,
    price,
    description,
    rating,
    category,
    colors,
    variants,
  } = req.body;

  if (!name || !price || !description) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  let imageUrls: string[] = [];

  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    const filePaths = (req.files as Express.Multer.File[]).map(file => file.path);
    imageUrls = await uploadMultipleImages(filePaths);
  }
  else if (req.body.images) {
    const images = req.body.images;
    if (typeof images === 'string') {
      try {
        imageUrls = JSON.parse(images);
      } catch {
        imageUrls = [images];
      }
    } else if (Array.isArray(images)) {
      imageUrls = images;
    }
  }
  else if (req.body.image) {
    imageUrls = [req.body.image];
  }

  if (imageUrls.length === 0) {
    imageUrls = ["https://via.placeholder.com/500x500?text=No+Image"];
  }

  let parsedVariants = [];
  if (variants) {
    try {
      parsedVariants = typeof variants === 'string' ? JSON.parse(variants) : variants;
    } catch (error) {
      console.error("Variants parse error:", error);
    }
  }

  let parsedColors = [];
  if (colors) {
    parsedColors = typeof colors === 'string' ? JSON.parse(colors) : colors;
  }

  const productData = {
    name,
    price: Number(price),
    images: imageUrls,
    description,
    rating: rating ? Number(rating) : 0,
    category: category || "",
    colors: parsedColors,
    variants: parsedVariants,
  };

  const product = await createProduct(productData as any);
  res.status(201).json(product);
});

const update = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  
  const existingProduct = await getProductById(id);
  if (!existingProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  let updateData: any = { ...req.body };

  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    if (existingProduct.images && existingProduct.images.length > 0) {
      await deleteMultipleImages(existingProduct.images);
    }
    
    const filePaths = (req.files as Express.Multer.File[]).map(file => file.path);
    const imageUrls = await uploadMultipleImages(filePaths);
    updateData.images = imageUrls;
  }
  else if (req.body.images) {
    let imageUrls: string[] = [];
    if (typeof req.body.images === 'string') {
      try {
        imageUrls = JSON.parse(req.body.images);
      } catch {
        imageUrls = [req.body.images];
      }
    } else if (Array.isArray(req.body.images)) {
      imageUrls = req.body.images;
    }
    updateData.images = imageUrls;
  }

  if (updateData.variants && typeof updateData.variants === 'string') {
    try {
      updateData.variants = JSON.parse(updateData.variants);
    } catch (error) {
      console.error("Variants parse error:", error);
    }
  }
  
  if (updateData.colors && typeof updateData.colors === 'string') {
    try {
      updateData.colors = JSON.parse(updateData.colors);
    } catch (error) {
      console.error("Colors parse error:", error);
    }
  }

  if (updateData.price) updateData.price = Number(updateData.price);
  if (updateData.rating) updateData.rating = Number(updateData.rating);

  const updatedProduct = await updateProduct(id, updateData);
  res.status(200).json(updatedProduct);
});

const remove = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const product = await getProductById(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (product.images && product.images.length > 0) {
    await deleteMultipleImages(product.images);
  }

  const deletedProduct = await deleteProduct(id);
  res.status(200).json(deletedProduct);
});

const byId = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const product = await getProductById(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
});

export { getAll, create, update, remove, byId };