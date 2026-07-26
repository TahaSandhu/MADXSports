import { Document } from "mongoose";

export interface ProductVariant {
  size: "S" | "M" | "L" | "XL" | "XXL";
  color: string;
  quantity: number;
}

export interface ProductDocument extends Document {
  name: string;
  price: number;
  images: string[];
  rating: number;
  description: string;
  category?: string;
  isTrending: boolean;
  isNewRelease: boolean;
  colors: string[];
  variants: ProductVariant[];
  createdAt: Date;
  updatedAt: Date;
}
