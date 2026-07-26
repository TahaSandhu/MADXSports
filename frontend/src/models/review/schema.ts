import { Document, Types } from "mongoose";

export interface ReviewDocument extends Document {
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatarUrl: string;
  productId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
