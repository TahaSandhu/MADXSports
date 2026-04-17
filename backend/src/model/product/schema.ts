import { Document } from "mongoose";

export interface Variant {
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
  category: string;
  colors: string[];
  variants: Variant[];
  createdAt?: Date;
  updatedAt?: Date;
}