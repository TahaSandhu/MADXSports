import { Schema, model } from "mongoose";
import { ProductDocument } from "./schema";

const ProductSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    images: { type: [String], required: true, default: [] },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    description: { type: String, required: true },
    category: { type: String },
    colors: {
      type: [String],
      default: [],
    },
    variants: {
      type: [
        {
          size: {
            type: String,
            enum: ["S", "M", "L", "XL", "XXL"],
            required: true,
          },
          color: {
            type: String,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            min: 0,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const ProductModel = model<ProductDocument>("Product", ProductSchema);

export default ProductModel;